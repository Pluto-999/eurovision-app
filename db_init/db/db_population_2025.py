
import os
from psycopg2 import pool
from dotenv import load_dotenv
import json
from db_population_helpers import populate_all_tables

# Load .env file
load_dotenv()
# Get the connection string from the environment variable
connection_string = os.getenv('DATABASE_URL')
# Create a connection pool
connection_pool = pool.SimpleConnectionPool(
    1,  # Minimum number of connections in the pool
    10,  # Maximum number of connections in the pool
    connection_string
)
# Check if the pool was created successfully
if connection_pool:
    print("Connection pool created successfully")
# Get a connection from the pool
conn = connection_pool.getconn()
# Create a cursor object
cur = conn.cursor()


#### POPULATE COUNTRIES TABLE ####

with open("../data/json_data/flags.json", "r") as openfile:
    flags_data = json.load(openfile)


for key, value in flags_data.items():
    cur.execute("INSERT INTO Countries (country, flag_image) VALUES (%s, %s)", 
                (key, value))

conn.commit()


populate_all_tables(2025, cur, conn)


# Close the cursor and return the connection to the pool
cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
