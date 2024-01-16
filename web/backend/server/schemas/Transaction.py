from typing import Optional
from pydantic import BaseModel
from .Stock import StockBase
from datetime import datetime


class TransactionBase(BaseModel):
    quantity: int
    purchase_price: float
    date: datetime
    purchase_currency: str
    origin_currency: str = "USA"
    exchange: float = 0


class TransactionCreate(TransactionBase):
    portfolio_id: int


class Transaction(TransactionBase):
    id: int
    stock_id: int
    stocks: StockBase
    portfolio_id: int

    class Config:
        orm_mode = True


class TransactionUpdate(BaseModel):
    quantity: Optional[int]
    purchase_price: Optional[int]
    purchase_currency: Optional[str]
    origin_currency: Optional[str]
    exchange: Optional[float]
    date: Optional[datetime]
