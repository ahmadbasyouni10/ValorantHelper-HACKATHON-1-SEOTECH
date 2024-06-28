import unittest
import sqlite3
import os
from unittest.mock import patch
from scripts import create_tables, populate_tables
from main import get_openai_response
from flask import Flask, jsonify, json
import requests

class TestMain(unittest.TestCase):
    # Test create_tables.py
    def test_create_tables(self):
        conn = sqlite3.connect(':memory:')  # in-memory database for testing
        create_tables.create_tables(conn)
        conn.close()

    # Test populate_tables.py with mock API responses
    @patch('requests.get')
    def test_populate_tables(self, mock_get):
        mock_get.side_effect = [
            # Mock response for fetch_agents_from_api
            unittest.mock.Mock(status_code=200, json=lambda: {'data': [{'uuid': '1', 'displayName': 'Agent 1', 'description': 'Agent description', 'displayIcon': 'icon.jpg', 'role': {'uuid': 'role1'}, 'isPlayableCharacter': True, 'isBaseContent': True, 'abilities': []}]})
        ]

        conn = sqlite3.connect(':memory:')  # in-memory database for testing
        c = conn.cursor()

        populate_tables.populate_agents(conn, c)

        conn.close()

    # Test API response in chatbot_api.py
    @patch('main.OpenAI')
    def test_get_openai_response(self, MockOpenAI):
        mock_instance = MockOpenAI.return_value
        mock_instance.completions.create.return_value = unittest.mock.Mock(choices=[{'text': 'Response from OpenAI'}])
        
        response = get_openai_response('Hello')
        self.assertEqual(response, 'Response from OpenAI')

    # Test Flask routes in app.py 
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

    def test_index_route(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), 'Welcome to Valorant Helper API')

    def test_seasons_route(self):
        with patch('app.sqlite3') as mock_sqlite:
            mock_cursor = mock_sqlite.connect.return_value.cursor.return_value
            mock_cursor.fetchall.return_value = [('uuid1', 'Season 1', 'type1', '2024-01-01', '2024-12-31', None, 'path/to/asset')]

            response = self.client.get('/seasons')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(data, [('uuid1', 'Season 1', 'type1', '2024-01-01', '2024-12-31', None, 'path/to/asset')])

if __name__ == '__main__':
    unittest.main()