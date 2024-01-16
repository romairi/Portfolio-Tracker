def get_stock_data(stock):
    dividends = dict(
        annual_yield=1,
        annual_contribution=12
        # TODO: cache the dividends data in a table, update it in a offline service daemon
        # annual_yield=(ticker_info.get("dividendYield", 0) or 0) * 100,
        # annual_contribution=(ticker_info.get("dividendRate", 0) or 0)
    )

    return {
        "dividends": dividends
    }


def get_stocks_change_data(stocks):
    return {stock["id"]: get_stock_data(stock) for stock in stocks}
