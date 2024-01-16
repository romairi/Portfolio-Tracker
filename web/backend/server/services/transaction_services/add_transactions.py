from sqlalchemy.orm import Session
from ...crud.transactions_crud import create_transaction
from ...schemas.Transaction import TransactionBase, TransactionCreate

def add_transactions(db: Session, portfolio_id: int, stock_id: int, transaction: TransactionBase):
    transactions_create = map(lambda t: TransactionCreate(**vars(t), portfolio_id=portfolio_id), transaction)
    return [create_transaction(db, t, stock_id) for t in transactions_create]