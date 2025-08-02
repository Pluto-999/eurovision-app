from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.getenv("API_KEY")

yt_service = build("youtube", "v3", developerKey=api_key)


def add_yt_data(country, year):
    request = yt_service.search().list(
        part="snippet",
        q=country + f"eurovision {year} live",
        maxResults=1
    )
    
    response = request.execute()

    video_id = response["items"][0]["id"]["videoId"]
    video_thumbnail = response["items"][0]["snippet"]["thumbnails"]["high"]["url"]
    video_url = "https://www.youtube.com/watch?v=" + video_id
    
    return [video_thumbnail, video_url]


yt_service.close()
