from typing import List
from pydantic import BaseModel, validator
from .Transaction import TransactionBase


class AddPortfolioTransaction(BaseModel):
    stock_name: str
    transactions: List[TransactionBase]

    @validator('stock_name')
    def validate_stock_name(cls, v):
        assert len(v) > 0, "You must supply a valid stock name"
        return v

    @validator('transactions')
    def validate_transactions(cls, v):
        assert len(v) > 0, "You must supply at least one transaction"
        return v
