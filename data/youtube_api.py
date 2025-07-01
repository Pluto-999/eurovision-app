from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
from spotify_api import each_entry_with_spotify, final_results_with_spotify, semi_1_results_with_spotify, semi_2_results_with_spotify, full_results_with_spotify

load_dotenv()

api_key = os.getenv("API_KEY")

yt_service = build("youtube", "v3", developerKey=api_key)

def add_yt_data(list):

    for entry in list:
        request = yt_service.search().list(
            part="snippet",
            q=entry[0] + "eurovision 2025 live",
            maxResults=1
        )

        response = request.execute()
        # print(response)
        video_id = response["items"][0]["id"]["videoId"]
        video_thumbnail = response["items"][0]["snippet"]["thumbnails"]["high"]["url"]
        video_url = "https://www.youtube.com/watch?v=" + video_id
        video_name = response["items"][0]["snippet"]["title"]
        # print("The name of the video is: " + video_name)
        # print("The id of the video is: " + video_id)
        # print("The URL of the video is: " + video_url)
        # print("The thumbnail of the video is: " + video_thumbnail)
        entry.append(video_thumbnail)
        entry.append(video_url)

    return list


each_entry_with_all_data = add_yt_data(each_entry_with_spotify)


yt_service.close()

