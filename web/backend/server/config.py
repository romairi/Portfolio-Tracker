import os

port = int(os.getenv('PORT', 8080))
debug = os.getenv('DEBUG', True) == 'true'
microservice_auth_host = os.getenv('MICROSERVICE_AUTH_HOST')
