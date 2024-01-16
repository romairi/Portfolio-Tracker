from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Dict
from ...services.stock_services.get_stock_price import get_stocks_change_data
from ...schemas.Stock import Stock, StockData, StockName
from ...services.get_db import get_db
from ...crud.stocks_crud import get_stocks, get_stocks_by_ids, get_suggested_stocks

MAX_RETURN_ITEMS = 100


stocks_router = APIRouter()


@stocks_router.get("/", response_model=List[Stock], tags=["get_stocks"])
async def read_stocks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    if limit - skip > MAX_RETURN_ITEMS:
        limit = skip + MAX_RETURN_ITEMS

    db_stocks = get_stocks(db, skip=skip, limit=limit)
    if db_stocks is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Stock not found")

    return [Stock.from_orm(s) for s in db_stocks]


@stocks_router.get("/suggestions/{stock_name}", response_model=List[StockName], tags=["get_suggested_stocks"])
async def read_stocks(stock_name: str, limit: int = 50, db: Session = Depends(get_db)):
    limit = min(limit, MAX_RETURN_ITEMS)

    db_stocks = get_suggested_stocks(db, stock_name, limit=limit)
    if db_stocks is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Stock not found")

    return [StockName(id=s.id, symbol=s.symbol) for s in db_stocks]


@stocks_router.get("/stocks_data", response_model=Dict[int, StockData], tags=["get_stocks_data"])
async def get_stocks_data(stock_ids: List[int] = Query(default=None), db: Session = Depends(get_db)):
    stocks = get_stocks_by_ids(db, stock_ids)
    stocks_data = get_stocks_change_data([vars(s) for s in stocks])

    return stocks_data
