import yfinance as yf
import numpy as np
from datetime import timedelta, datetime
from sqlalchemy.orm import Session

from ...crud.stock_history_crud import create_stock_history, get_latest_stock_history_instance
from ...schemas.StockHistory import StockHistoryBase
from ...crud.stocks_crud import get_all_symbols
from ...logger.logger_setup import loggerManager

def update_stock_history_data(db: Session, symbol: str) -> bool:
    latest_records = get_latest_stock_history_instance(db, symbol)
    start_time = latest_records.date + \
        timedelta(days=1) if latest_records else None
    
    if start_time and start_time > datetime.now(): 
        return False
    
    data = yf.download(symbol, start=start_time, period='max').reset_index()
    data = data[data.Date > start_time] if start_time else data

    if len(data) > 0:
        for col in data.columns:
            data = data.rename(columns={col: col.lower().replace(' ', '_')})

        for col in data.select_dtypes(include=[np.float64]).columns:
            data[col] = data[col].round(3)
        
        data['symbol'] = symbol
        data = data.dropna()
        data = [StockHistoryBase(**d) for d in data.to_dict('records')]
        db_stock_history = create_stock_history(db, symbol, data)

    loggerManager.info(f'Found {len(data)} new records')
    return len(data) > 0


def update_db_data(db: Session):
    symbols = get_all_symbols(db)

    for symbol in symbols:
        try:
            found_new_data = update_stock_history_data(db, symbol)
            
            if found_new_data:
                loggerManager.info(f"{symbol} was updated")
        except Exception as e:
            loggerManager.error(f"{symbol} was failed with {e}")
            