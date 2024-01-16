from .LoggerManager import LoggerManager
from .config import server_logger_config


loggerManager = LoggerManager.from_config(server_logger_config)