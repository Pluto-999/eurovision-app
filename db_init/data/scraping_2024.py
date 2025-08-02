from bs4 import BeautifulSoup
import requests
import json
from scraping_helpers import (
    find_string, create_string, create_string_with_brackets, 
    write_entries, write_final_results, write_semi_results
)

url = "https://en.wikipedia.org/wiki/Eurovision_Song_Contest_2024"

page = requests.get(url)

soup = BeautifulSoup(page.text, "html.parser")


################### ENTRIES ###################

participants_table = soup.find("table", class_ = "wikitable plainrowheaders sticky-header")

titles = participants_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)

write_entries(table_entries, 2024)


################### FINAL RESULTS ###################

final_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[3]

titles = final_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)

write_final_results(table_entries, 2024)


################### SEMI-FINAL 1 RESULTS ###################

semi_1_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[1]

titles = semi_1_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)

write_semi_results(table_entries, 2024, 1)


################### SEMI-FINAL 2 RESULTS ###################

semi_2_results_table = soup.find_all("table", class_ = "sortable wikitable plainrowheaders")[2]

titles = semi_2_results_table.find_all("tr")

table_entries = [ title.text.strip() for title in titles ]
table_entries.pop(0)

write_semi_results(table_entries, 2024, 2)
