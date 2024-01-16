import funcy
from ...services.stock_services.get_stock_price import get_stock_data
from ...crud.portfolios_crud import get_all_portfolios as get_all_portfolios_crud, get_portfolio
from ...crud.stocks_crud import get_stocks_mapping_by_ids
from ..math_calculations.calc import calculate_percentage


def get_stocks_from_portfolio(db_portfolio, db):
    stock_ids = list(set([t.stock_id for t in db_portfolio.transactions]))
    stocks = get_stocks_mapping_by_ids(
        db, stock_ids) if len(stock_ids) > 0 else dict()
    stocks = {id: {**vars(stock), "latest_price": stock.latest_price, **get_stock_data(vars(stock))}  # check if it should be lazy
              for id, stock in stocks.items()}
    return stocks


def extend_portfolio_data(db_portfolio, db) -> dict:
    stocks = get_stocks_from_portfolio(db_portfolio, db)
    transactions = db_portfolio.transactions or []

    modified_transactions = []

    for transaction in transactions:
        stock_cost = transaction.quantity * transaction.purchase_price

        stock_current_price = 0
        stock_gain = 0
        stock_gain_percentage = 0

        if stocks[transaction.stock_id]['latest_price']:
            stock_current_price = stocks[transaction.stock_id]['latest_price'].adj_close
            stock_gain = stock_current_price * transaction.quantity - stock_cost
            stock_gain_percentage = calculate_percentage(
                stock_gain, stock_cost)

        modified_transactions += [{**vars(transaction), "cost": stock_cost, "current_price": stock_current_price,
                                   "total_gain": stock_gain, "total_gain_percentage": stock_gain_percentage}]

    transactions_by_stock_id = funcy.group_by(
        lambda x: x['stock_id'], modified_transactions)

    for key, transactions in transactions_by_stock_id.items():
        adj_close = stocks[transaction.stock_id]['latest_price'].adj_close if stocks[transaction.stock_id]['latest_price'] else 0
        
        stocks[key]['quantity'] = sum(
            map(lambda x: x['quantity'], transactions))
        stocks[key]['total_gain'] = sum(
            map(lambda x: x['total_gain'], transactions))
        stocks[key]['cost'] = sum(map(lambda x: x['cost'], transactions))
        stocks[key]['total_gain_percentage'] = calculate_percentage(
            stocks[key]['total_gain'], stocks[key]['cost'])
         
        
        stocks[key]['value'] = stocks[key]['quantity'] * adj_close
        stocks[key]['transactions'] = transactions

    return {"id": db_portfolio.id, "name": db_portfolio.name, "stocks": stocks}


def get_portfolio_by_id(portfolio_id, user_id, db):
    portfolio = get_portfolio(db, portfolio_id=portfolio_id, user_id=user_id)
    return extend_portfolio_data(portfolio, db) if portfolio is not None else None


def get_all_portfolios(db, user_id):
    portfolios = get_all_portfolios_crud(db, user_id)
    return [extend_portfolio_data(p, db) for p in portfolios]


def get_stocks_by_portfolio_id(portfolio_id, db, user_id):
    db_portfolio = get_portfolio(
        db, portfolio_id=portfolio_id, user_id=user_id)

    stocks = None
    if db_portfolio is not None:
        stocks = get_stocks_from_portfolio(db_portfolio, db)
    return stocks
