import requests
import json

AUTHENTICATION_SCHEME = 'Bearer '

def create_auth_header(token):
    return f'{AUTHENTICATION_SCHEME}{token}'

def post(url, data):
    return requests.post(url, data=json.dumps(vars(data)), headers = {'content-type': 'application/json'})

def get(url, params=None, headers=None):
    return requests.get(url, headers=headers)