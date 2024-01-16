from pydantic import BaseModel, computed_field, Field
from datetime import datetime
import numpy as np
import pandas as pd

class InvestmentRiskMetric(BaseModel):
    daily_pct_change: pd.Series = Field(exclude=True)
    number_of_trading_days: int = Field(255, exclude=True)
    risk_free_rate: float = Field(0.01, exclude=True)
    volatility_window: int = Field(255, exclude=True)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            pd.Series: lambda df: df.to_dict(),
        }

    @computed_field        
    @property
    def sharpe_ratio(self) -> float:
        """
        The Sharpe Ratio is a measure of the risk-adjusted return of an investment or portfolio.
        Formula: (Average Return of Investment - Risk-Free Rate) / Standard Deviation of Investment
        """
        mean = self.daily_pct_change.mean() * self.number_of_trading_days - self.risk_free_rate
        sigma = self.daily_pct_change.std() * np.sqrt(self.number_of_trading_days)

        return float(mean / sigma)

    @computed_field
    @property
    def max_drawdown(self) -> float:
        """
        The maximum drawdown is a measure of the largest loss an investment has experienced from a peak to a trough over a specific period of time.
        It provides insight into the worst-case scenario a portfolio has faced in terms of loss.
        For example, if an investment's value reached $1,000 and then dropped to $700, the max drawdown would be 30% ([$1,000 - $700] / $1,000).
        """
        comp_ret = (self.daily_pct_change+1).cumprod()
        peak = comp_ret.expanding(min_periods=1).max()
        dd = (comp_ret/peak) - 1

        return float(dd.min())

    @computed_field
    @property
    def volatility(self) -> float:
        """
        Volatility measures the degree of variation in the price or value of an investment over time.
        High volatility suggests that the investment's value can change dramatically in a short period, indicating higher risk.
        Low volatility implies more stable and predictable returns.
        """

        volatility = self.daily_pct_change.rolling(window=self.volatility_window).std() * np.sqrt(self.number_of_trading_days)
        # return float(volatility.dropna().iloc[-1])
        return float(volatility.dropna().iloc[-1]) if not volatility.dropna().empty else None
