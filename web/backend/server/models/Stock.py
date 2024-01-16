from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from ..database import Base
from ..crud.stock_history_crud import get_latest_stock_history_instance

class Stock(Base):
    __tablename__ = "stocks"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(32), unique=True, index=True)
    short_name = Column(String(100))
    long_name = Column(String(100))
    sector = Column(String(100))
    industry = Column(String(100))
    country = Column(String(100))
    website = Column(String(300))
    financial_currency = Column(String(100))
    market = Column(String(100))

    latest_price = relationship("StockHistory", primaryjoin="and_(StockHistory.symbol==Stock.symbol, StockHistory.date==select(func.max(StockHistory.date)).where(StockHistory.symbol==Stock.symbol).scalar_subquery())", uselist=False)