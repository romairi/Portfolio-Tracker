from requests import patch, session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from ...services.portfolio_services.portfolio_analysis.portfolio_analysis_data import PortfolioAnalysisData
from ...schemas.Portfolio import PortfolioUpdate, PortfolioCreate, PortfolioBase
from ...schemas.ApiSchemas import AddPortfolioTransaction
from ...schemas.User import User
from ...services.get_db import get_db
from ...crud.portfolios_crud import delete_portfolio, update_portfolio, delete_portfolio_transaction_by_transaction_id, delete_portfolio_transactions_by_stock_id
from ...crud.stocks_crud import get_stocks_mapping_by_ids, get_stock
from ...services.portfolio_services.get_portfolios import get_all_portfolios, get_portfolio_by_id, get_stocks_by_portfolio_id
from ...services.portfolio_services.create_portfolio import create_portfolio
from ...services.transaction_services.add_transactions import add_transactions as add_transactions_service
from ...services.user_services.authenticate import require_authentication
from ...logger.logger_setup import loggerManager

portfolios_router = APIRouter()


@portfolios_router.get("/{portfolio_id}", tags=["get_portfolio"])
async def read_portfolio_api(portfolio_id: int, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    portfolio = get_portfolio_by_id(portfolio_id, user.id, db)

    if portfolio is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="portfolio not found")

    return portfolio


@portfolios_router.get("/{portfolio_id}/stocks", tags=["get_stocks_by_portfolio"])
async def read_stocks_by_portfolio_api(portfolio_id: int, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    stocks = get_stocks_by_portfolio_id(portfolio_id, user.id, db)

    if stocks is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="stocks not found")

    return stocks


@portfolios_router.get("/", tags=["get_all_portfolios"])
async def read_portfolios_api(user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    portfolios = get_all_portfolios(db, user.id)

    if portfolios is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="portfolios not found")

    return portfolios


@portfolios_router.post("/", tags=["create_portfolio"])
async def create_portfolio_api(portfolio: PortfolioBase, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    portfolio = PortfolioCreate(**vars(portfolio), user_id=user.id)
    db_portfolio = create_portfolio(db, portfolio)

    return db_portfolio


@portfolios_router.post("/{portfolio_id}/add_transactions", tags=["add_transactions"])
async def add_transactions(portfolio_id: int, portfolio_transactions_data: AddPortfolioTransaction, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    portfolio = get_portfolio_by_id(portfolio_id, user.id, db)

    if portfolio is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="portfolio not found")

    stock = get_stock(db, symbol=portfolio_transactions_data.stock_name)

    if stock is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="stock not found")

    db_transactions = add_transactions_service(
        db, portfolio_id, stock.id, portfolio_transactions_data.transactions)
    return get_portfolio_by_id(portfolio_id, user.id, db)


@portfolios_router.patch("/{portfolio_id}", tags=["edit_portfolio"])
async def edit_Portfolio_api(portfolio_id: int, portfolio: PortfolioUpdate, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    db_updated_portfolio = update_portfolio(
        db, portfolio_id, portfolio, user.id)
    stock_ids = list(
        set([t.stock_id for t in db_updated_portfolio.transactions]))
    stocks = get_stocks_mapping_by_ids(db, stock_ids)
    return dict(portfolio=vars(db_updated_portfolio), stocks=stocks)


@portfolios_router.delete("/{portfolio_id}", tags=["delete_portfolio"])
async def delete_portfolio_api(portfolio_id: int, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    try:
        delete_portfolio(db, portfolio_id, user.id)
        return {"message": f"the portfolio was deleted with id:{portfolio_id}"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="portfolio not found")


@portfolios_router.delete("/{portfolio_id}/remove_stock", tags=["remove_stock"])
async def remove_stock(portfolio_id: int, stock_id: int, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    try:
        delete_portfolio_transactions_by_stock_id(
            db, portfolio_id, user.id, stock_id)
        return {"message": f"the transaction was deleted with id:{stock_id}"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="stock_id not found")


@portfolios_router.delete("/{portfolio_id}/remove_transaction", tags=["remove_transaction"])
async def remove_transaction(portfolio_id: int, transaction_id: int, user: User = Depends(require_authentication), db: Session = Depends(get_db)):
    try:
        delete_portfolio_transaction_by_transaction_id(
            db, portfolio_id, user.id, transaction_id)
        return {"message": f"the transaction was deleted with id:{transaction_id}"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="stock_id not found")

@portfolios_router.get("/analysis/{portfolio_id}", tags=["get_portfolio_analysis_data"])
async def get_portfolio_analysis_data(portfolio_id: int, user: User = Depends(require_authentication), db: Session = Depends(get_db)) -> Optional[PortfolioAnalysisData]:
    try:
        portfolio_analysis_data = PortfolioAnalysisData.from_db(db, portfolio_id=portfolio_id, user_id=user.id)

    except Exception as e:
        loggerManager.error(f"Portfolio Analysis Data {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to calculate portfolio statistics")

    return portfolio_analysis_data