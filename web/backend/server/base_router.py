from fastapi import APIRouter
from .apis.auth import auth_router
from .apis.stocks_router import stocks_router
from .apis.transactions_router import transactions_router
from .apis.portfolios_router import portfolios_router


API_ROUTE = '/api'

main_router = APIRouter()

main_router.include_router(
    auth_router,
    prefix=f"{API_ROUTE}/auth",
    tags=["auth"],
)

main_router.include_router(
    stocks_router,
    prefix=f"{API_ROUTE}/stocks",
    tags=["stocks"],
)

main_router.include_router(
    transactions_router,
    prefix=f"{API_ROUTE}/transactions",
    tags=["transactions"],
)

main_router.include_router(
    portfolios_router,
    prefix=f"{API_ROUTE}/portfolios",
    tags=["portfolios"],
)
