from fastapi import HTTPException
from utils.db import *
import json

async def create_group(
    ticket: str,
    name: str,
    tag: list,
    types: int,
    maxiNum: int,
    restriction: int,
    picLink: str,
    description: str,
    memNum: int,
    owner: str
):
    query = "INSERT INTO room ( \
            ticket, name, tag, types, maxiNum, restriction, picLink, description, memNum, owner \
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) \
    "
    values = [ticket, name, json.dumps(tag), types, maxiNum, restriction, picLink, description, memNum, owner]
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

    query = "INSERT INTO status ( \
        uid, ticket, solved, total, totalSolved, totalMissed \
    ) VALUES (%s, %s, %s, %s, %s, %s) \
    "
    values = [owner, ticket, 0, maxiNum, 0, 0]
    try:
        cursor.execute(query, values)
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")

    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return last_insert_id

async def get_all_group(pages: int):
    query = "SELECT ticket, name, tag, types, picLink, memNum FROM room WHERE id > %s ORDER BY id LIMIT 21"
    values = [pages*10]
    connection = get_connection(connection_pool)
    cursor = connection.cursor()
    try:
        cursor.execute(query, values)
        result = cursor.fetchall()
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return result

async def enter_group(ticket: str, email: str):
    print(f'ticket: {ticket} email: {email}')
    connection = get_connection(connection_pool)
    cursor = connection.cursor()

    query = "SELECT restriction FROM room WHERE ticket=%s"
    values = [ticket]
    try:
        cursor.execute(query, values)
        result = cursor.fetchone()
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=500, detail="Invalid Ticket Serial")
    
    total = result[0]

    query = "INSERT INTO status ( \
        uid, ticket, solved, total, totalSolved, totalMissed \
    ) VALUES (%s, %s, %s, %s, %s, %s) \
    "
    values = [email, ticket, 0, total, 0, 0]
    try:
        cursor.execute(query, values)
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=400, detail="Invalid Input Data")
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return total
    
async def get_my_group(email: str):
    connection = get_connection(connection_pool)
    cursor = connection.cursor()

    query = "SELECT \
	    room.ticket, room.name, room.tag, room.types, room.picLink, room.memNum \
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
        raise HTTPException(status_code=400, detail="Invalid Email Address")
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return result

async def leave_group(ticket: str, email: str):
    connection = get_connection(connection_pool)
    cursor = connection.cursor()

    query = "DELETE FROM status \
             WHERE uid = %s AND ticket = %s; \
            "
    values = [email, ticket]
    try:
        cursor.execute(query, values)
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=400, detail="Invalid Parameter")
    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return

async def get_group_status(ticket: str):
    connection = get_connection(connection_pool)
    cursor = connection.cursor()

    query = "SELECT \
	         user.name, status.ticket, status.solved, status.total, status.totalSolved, status.totalMissed \
             FROM user \
             INNER JOIN status ON user.email = status.uid \
             WHERE status.ticket = %s \
            "
    values = [ticket]
    try:
        cursor.execute(query, values)
        result = cursor.fetchall()
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=400, detail="Invalid Ticker Number")

    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return result

async def get_group_info(ticket: str):
    connection = get_connection(connection_pool)
    cursor = connection.cursor()

    query = "SELECT \
	         name, memNum, restriction, description \
             FROM room \
             WHERE ticket = %s \
            "
    values = [ticket]
    try:
        cursor.execute(query, values)
        result = cursor.fetchall()
        connection.commit()
    except Exception as e:
        print(e)
        connection.rollback()
        raise HTTPException(status_code=400, detail="Invalid Ticket Number")

    cursor.close()
    connection.close()
    # reconnect(connection_pool)
    return result