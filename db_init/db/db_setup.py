import os
from psycopg2 import pool
from dotenv import load_dotenv
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

cur.execute("""
    CREATE TABLE IF NOT EXISTS Countries (
        country TEXT PRIMARY KEY NOT NULL,
        flag_image TEXT
    )
""")
conn.commit()


cur.execute("""
    CREATE TABLE IF NOT EXISTS Entry
    (
        country TEXT NOT NULL,
        year INT NOT NULL,
        artist TEXT NOT NULL,
        song TEXT NOT NULL,
        spotify_url TEXT NOT NULL,
        yt_thumbnail TEXT NOT NULL,
        yt_url TEXT NOT NULL,
        PRIMARY KEY (country, year),
        FOREIGN KEY (country) REFERENCES Countries(country)
    )
""")
conn.commit()


cur.execute("""
    CREATE TABLE IF NOT EXISTS final_result (
        country TEXT NOT NULL,
        year INT NOT NULL,
        position INT NOT NULL,
        points INT NOT NULL,
        running_order INT NOT NULL,
        PRIMARY KEY (country, year),
        FOREIGN KEY (country, year) REFERENCES Entry(country, year)
    )
""")
conn.commit()


cur.execute("""
    CREATE TABLE IF NOT EXISTS semi_result (
        country TEXT NOT NULL,
        year INT NOT NULL,
        position INT NOT NULL,
        points INT NOT NULL,
        running_order INT NOT NULL,
        semi_number INT NOT NULL,
        is_nq BOOLEAN NOT NULL,
        PRIMARY KEY (country, year),
        FOREIGN KEY (country, year) REFERENCES Entry(country, year)
    )
""")
conn.commit()


cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        CHECK (
            length(username) >= 3 
            AND length(username) <= 15
            AND email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            )
    )
""")

conn.commit()


cur.execute("""
    CREATE TABLE IF NOT EXISTS ranking (
        country TEXT NOT NULL,
        year INT NOT NULL,
        username TEXT NOT NULL,
        position INT,
        points INT,
        stars_rating INT,
        PRIMARY KEY (country, year, username),
        FOREIGN KEY (country, year) REFERENCES Entry(country, year),
        FOREIGN KEY (username) REFERENCES users(username)
        
    )
""")
conn.commit()


# Close the cursor and return the connection to the pool
cur.close()
connection_pool.putconn(conn)
# Close all connections in the pool
connection_pool.closeall()
