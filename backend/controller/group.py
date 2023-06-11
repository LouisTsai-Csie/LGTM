# package
from dotenv import load_dotenv
import json
import uuid
# file
from model.group import *
from middleware.group import *
from utils.group import *

load_dotenv()

async def create_group_controller(data: dict):
    # validate data
    payload = decode_jwt_token(data['headers']['Authorization'])
    data = validate_create_group(data['data'])

    serial = str(uuid.uuid4())[:9]
    ticket = f'{serial[:3]}-{serial[3:6]}-{serial[6:9]}'
    
    await create_group(
        ticket,
        data.name,
        data.tag,
        data.types,
        data.maxiNum,
        data.restriction,
        data.picLink,
        data.description,
        1,
        payload['email']
    )

    response = {
        "data": {
            "ticket": ticket,
            "name": data.name,
            "tag": data.tag,
            "maxiNum": data.maxiNum,
            "restriction": data.restriction,
            "picLink": data.picLink,
            "description": data.description,
            "memNum": 1,
            "owner": payload["email"]
        }
    }
    return response

async def get_all_group_controller(pages: int):
    # validate data
    
    pages = validate_get_all_group(pages)

    result = await get_all_group(pages)
    
    res = []

    for i in range(len(result)):
        res.append({
            "ticket": result[i][0],
            "name": result[i][1],
            "tags": json.loads(result[i][2]),
            "types": result[i][3],
            "picLink": result[i][4],
            "memNum": result[i][5]
        })

    response = {
        "data": {
            "group": res
        },
        "pages": pages+1 if len(result) else None
    }
    return response

    
async def enter_group_controller(data: dict, token: str):
    print(data)
    print(token)
    payload = decode_jwt_token(token)
    ticket    = validate_enter_group(data['data'])
    # print(f'ticket: {ticket} email: {payload["email"]}')
    result = await enter_group(ticket, payload['email'])
    response = {
        "data": {
            "total": result,
            "ticket": ticket
        }
    }
    return response

async def get_group_member_controller(token: str):
    payload = decode_jwt_token(token)
    result = await get_my_group(payload['email'])

    res = []
    for i in range(len(result)):
        res.append({
            "ticket": result[i][0],
            "name": result[i][1],
            "tags": json.loads(result[i][2]),
            "types": result[i][3],
            "picLink": result[i][4],
            "memNum": result[i][5]
        })

    response = {
        "data": {
            "group": res
        }
    }
    return response
    
async def leave_group_controller(data: dict, token: str):
    ticket = validate_leave_group(data['data'])
    payload = decode_jwt_token(token)
    await leave_group(ticket, payload['email'])
    response = {
        "data": {
            "ticket": ticket
        }
    }
    return response
    
async def get_group_status_controller(data: dict):
    ticket = validate_group_status(data['data'])
    result = await get_group_status(ticket)

    res = []

    for i in range(len(result)):
        res.append({
            "name": result[i][0],
            "ticket": result[i][1],
            "solved": result[i][2],
            "total": result[i][3],
            "totalSolved": result[i][4],
            "totalMissed": result[i][5]
        })
    
    response = {
        "data": {
            "status": res
        }
    }
    return response

async def get_group_info_controller(data: dict):
    ticket = validate_group_info(data['data'])
    result = await get_group_info(ticket)
    name, memNum, restriction, description = result[0]
    response = {
        "data": {
            "name": name,
            "memNum": memNum,
            "restriction": restriction,
            "description": description
        }
    }
    return response