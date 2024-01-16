from enum import Enum

from .ConsoleLogger import ConsoleLogger

class LoggerType(Enum):
    CONSOLE_LOGGER="console_logger"

LOGGER_TYPE_TO_CLASS = {
    LoggerType.CONSOLE_LOGGER: ConsoleLogger
}