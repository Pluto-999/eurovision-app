import os
from psycopg2 import pool
from dotenv import load_dotenv
import json
from db_population_helpers import populate_all_tables


load_dotenv()

connection_string = os.getenv('DATABASE_URL')

connection_pool = pool.SimpleConnectionPool(
    1,  
    10,  
    connection_string
)

if connection_pool:
    print("Connection pool created successfully")

conn = connection_pool.getconn()

cur = conn.cursor()


populate_all_tables(2024, cur, conn)


cur.close()
connection_pool.putconn(conn)
connection_pool.closeall()
