from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
from scraping_2025 import each_entry, final_results, semi_1_results, semi_2_results, full_results
from youtube_api import each_entry_with_all_data

atlas_uri = os.getenv("ATLAS_URI")
db_name = os.getenv("DB_NAME")

client = MongoClient(atlas_uri)
database = client[db_name]

entries_2025 = database["All 2025 Entries"]
# entries_2025.insert_one({ "name": "test", "address": "some random place" })


for entry in each_entry_with_all_data:
    my_dict = {
        "country": entry[0],
        "artist": entry[1],
        "song": entry[2],
        "spotify_url": entry[3],
        "yt_thumbnail": entry[4],
        "yt_url": entry[5],       
        }
    print(my_dict)
    entries_2025.insert_one(my_dict)


# print(each_entry)
