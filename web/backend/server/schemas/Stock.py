from typing import Union
from pydantic import BaseModel


class StockBase(BaseModel):
    symbol: str
    short_name: str
    long_name: str
    sector: str
    industry: str
    country: str
    website: str
    financial_currency: str
    market: str


class StockCreate(StockBase):
    pass


class Stock(StockBase):
    id: int

    class Config:
        orm_mode = True


class StockName(BaseModel):
    id: int
    symbol: str


class StockData(BaseModel):
    price: float
