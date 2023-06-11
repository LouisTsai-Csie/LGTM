from fastapi import HTTPException
from validator_collection import validators, checkers, errors
import jwt
import os
from model.user import *

def validate_user_sign_up(data):
    # Parse Data
    try:
        data = UserSignUpData.parse_obj(data)
    except:
        raise HTTPException(status_code=400, detail="Invalid Data Format")
    
    # Validate Email Address
    try:
        email = validators.email(data.email, allow_empty = False)
    except errors.EmptyValueError:
        raise HTTPException(status_code=400, detail="Empty Email Value")
    except errors.InvalidEmailError:
        raise HTTPException(status_code=400, detail="Invalid Email Format")
   
    # Validate Username
    if not validators.not_empty(data.name): 
        raise HTTPException(status_code=400, detail="Username Empty")
    
    # Validate Password
    if not validators.not_empty(data.password):
        raise HTTPException(status_code=400, detail="Password Empty")

    # Validate PicLink
    # if data.picLink and not validators.ip_address(data.picLink):
    #     raise HTTPException(status_code=400, detail="Invalid Link")
    return data

def validate_user_sign_in(data):
    # Parse Data
    try:
        data = UserSignInData.parse_obj(data)
    except:
        raise HTTPException(status_code=400, detail="Invalid Data Format")
    
    # Validate Email Address
    try:
        email = validators.email(data.email, allow_empty = False)
    except errors.EmptyValueError:
        raise HTTPException(status_code=400, detail="Empty Email Value")
    except errors.InvalidEmailError:
        raise HTTPException(status_code=400, detail="Invalid Email Format")

    # Validate Password
    if not validators.not_empty(data.password):
        raise HTTPException(status_code=400, detail="Password Empty")
    
    return data

def validate_user_profile(data):
    # parse jwt
    if not validators.not_empty(data):
        raise HTTPException(status_code=400, detail="Not Login")
    
    if not checkers.are_equivalent([data[:7], "Bearer"]): 
        raise HTTPException(status_code=400, detail="Authorization Fail")
    
    return data[7:]

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