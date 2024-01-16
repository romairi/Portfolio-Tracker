from typing import List
from pydantic import BaseModel, validator
from .Transaction import Transaction


class PortfolioBase(BaseModel):
    name: str

    @validator('name')
    def validate_name(cls, v):
        assert 2 <= len(v) <= 32, "name must be between 2 and 32 characters"
        return v


class PortfolioCreate(PortfolioBase):
    user_id: str


class Portfolio(PortfolioBase):
    id: int
    transactions: List[Transaction] = []

    class Config:
        orm_mode = True


class PortfolioUpdate(PortfolioBase):
    pass
