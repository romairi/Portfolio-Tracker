from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base
from .Transaction import Transaction


class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(32))
    user_id = Column(String(32), index=True)

    transactions = relationship("Transaction", cascade="all, delete-orphan", lazy='joined')
