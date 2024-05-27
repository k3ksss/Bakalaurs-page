import sqlite3

db_name = 'data_prep/negadijumi.db'

#connect
conn = sqlite3.connect(db_name)
c = conn.cursor()


# c.execute("DELETE FROM descriptions")
# c.execute("DELETE FROM data")
# conn.commit()

# c.execute("SELECT name FROM sqlite_master WHERE type='table';")
# tables = c.fetchall()

# for table in tables:
#     print(f"Table: {table[0]}")
#     c.execute(f"SELECT * FROM {table[0]};")
#     rows = c.fetchall()
#     for row in rows:
#         for column in row:
#             if isinstance(column, (int, float)):
#                 # Handle if var is a number
#                 print(f"{column}")
#             elif isinstance(column, str):
#                 # Handle if var is a string
#                 print(f"{column}".encode("utf-8"))
#         print("--------------")
            


conn.close()