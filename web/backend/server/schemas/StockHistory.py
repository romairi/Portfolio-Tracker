from pydantic import BaseModel
from datetime import datetime


class StockHistoryBase(BaseModel):
    symbol: str
    date: datetime
    open: float
    high: float = 0
    low: float = 0
    close: float = 0
    adj_close: float = 0
    volume: str


class StockHistory(StockHistoryBase):
    id: int
