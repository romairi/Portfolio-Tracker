from fastapi import APIRouter, Response, Depends, status
from .constants import LOGIN_API, REGISTRATION_API
from ...services import send_request
from ...schemas import User
from ...schemas.Auth import LoginRequest, RegistrationRequest, RegistrationFullRequest
from ...services.user_services.authenticate import authenticate, handle_auth_response


auth_router = APIRouter()


@auth_router.get("/authenticate/", tags=["authenticate"])
async def authenticate(user: User = Depends(authenticate)):
    return user


@auth_router.post("/login/", tags=["login"])
async def login(body: LoginRequest, response: Response):
    res = send_request.post(LOGIN_API, body)
    return handle_auth_response(res, response)


@auth_router.post("/register/", tags=["register"])
async def register(body: RegistrationRequest, response: Response):
    res = send_request.post(
        REGISTRATION_API, RegistrationFullRequest(**vars(body)))
    return handle_auth_response(res, response)

@auth_router.get("/logout/", tags=["logout"])
async def logout(response: Response):
    response.delete_cookie("JWT")
    return status.HTTP_200_OK
