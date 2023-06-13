from typing import Union
from typing_extensions import Annotated
from fastapi import APIRouter, Header
from controller.group import *

router = APIRouter()

@router.post("/create")
async def group_create_router(data: dict):
    result = await create_group_controller(data)
    return result


@router.get("/all")
async def group_all_router(pages: int):
    result = await get_all_group_controller(pages)
    return result

@router.post("/enter")
async def group_enter_router(
    data: dict, 
    Authorization: Annotated[Union[str, None], Header()] = None
):
    result = await enter_group_controller(data, Authorization)
    return result

@router.get('/member')
async def group_get_member_router(
    Authorization: Annotated[Union[str, None], Header()] = None
):
    result = await get_group_member_controller(Authorization)
    return result

@router.post('/leave')
async def group_leave_router(
    data: dict,
    Authorization: Annotated[Union[str, None], Header()] = None
):
    result = await leave_group_controller(data, Authorization)
    return result

@router.post('/status')
async def group_status_router(
    data: dict,
):
    result = await get_group_status_controller(data)
    return result

@router.post('/info')
async def group_info_router(
    data: dict,
):
    result = await get_group_info_controller(data)
    return result

@router.post('/update')
async def group_update_router(
    data: dict,
    Authorization: Annotated[Union[str, None], Header()] = None
):
    result = await group_update_controller(data, Authorization)
    return result