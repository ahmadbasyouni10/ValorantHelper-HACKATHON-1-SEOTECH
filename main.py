from scripts import create_tables, populate_tables

def main():
    create_tables.create_tables()
    populate_tables.main()

if __name__ == '__main__':
    main()