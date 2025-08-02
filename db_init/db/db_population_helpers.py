import json


def populate_entry_table(year, cur, conn):
    path = f"../data/json_data/entries_{year}.json"

    with open(path, "r") as openfile:
        entries_data = json.load(openfile)

    for data in entries_data["all_entries"]:
        cur.execute("""
            INSERT INTO Entry (country, year, artist, song, spotify_url, yt_thumbnail, yt_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
        """,( 
                data["country"], 
                data["year"], 
                data["artist"], 
                data["song"],
                data["spotify_url"], 
                data["yt_thumbnail"], 
                data["yt_url"]
            ))

    conn.commit()


def populate_final_result_table(year, cur, conn):
    path = f"../data/json_data/final_results_{year}.json"

    with open(path, "r") as openfile:
        final_results_data = json.load(openfile)

    for data in final_results_data["final_entries"]:
        cur.execute("""
            INSERT INTO final_result (country, year, position, points, running_order)
            VALUES (%s, %s, %s, %s, %s);
        """,( 
                data["country"], 
                data["year"], 
                data["position"], 
                data["points"],
                data["running_order"]
            ))

    conn.commit()


def populate_semi_results_tables(year, cur, conn):
    semi_1_path = f"../data/json_data/semi_1_results_{year}.json"

    with open(semi_1_path, "r") as openfile:
        semi_1_results_data = json.load(openfile)

    for data in semi_1_results_data["semi_1_entries"]:
        cur.execute("""
            INSERT INTO semi_result (country, year, position, points, running_order, semi_number, is_nq)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
        """,( 
                data["country"], 
                data["year"], 
                data["position"], 
                data["points"],
                data["running_order"],
                data["semi_number"],
                data["is_nq"]
            ))

    conn.commit()

    semi_2_path = f"../data/json_data/semi_2_results_{year}.json"

    with open(semi_2_path, "r") as openfile:
        semi_2_results_data = json.load(openfile)

    for data in semi_2_results_data["semi_2_entries"]:
        cur.execute("""
            INSERT INTO semi_result (country, year, position, points, running_order, semi_number, is_nq)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
        """,( 
                data["country"], 
                data["year"], 
                data["position"], 
                data["points"],
                data["running_order"],
                data["semi_number"],
                data["is_nq"]
            ))

    conn.commit()


def populate_all_tables(year, cur, conn):
    populate_entry_table(year, cur, conn)
    populate_final_result_table(year, cur, conn)
    populate_semi_results_tables(year, cur, conn)