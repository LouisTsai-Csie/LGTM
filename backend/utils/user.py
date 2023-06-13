from fastapi import HTTPException
from utils.db import *

async def create_user(name: str, email: str, password: str, picLink: str):
    query = "INSERT INTO user (name, email, password, picLink) VALUES (%s, %s, %s, %s)"
    values = [name, email, password, picLink]
    connection = get_connection(connection_pool)
    cursor = connection.cursor()
    try:
        cursor.execute(query, values)
        connection.commit()
        last_insert_id = cursor.lastrowid
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return last_insert_id

async def get_user_password(email: str):
    query = "SELECT id, name, email, password, picLink, acNum, subNum FROM user WHERE email=%s"
    values = [email]
    connection = get_connection(connection_pool)
    cursor = connection.cursor()
    try:
        cursor.execute(query, values)
        result = cursor.fetchone()
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail="Invalid Email")
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return result

async def get_user(email: str):
    print(email)
    query = "SELECT id, name, email, picLink, acNum, subNum FROM user WHERE email=%s"
    values = [email]
    connection = get_connection(connection_pool)
    cursor = connection.cursor()
    try:
        cursor.execute(query, values)
        result = cursor.fetchone()
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=400, detail="Invalid Email")
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return result
    
async def get_user_status(email: str):
    connection = get_connection(connection_pool)
    cursor = connection.cursor()

    query = "SELECT \
	         room.ticket, room.name, status.solved, status.total \
             FROM room \
             INNER JOIN status ON room.ticket = status.ticket \
             WHERE status.uid = %s \
            "

    values = [email]
    try:
        cursor.execute(query, values)
        result = cursor.fetchall()
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
    
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return result

async def update_user_progress(email: str, acNum: int, subNum: int):
    connection = get_connection(connection_pool)
    cursor = connection.cursor()

    query = "UPDATE user \
             SET acNum = %s, \
             subNum = %s \
             WHERE email=%s; \
    "
    values = [acNum, subNum, email]
    try:
        cursor.execute(query, values)
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return

async def update_user_number(email: str):
    connection = get_connection(connection_pool)
    cursor = connection.cursor()
    query = "UPDATE user SET \
        subNum = subNum + 1, \
        acNum = acNum + 1\
        where email=%s;\
    "
    values = [email]
    try:
        cursor.execute(query, values)
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return