from sqlalchemy.orm import Session

from .get_portfolios import extend_portfolio_data
from ...schemas.Portfolio import PortfolioCreate
from ...crud.portfolios_crud import create_portfolio as create_portfolio_crud


def create_portfolio(db: Session, portfolio: PortfolioCreate):
    db_portfolio = create_portfolio_crud(db, portfolio)
    return extend_portfolio_data(db_portfolio, db)
