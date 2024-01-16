import numpy as np
from datetime import datetime
from .utilities import fetch_stock_history_data, get_cum_returns_data, get_weights_df


def recalculate_pct_change_in_purchase_date(stock_transaction_df, pct_change, df_history_data):
    """
    This function will handle purchases in the middle of the day, when the end-of-day pct is not zero.
    
    we need to fix the pct change in the purchase date, 
    where we need to take in mind that we can have a stock with x% that changes y% and in the same day, 
    we bought new stocks of the same company that may changed a little different (if we bought in the middle of the day)
    """
    pct_change = pct_change.copy()

    for stock in stock_transaction_df.stock.unique():
        final_pct_change = pct_change[stock].copy()
        stock_history_data = df_history_data[stock]

        for (t_idx, transaction) in stock_transaction_df[stock_transaction_df.stock == stock].iterrows():
            prev_quantity = stock_transaction_df[((stock_transaction_df.stock == stock) & (stock_transaction_df.date < transaction.date))].quantity.sum()

            if prev_quantity == 0: # reset the pct before the first purchase
                final_pct_change[final_pct_change.index < transaction.date] = 0

            transaction_quantity = transaction.quantity
            total_quantity = prev_quantity + transaction_quantity

            prev_pct_change = final_pct_change[final_pct_change.index == transaction.date]
            transaction_pct_change = (stock_history_data[stock_history_data.index == transaction.date] - transaction.purchase_price) / transaction.purchase_price

            total_pct_change = (prev_quantity/total_quantity)*prev_pct_change + (transaction_quantity/total_quantity)*transaction_pct_change
            final_pct_change[final_pct_change.index == transaction.date] = total_pct_change

        pct_change[stock] = final_pct_change

    return pct_change


def get_total_portfolio_pct_change(stock_transaction_df, db):
    tickers = stock_transaction_df['stock'].unique().tolist()
    df_history_data = fetch_stock_history_data(db, tickers, start=stock_transaction_df.date.min(
    ), end=datetime.today()) 
    pct_change = df_history_data.pct_change(1).fillna(0)
    pct_change = recalculate_pct_change_in_purchase_date(stock_transaction_df, pct_change, df_history_data)

    weights_df = get_weights_df(stock_transaction_df, pct_change)
    total_portfolio_pct_change = (
                                    pct_change
                                        .merge(weights_df, left_index=True, right_index=True, suffixes=['_pct', '_weights'])
                                        .apply(lambda x: np.dot(x.filter(regex='pct'), x.filter(regex='weights')), axis=1)
                                )
    
    return total_portfolio_pct_change

def get_total_cum_return(total_portfolio_pct_change):    
    cum_return_data = get_cum_returns_data(total_portfolio_pct_change)
    return cum_return_data

def calculate_cum_value(stock_transaction_df, cum_return):
    """
    Returns the current value of the portfolio for each day
    """
    transaction_list = list(stock_transaction_df.iterrows())
    cum_total = cum_return.copy()

    for t1, t2 in zip(transaction_list, transaction_list[1:] + [None]):
        total_invested_value = stock_transaction_df.iloc[:t1[0]+1].total_value.sum()
        cur_cum_total = (cum_return[((cum_return.index >= t1[1].date) & (cum_return.index < t2[1].date if t2 else True))] * total_invested_value) + total_invested_value
        cum_total[cur_cum_total.index] = cur_cum_total

    return cum_total