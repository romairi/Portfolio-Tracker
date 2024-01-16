from requests import patch, session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...schemas.Transaction import TransactionUpdate, TransactionCreate
from ...services.get_db import get_db
from ...crud.transactions_crud import get_transaction, create_transaction, delete_transaction, update_transaction

transactions_router = APIRouter()


@transactions_router.get("/{transaction_id}", tags=["get_transaction"])
async def read_transaction_api(transaction_id: int, db: Session = Depends(get_db)):
    db_item = get_transaction(db, transaction_id=transaction_id)

    if db_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
    db_item.stock  # TODO: check how to get the stock by default

    # TODO: check how to return the datetime and stock when using response_model=Transaction on line 9 (@transactions_router.get...)
    return vars(db_item)


@transactions_router.post("/{stock_id}", tags=["create_transaction"])
async def create_transaction_api(stock_id: int, transaction: TransactionCreate, db: Session = Depends(get_db)):
    db_item = create_transaction(db, transaction, stock_id)
    db_item.stock

    return vars(db_item)


@transactions_router.patch("/{transaction_id}", tags=["edit_transaction"])
async def edit_transaction_api(transaction_id: int, transaction: TransactionUpdate, db: Session = Depends(get_db)):
    db_updated_transaction = update_transaction(
        db, transaction_id, transaction)
    db_updated_transaction.stock

    return vars(db_updated_transaction)


@transactions_router.delete("/{transaction_id}", tags=["delete_transaction"])
async def delete_transaction_api(transaction_id: int, db: Session = Depends(get_db)):
    try:
        delete_transaction(db, transaction_id)
        return {"message": f"the transaction was deleted with id: {transaction_id}"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="transaction not found")
