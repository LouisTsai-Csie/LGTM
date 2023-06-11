from fastapi import HTTPException
from validator_collection import validators, checkers
import jwt
import os
from model.group import *


def validate_create_group(data):
    # Parse Data
    try: 
        data = createGroupData.parse_obj(data)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid Data Format")
    
    # Validate Email Address
    if not validators.not_empty(data.name): 
        raise HTTPException(status_code=400, detail="Username Empty")
    
    # Validate Types
    if not isinstance(data.types, int):
        raise HTTPException(status_code=400, detail="Invalid Types Format")
    
    # Validate maxiNum 
    if not isinstance(data.maxiNum, int):
        raise HTTPException(status_code=400, detail="Invalid maxiNum Format")

    # Validate restriction
    if not isinstance(data.restriction, int):
        raise HTTPException(status_code=400, detail="Invalid Restriction Format")
    
    return data

def decode_jwt_token(data):
    # parse jwt
    if not data:
        raise HTTPException(status_code=400, detail="Lost JWT Token")
    
    if not validators.not_empty(data):
        raise HTTPException(status_code=400, detail="Not Login")
    
    # Validate JWT Token
    if not checkers.are_equivalent([data[:7], "Bearer"]): 
        raise HTTPException(status_code=400, detail="Authorization Fail")
    
    # Decode JWT Token
    try:
        payload = jwt.decode(data[7:], os.getenv("SALT"), algorithms=["HS256"])
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid Authorization Token")

    return payload

def validate_get_all_group(pages):
    if not (pages<=0):
        print("Invalid Pages Parameter")
        raise HTTPException(status_code=400, detail="Invalid")
    
    return pages

def validate_enter_group(data):
    if not data['ticket']: 
        raise HTTPException(status_code=400, detail="Invalid Group Ticket")
    
    if not isinstance(data['ticket'], str):
        raise HTTPException(status_code=400, detail="Invalid Data Type")
    return data['ticket']

def validate_leave_group(data):
    if not data['ticket']:
        raise HTTPException(status_code=400, detail="Incomplete Data Input")
    
    if not isinstance(data['ticket'], str):
        raise HTTPException(status_code=400, detail="Invalid Data Type")
    
    return data["ticket"]

def validate_group_status(data):
    if not data['ticket']:
        raise HTTPException(status_code=400, detail="Incomplete Data Input")
    
    if not isinstance(data['ticket'], str):
        raise HTTPException(status_code=400, detail="Invalid Data Type")
    
    return data["ticket"]

def validate_group_info(data):
    if not data['ticket']:
        raise HTTPException(status_code=400, detail="Incomplete Data Input")
    
    if not isinstance(data['ticket'], str):
        raise HTTPException(status_code=400, detail="Invalid Data Type")
    
    return data["ticket"]
