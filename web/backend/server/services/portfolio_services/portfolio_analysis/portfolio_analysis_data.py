import pandas as pd

from pydantic import BaseModel
from .investment_risk_metric import InvestmentRiskMetric
from .get_portfolio_transactions import get_portfolio_transactions_df
from .get_cumulative_return import calculate_cum_value, get_total_cum_return, get_total_portfolio_pct_change


class PortfolioAnalysisData(BaseModel):
    portfolio_daily_pct_change: pd.Series
    portfolio_monthly_pct_change: pd.Series
    cum_return: pd.Series
    cum_value: pd.Series
    stock_transaction_df: pd.DataFrame
    risk_metrics: InvestmentRiskMetric


    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            pd.DataFrame: lambda df: df.to_dict(),
            pd.Series: lambda df: df.to_dict(),
        }

    @classmethod
    def from_db(cls, db, portfolio_id, user_id):
        stock_transaction_df = get_portfolio_transactions_df(db, portfolio_id=portfolio_id, user_id=user_id)

        if stock_transaction_df is None or len(stock_transaction_df) == 0:
            return None

        portfolio_daily_pct_change = get_total_portfolio_pct_change(stock_transaction_df, db)
        portfolio_monthly_pct_change = (portfolio_daily_pct_change+1).groupby(pd.Grouper(freq='M')).apply(lambda x: x.cumprod().iloc[-1] - 1)

        cum_return = get_total_cum_return(portfolio_daily_pct_change)
        cum_value = calculate_cum_value(stock_transaction_df, cum_return)

        return cls(
            portfolio_daily_pct_change=portfolio_daily_pct_change,
            portfolio_monthly_pct_change=portfolio_monthly_pct_change,
            cum_return=cum_return,
            cum_value=cum_value,
            stock_transaction_df=stock_transaction_df,
            risk_metrics=InvestmentRiskMetric(daily_pct_change=portfolio_daily_pct_change),
        )