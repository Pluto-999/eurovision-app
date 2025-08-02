from spotify_api import add_spotify_track
from youtube_api import add_yt_data
import json

def find_string(spaces_required, entry):
    index = 0
    counter = 0
    while index < len(entry) and counter < spaces_required:
        char = entry[index]
        index += 1
        if char == "\n":
            counter += 1

    return index


def create_string(index, entry):
    string = ""
    quote_mark_counter = 0

    while index < len(entry):
        char = entry[index]
        if quote_mark_counter >= 2:
            return string[1:-1]
        if char == "\n" or char == "[" or char == "(":
            break
        if char == '"':
            quote_mark_counter += 1
        index += 1
        string += char

    return string


def create_string_with_brackets(index, entry):
    string = ""
    quote_mark_counter = 0

    while index < len(entry):
        char = entry[index]
        if quote_mark_counter >= 2:
            return string[1:-1]
        if char == "\n" or char == "[":
            break
        if char == '"':
            quote_mark_counter += 1
        index += 1
        string += char

    return string


def write_entries(table_entries, year):
    all_entries = []
    all_entries_dict = {}

    for entry in table_entries:

        country = create_string(0, entry)

        artist_index = find_string(4, entry)
        artist = create_string(artist_index, entry)

        song_index = find_string(6, entry)
        song = create_string_with_brackets(song_index, entry)

        # yt_thumbnail, yt_url = add_yt_data(country, year)

        all_entries.append({
            "country": country.strip(), 
            "year": year, 
            "artist": artist, 
            "song": song,
            "spotify_url": add_spotify_track(artist, song, year),
            # "yt_thumbnail": yt_thumbnail,
            # "yt_url": yt_url
            }
        )

    all_entries_dict["all_entries"] = all_entries

    with open(f"./json_data/entries_{year}.json", "w") as outfile:
        json.dump(all_entries_dict, outfile, ensure_ascii=False)


def write_final_results(table_entries, year):
    final_results = []
    final_results_dict = {}

    for entry in table_entries:

        position_index = find_string(10, entry)
        position = create_string(position_index, entry)

        country_index = find_string(2, entry)
        country = create_string(country_index, entry)

        points_index = find_string(8, entry)
        points = create_string(points_index, entry)

        running_order = create_string(0, entry)

        try:
            pos_int = int(position)
            pts_int = int(points)
            final_results.append({
                "country": country.strip(),
                "year": year,
                "position": pos_int,
                "points": pts_int,
                "running_order": int(running_order)
            })
        except ValueError:
            final_results.append({
                "country": country.strip(),
                "year": year,
                "position": -1,
                "points": -1,
                "running_order": int(running_order)
            })

    final_results_dict["final_entries"] = final_results

    with open(f"./json_data/final_results_{year}.json", "w") as outfile:
        json.dump(final_results_dict, outfile)


def write_semi_results(table_entries, year, semi_number):
    semi_results = []
    semi_results_dict = {}

    for entry in table_entries:
        position_index = find_string(10, entry)
        position = create_string(position_index, entry)

        country_index = find_string(2, entry)
        country = create_string(country_index, entry)

        points_index = find_string(8, entry)
        points = create_string(points_index, entry)

        running_order = create_string(0, entry)

        # add nq bool
        nq = False
        if int(position) > 10:
            nq = True

        semi_results.append({
            "country": country.strip(), 
            "year": year, 
            "position": int(position), 
            "points": int(points), 
            "running_order": int(running_order),
            "semi_number": semi_number,
            "is_nq": nq
        })


    semi_results_dict[f"semi_{semi_number}_entries"] = semi_results

    with open(f"./json_data/semi_{semi_number}_results_{year}.json", "w") as outfile:
        json.dump(semi_results_dict, outfile)