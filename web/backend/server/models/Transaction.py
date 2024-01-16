from sqlalchemy import Column, ForeignKey, Integer, String, Float, Date
from sqlalchemy.orm import relationship
from ..database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer)
    purchase_price = Column(Float)
    purchase_currency = Column(String(32))
    origin_currency = Column(String(32))
    exchange = Column(Float)
    date = Column(Date)

    stock_id = Column(Integer, ForeignKey("stocks.id"))
    stock = relationship("Stock")
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"))
