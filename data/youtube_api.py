from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
import json
import scraping_2025

load_dotenv()

api_key = os.getenv("API_KEY")

yt_service = build("youtube", "v3", developerKey=api_key)

for entry in scraping_2025.each_entry:
    request = yt_service.search().list(
        part="snippet",
        q=entry[0] + "eurovision 2025",
        maxResults=1
    )

    response = request.execute()
    # print(response)
    video_id = response["items"][0]["id"]["videoId"]
    video_thumbnail = response["items"][0]["snippet"]["thumbnails"]["high"]["url"]
    video_url = "https://www.youtube.com/watch?v=" + video_id
    video_name = response["items"][0]["snippet"]["title"]
    print("The name of the video is: " + video_name)
    print("The id of the video is: " + video_id)
    print("The URL of the video is: " + video_url)
    print("The thumbnail of the video is: " + video_thumbnail)







yt_service.close()

