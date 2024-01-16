import pandas as pd
from sqlalchemy import select, and_
from sqlalchemy.orm import Session

from ....models.Transaction import Transaction
from ....models.Portfolio import Portfolio
from ....models.Stock import Stock


def get_portfolio_transactions(db: Session, portfolio_id, user_id):
    subquery = (
        select(Transaction.id)  # Convert to select() explicitly
        .join(Portfolio)
        .filter(
            and_(
                Transaction.portfolio_id == portfolio_id,
                # Portfolio.user_id == user_id,
            )
        )
        .subquery()
    )

    results = (
        db.query(Transaction, Stock.symbol)
        .join(Stock, Transaction.stock_id == Stock.id)
        .filter(Transaction.id.in_(select(subquery)))
        .all()
    )

    return [{**vars(transaction), "stock": stock_name} for transaction, stock_name in results]


def get_portfolio_transactions_df(db: Session, portfolio_id, user_id):
    transactions = get_portfolio_transactions(db, portfolio_id, user_id)
    
    if len(transactions) == 0 :
        return None

    stock_transaction_df = pd.DataFrame(transactions)[['stock_id', 'stock', 'quantity', 'purchase_price', 'date']]
    stock_transaction_df = stock_transaction_df.sort_values(by='date')
    stock_transaction_df['total_value'] = stock_transaction_df['quantity'] * stock_transaction_df['purchase_price'] 
    stock_transaction_df['date'] = pd.to_datetime(stock_transaction_df['date'])
    
    return stock_transaction_df
