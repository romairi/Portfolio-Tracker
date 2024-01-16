import pandas as pd
import numpy as np
from datetime import datetime

from ....crud.stock_history_crud import get_stocks_history


def get_weights(stock_transaction_df, date):
    cost = stock_transaction_df[stock_transaction_df.date <= date].groupby(['stock'])['total_value'].sum(numeric_only=True)
    weights = cost/cost.sum()
    return weights


def get_weights_df(stock_transaction_df, pct_change):
    weights_df = pd.DataFrame(index=pct_change.index, columns=pct_change.columns).fillna(0)


    for idx, date in enumerate(stock_transaction_df.date.tolist()):
        weights = get_weights(stock_transaction_df, date)
        weights_df.loc[weights_df.index >= date, weights.index.tolist()] = weights.values

    return weights_df


def get_cum_returns_data(day_percent_change):
    day_cum_returns = (1 + day_percent_change).cumprod() - 1
    day_cum_returns = day_cum_returns.fillna(0)
    return day_cum_returns


def fetch_stock_history_data(db, symbols, start, end=datetime.today()):
    data = get_stocks_history(db=db, symbols=symbols,
                            start_time=start, end_time=end)
    data = pd.DataFrame([vars(d) for d in data])

    return pd.concat([data[data.symbol == symbol].sort_values(by='date').set_index(
        'date')[['adj_close']].rename(columns={'adj_close': symbol}) for symbol in symbols], axis=1)
