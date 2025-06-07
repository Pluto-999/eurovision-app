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
        if not char.isalnum():
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

# Loop through every entry in the table to get the countries
def add_countries():
    for entry in table_entries:

        string = create_string(0, entry)

        countries.append(string)

# Loop through every entry in the table to get the Artist
def add_artists():
    for entry in table_entries:

        index = find_string(4, entry)

        string = create_string(index, entry)

        artists.append(string)

# Loop through every entry in the table to get the Song
def add_songs():
    for entry in table_entries:

        index = find_string(6, entry)
        
        string = create_string(index, entry)

        songs.append(string)


add_countries()
add_artists()
add_songs()


# print(countries)
# print(artists)
# print(songs)

each_entry = []

index = 0

while index < len(countries) and index < len(artists) and index < len(songs):
    each_entry.append([countries[index], artists[index], songs[index]])
    index += 1

# print(each_entry)
    


################### FINAL RESULTS ################### 

final_countries = []
final_running_order = []
final_points = []
final_position = []


final_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[2]
# print(final_results_table[2].prettify())

titles = final_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)
# print(table_entries)

final_entries = []

for entry in table_entries:

    # index = find_string(2, entry)

    # string = create_country_string(index, entry)

    # final_countries.append(string.strip())

    # ## 
    # string = create_string(0, entry)

    # final_running_order.append(int(string))

    # ## 
    # index = find_string(8, entry)

    # string = create_string(index, entry)

    # final_points.append(int(string))

    # ##
    # index = find_string(10, entry)

    # string = create_string(index, entry)

    # final_position.append(int(string))

    position_index = find_string(10, entry)
    position = create_string(position_index, entry)

    country_index = find_string(2, entry)
    country = create_country_string(country_index, entry)

    points_index = find_string(8, entry)
    points = create_string(points_index, entry)

    running_order = create_string(0, entry)

    final_entries.append([int(position), country.strip(), int(points), int(running_order)])

# print(countries_results)

# for entry in table_entries:
#     string = create_string(0, entry)

#     final_running_order.append(int(string))

# print(final_running_order)


# for entry in table_entries:
#     index = find_string(0, 0, 8, entry)

#     string = create_string(index, entry)

#     final_points.append(int(string))

# print(final_points)

# for entry in table_entries:
#     index = find_string(0, 0, 10, entry)

#     string = create_string(index, entry)

#     final_position.append(int(string))

# print(final_position)

# final_entries = []

# index = 0

# while index < len(final_countries) and index < len(final_running_order) and index < len(final_points) and index < len(final_position):
#     final_entries.append([final_position[index], final_countries[index], final_points[index], final_running_order[index]])
#     index += 1

final_entries.sort()
print("Final entries: ... ", final_entries)


################### SEMI-FINAL RESULTS ###################

semi_1_countries = []
semi_1_running_order = []
semi_1_points = []
semi_1_positions = []
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


