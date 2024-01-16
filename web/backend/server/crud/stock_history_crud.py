from typing import List
from sqlalchemy.orm import Session
from ..models.StockHistory import StockHistory
from ..schemas.StockHistory import StockHistory as StockHistorySchema, StockHistoryBase
from datetime import datetime
from sqlalchemy import and_, desc


def get_stocks_history(db: Session, symbols: List[str], start_time: datetime, end_time: datetime) -> List[StockHistorySchema]:
    return db.query(StockHistory).filter(
        and_(StockHistory.symbol.in_(symbols), StockHistory.date >= start_time, StockHistory.date <= end_time)
    ).order_by(desc(StockHistory.date)).all()


def get_latest_stock_history_instance(db: Session, symbol: str) -> StockHistorySchema:
    return db.query(StockHistory).filter(StockHistory.symbol == symbol).order_by(desc(StockHistory.date)).first()


def create_stock_history(db: Session, symbol: str, stock_data: List[StockHistoryBase], force_remove=False):
    if force_remove:
        db.query(StockHistory).filter(StockHistory.symbol == symbol).delete()
        db.commit()

    db_stock_data = [StockHistory(**vars(d)) for d in stock_data]
    db.add_all(db_stock_data)
    db.commit()

    for d in db_stock_data:
        db.refresh(d)

    return db_stock_data
