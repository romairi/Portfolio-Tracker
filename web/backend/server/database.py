from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .env import mysql_user, mysql_pass, mysql_host, mysql_port, mysql_db
from .logger.logger_setup import loggerManager


SQLALCHEMY_DATABASE_URL = f'mysql://{mysql_user}:{mysql_pass}@{mysql_host}:{mysql_port}/{mysql_db}'


loggerManager.info(f"Database connection successful to {SQLALCHEMY_DATABASE_URL}")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
   
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
