from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import HTTPException, status
from ..models.Portfolio import Portfolio
from ..schemas.Portfolio import PortfolioCreate, PortfolioUpdate
from ..models.Transaction import Transaction


def create_portfolio(db: Session, portfolio: PortfolioCreate):
    db_portfolio = Portfolio(**vars(portfolio))
    name_length = len(db_portfolio.name)
    if name_length > 32 or name_length < 2:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Portfolio name has a wrong length")

    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio


def get_all_portfolios(db: Session, user_id: str):
    return db.query(Portfolio).filter(Portfolio.user_id == user_id).all()


def get_portfolio(db: Session, portfolio_id: int, user_id: str):
    return db.query(Portfolio).filter(and_(Portfolio.id == portfolio_id, Portfolio.user_id == user_id)).first()


def get_portfolio_transactions_by_stock_id(db: Session, portfolio_id: int, user_id: str, stock_id: int):
    return db.query(Transaction).join(Portfolio).filter(and_(Transaction.portfolio_id == portfolio_id, Portfolio.user_id == user_id, Transaction.stock_id == stock_id))


def delete_portfolio_transactions_by_stock_id(db: Session, portfolio_id: int, user_id: str, stock_id: int):
    subquery = (
        db.query(Transaction.id)
        .join(Portfolio)
        .filter(
            and_(
                Transaction.portfolio_id == portfolio_id,
                Portfolio.user_id == user_id,
                Transaction.stock_id == stock_id
            )
        )
        .subquery()
    )

    db.query(Transaction).filter(Transaction.id.in_(subquery)).delete(synchronize_session=False)
    db.commit()
    
def delete_portfolio_transaction_by_transaction_id(db: Session, portfolio_id: int, user_id: str, transaction_id: int):
    subquery = (
        db.query(Transaction.id)
        .join(Portfolio)
        .filter(
            and_(
                Transaction.portfolio_id == portfolio_id,
                Portfolio.user_id == user_id,
                Transaction.id == transaction_id
            )
        )
        .subquery()
    )
     
    db.query(Transaction).filter(Transaction.id.in_(subquery)).delete(synchronize_session=False)
    db.commit()

def delete_portfolio(db: Session, portfolio_id: int, user_id: str):
    db_portfolio = get_portfolio(db, portfolio_id, user_id)

    if not db_portfolio:
        raise Exception(detail="Portfolio not found")

    db.delete(db_portfolio)
    db.commit()


def update_portfolio(db: Session, portfolio_id: int, portfolio: PortfolioUpdate, user_id: str):
    db_portfolio = get_portfolio(db, portfolio_id, user_id)

    if not db_portfolio:
        raise Exception(detail="Portfolio not found")

    db_portfolio.name = portfolio.name
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio


def get_transaction_stock(db: Session, portfolio_id: int, user_id: str):
    return db.query(Portfolio).filter(and_(Portfolio.id == portfolio_id, Portfolio.user_id == user_id)).first()


def delete_transaction_stock(db: Session, stock_name: str, user_id: str):
    db_transaction = get_transaction_stock(db, stock_name, user_id)

    if not db_transaction:
        raise Exception(detail="Stock_name not found")

    db.delete(db_transaction)
    db.commit()
