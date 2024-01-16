from fastapi import Cookie, Response, HTTPException, status
from typing import Optional
from ..send_request import create_auth_header, get as get_request
from ...apis.auth.constants import AUTHENTICATION_API
from ...schemas.User import User
from .constants import COOKIE_MAX_AGE


async def authenticate(JWT: Optional[str] = Cookie(None)):
    results = None

    if JWT:
        headers = {'authorization': create_auth_header(JWT)}
        res = get_request(AUTHENTICATION_API, headers=headers)
        
        if res.status_code == status.HTTP_200_OK and JWT != None:
            user = res.json()['user']
            results = User(**res.json()['user'], id=user['_id'])

    return results


async def require_authentication(JWT: Optional[str] = Cookie(None)):
    user = await authenticate(JWT)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    return user


def handle_auth_response(auth_res, response: Response):
    if auth_res.status_code == status.HTTP_200_OK:
        res_data = auth_res.json()
        response.set_cookie(key='JWT', value=res_data['token'], secure=False,
                            httponly=True, max_age=COOKIE_MAX_AGE, expires=COOKIE_MAX_AGE)
        return res_data['user']
    else:
        return auth_res
