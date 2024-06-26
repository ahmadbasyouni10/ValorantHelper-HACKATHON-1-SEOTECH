# Unit Testing for the ChatBot
import unittest
import sqlite3
import create_tables, populate_tables

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
    
    # Table Population from Populate Tables
    
    # ChatGPT 
    # def test_Create_Tables():
    # def setUp(self):
    #     self.conn = create_tables() 
    
    # def test_setup(self):

        
if __name__ == '__main__':
    unittest.main()
# Backend Testing for the ChatGPT chat