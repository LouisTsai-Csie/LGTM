# package
from typing import Union
from typing_extensions import Annotated
from fastapi import APIRouter, Header
# file
from controller.user import *

router = APIRouter()

@router.post("/signup")
async def user_sign_up_route(data: dict):
    result = await user_sign_up(data)
    return result

@router.post("/signin")
async def user_sign_in_route(user_data: dict):
    result = await user_sign_in(user_data)
    return result

@router.get("/profile")
async def user_profile_route(authorization: str = Header(None)):
    result = await user_profile(authorization)
    return result

@router.get("/status")
async def user_status_route(Authorization: Annotated[Union[str, None], Header()] = None):
    result = await user_status_controller(Authorization)
    return result

@router.post('/submission')
async def user_submission_route():
    return 'OK'

@router.post('/progress')
async def user_progress_route(
    data: dict,
    Authorization: Annotated[Union[str, None], Header()] = None
):
    result = await user_progress_controller(data, Authorization)
    return result

