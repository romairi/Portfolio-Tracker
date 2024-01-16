from sqlalchemy.orm import Session
from ..models.Transaction import Transaction
from ..schemas.Transaction import TransactionCreate, TransactionUpdate


def create_transaction(db: Session, transaction: TransactionCreate, stock_id: int):
    db_transaction = Transaction(**vars(transaction), stock_id=stock_id)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


def get_transaction(db: Session, transaction_id: int):
    return db.query(Transaction).filter(Transaction.id == transaction_id).first()


def delete_transaction(db: Session, transaction_id: int):
    db_transaction = get_transaction(db, transaction_id)

    if not db_transaction:
        raise Exception(detail="Transaction not found")

    db.delete(db_transaction)
    db.commit()


def update_transaction(db: Session, transaction_id: int, transaction: TransactionUpdate):
    db_transaction = get_transaction(db, transaction_id)

    if not db_transaction:
        raise Exception(detail="Transaction not found")

    transaction_data = transaction.dict(exclude_unset=True)
    for key, value in transaction_data.items():
        setattr(db_transaction, key, value)

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction
