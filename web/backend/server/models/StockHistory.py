from sqlalchemy import Column, String, Float, DateTime,ForeignKey
from ..database import Base


class StockHistory(Base):
    __tablename__ = "stock_history"

    symbol = Column(String(32), ForeignKey('stocks.symbol'), primary_key=True, unique=False, index=True)
    date = Column(DateTime, primary_key=True, unique=False, index=True)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    adj_close = Column(Float)
    volume = Column(String(256))
