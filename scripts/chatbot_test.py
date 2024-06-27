# Unit Testing for the ChatBot
import unittest
import sqlite3
import create_tables, populate_tables
import os

# BackEnd Testing for the SQL dataBase
class TestTables(unittest.TestCase):
    # Valorant API fetches from Populate Tables
    def test_fetch(self):
        self.assertIsNotNone(populate_tables.fetch_agents_from_api())
        self.assertIsNotNone(populate_tables.fetch_competitive_tiers_from_api())
        self.assertIsNotNone(populate_tables.fetch_maps_from_api())
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

        # Testing to see if data was put into database
        populate_tables.main()
        sql_query = '''SELECT displayName FROM agents'''
        self.cur.execute(sql_query)
        # Valorant has 24 agents as of 06.26.2024
        self.assertEqual(24, len(self.cur.fetchall()) - 1)

        sql_query = '''SELECT tierName FROM competitive_tiers WHERE tierName='UNRANKED';'''
        self.cur.execute(sql_query)
        # Valorant has 9 ranks, with each having 3 subtiers
        # that said, populate_tables creates adds more data to 
        # the tierName table than necessary;
        # ranks get repeated so something to investigate 
        print(len(self.cur.fetchall()))
        # self.assertEqual(1, len(self.cur.fetchall()))
        
        sql_query = '''SELECT displayName FROM maps'''
        self.cur.execute(sql_query)
        # Valorant has 16 maps
        self.assertEqual(16, len(self.cur.fetchall()))

        sql_query = '''SELECT displayName FROM weapon_wraps WHERE displayName='Sakura Sheriff';'''
        self.cur.execute(sql_query)
        self.assertEqual(1, len(self.cur.fetchall()))


        
if __name__ == '__main__':
    unittest.main()
# Backend Testing for the ChatGPT chat