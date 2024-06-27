from scripts import create_tables, populate_tables, deploy_chatgpt

def main():
    create_tables.create_tables()
    populate_tables.main()
    deploy_chatgpt.main()

if __name__ == '__main__':
    main()