from ...config import microservice_auth_host

# Auth routes
LOGIN_API = f'http://{microservice_auth_host}/login'
REGISTRATION_API = f'http://{microservice_auth_host}/registration'
AUTHENTICATION_API = f'http://{microservice_auth_host}/authentication'
