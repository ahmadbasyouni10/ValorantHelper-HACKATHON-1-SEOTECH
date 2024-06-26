# Unit Testing for the ChatBot
import unittest
import sqlite3
import create_tables, populate_tables
import os

# BackEnd Testing for the SQL dataBase
class TestTables(unittest.TestCase):
    # API fetches from Populate Tables
    def test_fetch_agents(self):
        self.assertIsNotNone(populate_tables.fetch_agents_from_api())

    def test_fetch_tiers(self):
        self.assertIsNotNone(populate_tables.fetch_competitive_tiers_from_api())

    def test_fetch_maps(self):
        self.assertIsNotNone(populate_tables.fetch_maps_from_api())

    def test_fetch_(self):
        self.assertIsNotNone(populate_tables.fetch_weapon_wraps_from_api())
    
    # Table Population from Populate Tables and Create Tables
    def test_create_tables(self):
        # Testing to see if 4 tables were created in the database
        create_tables.create_tables()
        self.conn = sqlite3.connect('valorant_bot.db')
        self.cur = self.conn.cursor()
        sql_query = '''SELECT name FROM sqlite_master WHERE type='table';'''
        self.cur.execute(sql_query)
        # create_tables creates 4 tables: agents, tiers, maps, and weapons
        self.assertEquals(4, len(self.cur.fetchall()))
        print(self.cur.fetchall())

        # Testing to see if data was put into database
        

    # ChatGPT 
    # def test_Create_Tables():
    # def setUp(self):
    #     self.conn = create_tables() 
    
    # def test_setup(self):

        
if __name__ == '__main__':
    unittest.main()
# Backend Testing for the ChatGPT chat