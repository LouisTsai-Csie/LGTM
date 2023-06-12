# package
from fastapi import HTTPException, Header
from validator_collection import validators, checkers, errors
from dotenv import load_dotenv
import jwt
from pytz import timezone
import bcrypt
import os
# file
from model.user import *
from middleware.user import *
from utils.user import *

load_dotenv()

async def user_sign_up(user_data: dict):
    # validate data
    data = validate_user_sign_up(user_data)
    
    # password bcrypt hashing
    hashVal = bcrypt.hashpw(data.password.encode('utf-8'), os.getenv("SALT").encode('utf-8'))
    hashVal = hashVal.decode('utf-8')

    # write to database
    uid = await create_user(data.name, data.email, hashVal, data.picLink)   

    # jwt token
    token = jwt.encode({
        "email": data.email
    }, os.getenv("SALT"), algorithm="HS256")

    response = {
        "data": {
            "access_token": token,
            "expiration": "7d",
            "user": {
                "id": uid,
                "name": data.name,
                "email": data.email,
                "picLink": data.picLink
            }
        }
    }
    return response

async def user_sign_in(user_data: dict):
    # validate data
    data = validate_user_sign_in(user_data)

    # get user password
    result = await get_user_password(data.email)
    uid, name, email, password, picLink = result

    # validate user password
    if not bcrypt.checkpw(data.password.encode('utf-8'), password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Password Not Match")
    
    token = jwt.encode({
        "email": data.email
    }, os.getenv("SALT"), algorithm="HS256")

    response = {
        "data": {
            "access_token": token,
            "expiration": "7d",
            "user": {
                "id": uid,
                "name": name,
                "email": email,
                "picLink": picLink
            }
        }
    }
    return response

async def user_profile(authorization: str = Header(None)):
    token = validate_user_profile(authorization)
    try:
        payload = jwt.decode(token, os.getenv("SALT"), algorithms=["HS256"])
        print(payload)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid JWT Token")
    
    result = await get_user(payload["email"])
    uid, name, email, picLink = result
    response = {
        "data": {
            "user": {
                "id": uid,
                "name": name,
                "email": email,
                "pickLink": picLink
            }
        }
    }
    return response

async def user_status_controller(token: str):
    payload = decode_jwt_token(token)

    result = await get_user_status(payload['email'])

    res = []

    for i in range(len(result)):
        res.append({
            "ticket": result[i][0],
            "name": result[i][1],
            "solved": result[i][2],
            "total": result[i][3]
        })

    response = {
        "data": {
            "status": res
        }
    }
    return response

async def user_progress_controller(data: dict, token: str):
    payload = decode_jwt_token(token)
    acNum, subNum = data['acNum'], data['subNum']
    await update_user_progress(payload['email'], acNum, subNum)
    return {"success": "OK"}

    