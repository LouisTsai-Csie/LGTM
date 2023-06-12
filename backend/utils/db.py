from mysql.connector import pooling
from dotenv import load_dotenv
import threading
import os

load_dotenv()

config = {
    "host": os.getenv("DATABASE_HOST"),
    "port": 3306,
    "database": "final",
    "user": "LouisTsai",
    "password": os.getenv("DATABASE_PASSWORD")
}


connection_pool = pooling.MySQLConnectionPool(pool_name="my_pool", pool_size=12, **config)


def get_connection(connection_pool):
    return connection_pool.get_connection()
    try:
        connection = connection_pool.get_connection()
        return connection
    except:
        connection_pool = pooling.MySQLConnectionPool(pool_name="my_pool", pool_size=32, **config)
        return get_connection()
