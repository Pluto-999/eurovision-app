from bs4 import BeautifulSoup
import requests

url = "https://en.wikipedia.org/wiki/Eurovision_Song_Contest_2025"

page = requests.get(url)

soup = BeautifulSoup(page.text, "html.parser")
# print(soup.prettify())

participants_table = soup.find("table", class_ = "wikitable plainrowheaders sticky-header")
# print(participants_table.prettify())

countries = []
artists = []
songs = []

titles = participants_table.find_all("tr")
# print(titles)

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)
# print(table_entries)


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
    found_opening = False
    while index < len(entry):
        char = entry[index]
        if char == "\n":
            break
        if found_opening:
            index += 1
            continue
        if not char.isalnum() and char != " " and char != '"':
            if found_opening:
                found_opening = False
            else:
                found_opening = True
            index += 1
            continue
        index += 1
        string += char
    return string


def create_country_string(index, entry):
    string = ""
    while index < len(entry):
        char = entry[index]
        if char == "\n":
            break
        index += 1
        string += char
    return string

each_entry = []

# Loop through every entry in the table to get the countries

for entry in table_entries:

    country = create_string(0, entry)

    artist_index = find_string(4, entry)
    artist = create_string(artist_index, entry)

    song_index = find_string(6, entry)
    song = create_string(song_index, entry)

    each_entry.append([country, artist, song.strip()])


print("Each entry ..." , each_entry)


################### FINAL RESULTS ################### 
final_entries = []

final_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[2]
# print(final_results_table.prettify())

titles = final_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)
# print(table_entries)

for entry in table_entries:

    position_index = find_string(10, entry)
    position = create_string(position_index, entry)

    country_index = find_string(2, entry)
    country = create_country_string(country_index, entry)

    points_index = find_string(8, entry)
    points = create_string(points_index, entry)

    running_order = create_string(0, entry)

    final_entries.append([int(position), country.strip(), int(points), int(running_order)])

final_entries.sort()
print("Final entries: ... ", final_entries)


################### SEMI-FINAL 1 RESULTS ###################

semi_1_entries = []

semi_1_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[0]

titles = semi_1_results_table.find_all("tr")
# print(titles)

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)
# print(table_entries)

for entry in table_entries:
    position_index = find_string(10, entry)
    position = create_string(position_index, entry)

    country_index = find_string(2, entry)
    country = create_country_string(country_index, entry)

    points_index = find_string(8, entry)
    points = create_string(points_index, entry)

    running_order = create_string(0, entry)

    semi_1_entries.append([int(position), country.strip(), int(points), int(running_order)])

semi_1_entries.sort()
print("Semi 1 entries: ... ", semi_1_entries)



################### SEMI-FINAL 2 RESULTS ###################

semi_2_entries = []

semi_2_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[1]

titles = semi_2_results_table.find_all("tr")
# print(titles)

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)
# print(table_entries)

for entry in table_entries:
    position_index = find_string(10, entry)
    position = create_string(position_index, entry)

    country_index = find_string(2, entry)
    country = create_country_string(country_index, entry)

    points_index = find_string(8, entry)
    points = create_string(points_index, entry)

    running_order = create_string(0, entry)

    semi_2_entries.append([int(position), country.strip(), int(points), int(running_order)])

semi_2_entries.sort()
print("Semi 2 entries: ... ", semi_2_entries)


#### MATCH UP EACH_ENTRY WITH RESULTS ####
