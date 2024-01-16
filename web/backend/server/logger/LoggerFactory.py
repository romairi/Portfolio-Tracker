from .LoggerType import LOGGER_TYPE_TO_CLASS


class LoggerFactory:
    @staticmethod
    def create_logger(logger_type, **logger_config):
        logger_class = LOGGER_TYPE_TO_CLASS.get(logger_type)

        assert logger_type, f"{logger_type} is not supported"

        return logger_class(**logger_config)

