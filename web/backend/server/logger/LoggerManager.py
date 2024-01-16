from .LoggerInterface import LoggerInterface
from .LoggerFactory import LoggerFactory


class LoggerManager:
    def __init__(self, loggers: LoggerInterface):
        self.loggers = loggers

    def info(self, message):
        for logger in self.loggers:
            logger.info(message)

    def error(self, message):
        for logger in self.loggers:
            logger.error(message)

    def warning(self, message):
        for logger in self.loggers:
            logger.warning(message)
    
    def debug(self, message):
        for logger in self.loggers:
            logger.debug(message)

    @classmethod
    def from_config(cls, config):
        """ Config is an object of loggers with their arguments """
        loggers = [LoggerFactory.create_logger(logger_type, **logger_config) for logger_type, logger_config in config.items()]

        return cls(loggers)


