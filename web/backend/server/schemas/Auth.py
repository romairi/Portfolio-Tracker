from pydantic import BaseModel, validator


class LoginRequest(BaseModel):
    email: str
    password: str


class RegistrationRequest(BaseModel):
    username: str
    email: str
    password: str
    confirmPassword: str

    @validator('confirmPassword')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('passwords do not match')
        return v


class RegistrationFullRequest(BaseModel):
    username: str
    email: str
    password: str
