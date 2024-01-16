import uvicorn
from backend.server.app import app
from backend.server.config import port, debug
from backend.server.logger.logger_setup import loggerManager

if __name__ == "__main__":
    
    loggerManager.info(f"The server is running using port={port}, reload={debug}")
    uvicorn.run(
        "__main__:app",
        host="0.0.0.0",
        port=port,
        reload=debug,
    )
