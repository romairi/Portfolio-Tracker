from apscheduler.schedulers.blocking import BlockingScheduler

from ..server.database import engine
from ..server.models import models
from ..server.services.get_db import get_db
from ..server.services.stock_history.update_stock_history import update_db_data
from ..server.logger.logger_setup import loggerManager

sched = BlockingScheduler()

@sched.scheduled_job('cron', day_of_week='wed-sun', hour=19, minute=34, second=0)
def timed_job():
    loggerManager.info('###############START UPDATING STOCKS####################')
    models.Base.metadata.create_all(bind=engine)
    db = next(get_db())
    update_db_data(db)

