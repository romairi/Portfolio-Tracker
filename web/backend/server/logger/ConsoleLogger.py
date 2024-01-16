import logging
from .Singleton import Singleton
from .LoggerInterface import LoggerInterface


FORMATTER = logging.Formatter(
    "%(asctime)s - %(lineno)s - %(module)s - %(funcName)s - %(levelname)s - %(message)s"
)


class ConsoleLogger(LoggerInterface, metaclass=Singleton):
    def __init__(self, logging_level=logging.DEBUG):
        logger = logging.getLogger("server")
        print(logging_level)
        logger.setLevel(logging_level)

        ch = logging.StreamHandler()
        ch.setFormatter(FORMATTER)
        logger.addHandler(ch)
        self.logger = logger

    def info(self, message):
        self.logger.info(message)
        
    def error(self, message):
        self.logger.error(message)

    def warning(self, message):
        self.logger.warning(message)

    def debug(self, message):
        self.logger.debug(message)
    