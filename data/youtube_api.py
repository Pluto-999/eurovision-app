from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.getenv("API_KEY")

yt_service = build("youtube", "v3", developerKey=api_key)


def add_yt_data(country):
    request = yt_service.search().list(
        part="snippet",
        q=country + "eurovision 2025 live",
        maxResults=1
    )
    
    response = request.execute()

    video_id = response["items"][0]["id"]["videoId"]
    video_thumbnail = response["items"][0]["snippet"]["thumbnails"]["high"]["url"]
    video_url = "https://www.youtube.com/watch?v=" + video_id
    
    return [video_thumbnail, video_url]


with open("./json_data/entries.json", "r") as openfile:
    data = json.load(openfile)


for each_entry in data["all_entries"]:
    yt_data = add_yt_data(each_entry["country"])
    each_entry["yt_thumbnail"] = yt_data[0]
    each_entry["yt_url"] = yt_data[1]


with open("./json_data/entries.json", "w") as outfile:
    json.dump(data, outfile, ensure_ascii=False)


yt_service.close()
