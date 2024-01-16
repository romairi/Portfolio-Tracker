from typing import List
from sqlalchemy.orm import Session
from ..models.models import Stock
from ..schemas.Stock import StockBase


def create_stock(db: Session, stock: StockBase):
    db_stock = Stock(**vars(stock))
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock


def get_stock(db: Session, symbol: str) -> Stock:
    return db.query(Stock).filter(Stock.symbol == symbol).first()


def get_stocks(db: Session, skip=0, limit=100):
    return db.query(Stock).offset(skip).limit(limit).all()


def get_stocks_by_ids(db: Session, stock_ids) -> List[Stock]:
    return db.query(Stock).filter(Stock.id.in_(stock_ids)).all()


def get_stocks_mapping_by_ids(db: Session, stock_ids):
    stocks = get_stocks_by_ids(db, stock_ids)
    return {stock.id: stock for stock in stocks}


def get_suggested_stocks(db: Session(), stock_name, limit=50):
    return db.query(Stock).filter(Stock.symbol.like(f'{stock_name}%')).limit(limit).all()

def get_all_symbols(db: Session):
    return list(map(lambda x: x[0], db.query(Stock.symbol).all()))