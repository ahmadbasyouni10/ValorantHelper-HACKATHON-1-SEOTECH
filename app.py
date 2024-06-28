from flask import Flask, jsonify, request
from chatbot_api import get_openai_response
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return 'Welcome to Valorant Helper API'

@app.route('/seasons')
def get_seasons():
    conn = sqlite3.connect('data/valorant_bot.db')
    c = conn.cursor()
    c.execute('SELECT * FROM seasons')
    seasons = c.fetchall()
    conn.close()
    return jsonify(seasons)

@app.route('/agents')
def get_agents():
    conn = sqlite3.connect('data/valorant_bot.db')
    c = conn.cursor()
    c.execute('SELECT * FROM agents')
    agents = c.fetchall()
    conn.close()
    return jsonify(agents)

@app.route('/competitive_tiers')
def get_competitive_tiers():
    conn = sqlite3.connect('data/valorant_bot.db')
    c = conn.cursor()
    c.execute('SELECT * FROM competitive_tiers')
    tiers = c.fetchall()
    conn.close()
    return jsonify(tiers)

@app.route('/maps')
def get_maps():
    conn = sqlite3.connect('data/valorant_bot.db')
    c = conn.cursor()
    c.execute('SELECT * FROM maps')
    maps = c.fetchall()
    conn.close()
    return jsonify(maps)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json['message']
    response = get_openai_response(user_message)
    return jsonify({'response': response})

# Add more routes for maps, weapon wraps, seasons, etc.
if __name__ == '__main__':
    app.run(debug=True)  # Run Flask in debug mode for development