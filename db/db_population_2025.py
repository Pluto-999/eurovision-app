
import os
from psycopg2 import pool
from dotenv import load_dotenv
import json

# from data import scraping_2025

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


#### POPULATE ENTRY TABLE ####

with open("../data/json_data/entries.json", "r") as openfile:
    entries_data = json.load(openfile)


for data in entries_data["all_entries"]:
    cur.execute("""
        INSERT INTO Entry (country, year, artist, song, spotify_url, yt_thumbnail, yt_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
    """,( 
            data["country"], 
            data["year"], 
            data["artist"], 
            data["song"],
            data["spotify_url"], 
            data["yt_thumbnail"], 
            data["yt_url"]
        ))

conn.commit()


#### POPULATE FINAL RESULT TABLE ####

with open("../data/json_data/final_results.json", "r") as openfile:
    final_results_data = json.load(openfile)


for data in final_results_data["final_entries"]:
    cur.execute("""
        INSERT INTO final_result (country, year, position, points, running_order)
        VALUES (%s, %s, %s, %s, %s);
    """,( 
            data["country"], 
            data["year"], 
            data["position"], 
            data["points"],
            data["running_order"]
        ))

conn.commit()


#### POPULATE SEMI RESULT TABLE ####

with open("../data/json_data/semi_1_results.json", "r") as openfile:
    semi_1_results_data = json.load(openfile)


for data in semi_1_results_data["semi_1_entries"]:
    cur.execute("""
        INSERT INTO semi_result (country, year, position, points, running_order, semi_number, is_nq)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
    """,( 
            data["country"], 
            data["year"], 
            data["position"], 
            data["points"],
            data["running_order"],
            data["semi_number"],
            data["is_nq"]
        ))

conn.commit()



with open("../data/json_data/semi_2_results.json", "r") as openfile:
    semi_2_results_data = json.load(openfile)


for data in semi_2_results_data["semi_2_entries"]:
    cur.execute("""
        INSERT INTO semi_result (country, year, position, points, running_order, semi_number, is_nq)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
    """,( 
            data["country"], 
            data["year"], 
            data["position"], 
            data["points"],
            data["running_order"],
            data["semi_number"],
            data["is_nq"]
        ))

conn.commit()


# Close the cursor and return the connection to the pool
cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
