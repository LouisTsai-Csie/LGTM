from typing import Optional
from pydantic import BaseModel

class UserSignUpData(BaseModel):
    name: str
    email: str
    password: str
    picLink: Optional[str] = None
    csrf_token: Optional[str] = None
    session: Optional[str] = None


class UserSignInData(BaseModel):
    email: str
    password: str
