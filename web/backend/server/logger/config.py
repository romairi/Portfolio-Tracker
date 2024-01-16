import logging
from .LoggerType import LoggerType

server_logger_config = {
    LoggerType.CONSOLE_LOGGER: dict(logging_level=logging.DEBUG)
}