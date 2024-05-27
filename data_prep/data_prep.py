import sqlite3
import os
import shutil
import datetime
import re

db_name = 'data_prep/negadijumi.db'

current_time = datetime.datetime.now().strftime('%H-%M-%S')
    
    # Get the file extension
file_extension = db_name.split('.')[-1]

new_file_name = f"{current_time}.{file_extension}"

# Create new file path
new_file_path = f"data_prep/old/{new_file_name}"

# Copy and rename the file
shutil.copy2(db_name, new_file_path)

#connect
conn = sqlite3.connect(db_name)
c = conn.cursor()

#create tables
# # # # c.execute("""CREATE TABLE descriptions (
# # # #     id INTEGER PRIMARY KEY,
# # # #     description TEXT,
# # # #     x_unit TEXT,
# # # #     y_unit TEXT
# # # # );""")
# # # # c.execute("""CREATE TABLE data (
# # # #     id INTEGER PRIMARY KEY,
# # # #     description_id INTEGER,
# # # #     name TEXT,
# # # #     value REAL,
# # # #     FOREIGN KEY(description_id) REFERENCES descriptions(id)
# # # # );""")

# #delete all
# c.execute("DELETE FROM descriptions")
# c.execute("DELETE FROM data")

current_desc_id = 1
c.execute(f"SELECT * FROM descriptions WHERE id = (SELECT MAX(id) FROM descriptions);")
result = c.fetchall()
if result:
    current_desc_id = result[0][0] + 1

current_data_id = 1
c.execute(f"SELECT * FROM data WHERE id = (SELECT MAX(id) FROM data);")
result = c.fetchall()
if result:
    current_data_id = result[0][0] + 1

print(current_data_id)
print(current_desc_id)

def insert_description(description, x_unit, y_unit):
    global current_desc_id
    # Insert a row of data into the 'descriptions' table
    c.execute(f"INSERT INTO descriptions VALUES ({current_desc_id}, '{description}', '{x_unit}', '{y_unit}')")
    current_desc_id += 1
def insert_data(desc_id, name, value):
    global current_data_id
    # Insert a row of data into the 'data' table
    c.execute(f"INSERT INTO data VALUES ({current_data_id}, {desc_id}, '{name}', {value})")
    current_data_id += 1

# insert_description("smt", "sasd", "ada")
# insert_data(1, "sss", 124)

def extract_number(s):
    match = re.search(r'\d+', s)
    return int(match.group()) if match else None



input_string = """
Reģistrētie CSNg 								61383		54323			35058		38343		
Reģistrētie CSNgsm 								4781		4196			3160		3193		
Kopējais bojā gājušo skaits (30 dienas)								419		316			254		218		
Kopējais  ievainoto skaits								6088		5408			3930		4023		
T.sk. smagi ievainoti								638		791			681		569		
Bojā gājušo gājēju skaits								158		105			82		79		
Ievainoto gājēju skaits								1405		1178			873		931		
T.sk. smagi ievainoti								117		177			177		145		
Bojā gājušo velosipēda vadītāju skaits								18		15			26		13		
Ievainoto velosipēda vadītāju skaits								268		254			258		326		
T.sk. smagi ievainoti								28		52			42		39		
Bojā gājušo mopēda vadītāju skaits								4		3			1		4		
Ievainoto mopēda vadītāju skaits								127		122			99		112		
T.sk. smagi ievainoti								15		24			18		21		
Bojā gājušo kvadricikla vadītāju skaits								1		1			3		1		
Ievainoto kvadriciklu vadītāju skaits								13		11			15		11		
T.sk. smagi ievainoti								3		3			7		2		
Bojā gājušo motocikla vadītāju skaits								9		10			7		15		
Ievainoto motocikla vadītāju skaits								212		260			199		165		
T.sk. smagi ievainoti								22		47			51		35		
Bojā gājušo transportlīdzekļu vadītāju skaits								144		100			78		58		
Ievainoto transportlīdzekļu vadītāju skaits								1816		1659			1141		1133		
T.sk. smagi ievainoti								195		227			174		156		
Bojā gājušo pasažieru skaits								85		82			57		48		
Ievainoto pasažieru skaits								2247		1924			1345		1345		
T.sk. smagi ievainoti								258		261			212		171		
Bojā gājušo bērnu skaits								11		14			8		9		
Ievainoto bērnu skaits								548		488			357		394		
T.sk. smagi ievainoti								30		48			42		45		
"""

date_string = """
2007. g.		2008. g.			2009. g.		2010. g.	
"""
dates_unprocessed = date_string.split()
dates = []
for date in dates_unprocessed:
    possible_date = extract_number(date)
    if possible_date is not None:
        dates.append(possible_date)


lines = input_string.splitlines()

for line in lines:
    description = ""
    words = line.split()
    date_cursor = 0
    data = []
    for word in words:
        if word.isdigit():
            data.append(word)
        else:
            description += word
            description += " "
    # insert_description()



# Save (commit) the changes
conn.commit()

c.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = c.fetchall()

# Loop through all tables and print out their contents
for table in tables:
    print(f"Table: {table[0]}")
    c.execute(f"SELECT * FROM {table[0]};")
    rows = c.fetchall()
    for row in rows:
        print(row)




# Close the connection
conn.close()
