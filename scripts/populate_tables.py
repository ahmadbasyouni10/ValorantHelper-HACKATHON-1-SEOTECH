import sqlite3
import requests
import json

# Function to fetch data from Valorant API
def fetch_agents_from_api():
    url = 'https://valorant-api.com/v1/agents'
    headers = {
        "Accept": "application/json",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()['data']
    else:
        print('Failed to fetch agents data from API')
        return None

# Function to insert agents data into agents table
def populate_agents(conn, cursor):
    cursor.execute('DELETE FROM agents')  # Clear existing data
    conn.commit()

    agents_data = fetch_agents_from_api()
    if agents_data:
        for agent in agents_data:
            if agent is not None:
                try:
                    # SQL injection safe query using ? placeholder
                    cursor.execute('''
                        INSERT INTO agents (uuid, displayName, description, developerName, displayIcon, role_uuid, isPlayableCharacter, isBaseContent, abilities)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        agent['uuid'],
                        agent['displayName'],
                        agent['description'],
                        agent.get('developerName', ''),
                        agent['displayIcon'],
                        agent.get('role', {}).get('uuid') if agent.get('role') is not None else None,  # Adjusted line
                        agent.get('isPlayableCharacter', False),
                        agent.get('isBaseContent', False),
                        json.dumps(agent.get('abilities', []))  # Convert abilities to JSON
                    ))
                except sqlite3.Error as e:
                    print('Error inserting agent data:', e)
        conn.commit()
        print('Agents data populated successfully')
    else:
        print('Failed to fetch agents data from API')

def fetch_competitive_tiers_from_api():
    url = 'https://valorant-api.com/v1/competitivetiers'
    headers = {
        "Accept": "application/json",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()['data']
    else:
        print('Failed to fetch competitive tiers data from API')
        return None

def populate_competitive_tiers(conn, cursor):
    cursor.execute('DELETE FROM competitive_tiers')  # Clear existing data
    conn.commit()

    competitive_tiers_data = fetch_competitive_tiers_from_api()
    if competitive_tiers_data:
        for tier_data in competitive_tiers_data:
            if tier_data is not None:
                for tier in tier_data['tiers']:
                    try:
                        # Combine UUID and tier to ensure uniqueness
                        unique_id = f"{tier_data['uuid']}-{tier['tier']}"

                        cursor.execute('''
                            INSERT INTO competitive_tiers (uuid, tier, tierName, division, divisionName, color, backgroundColor)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        ''', (
                            unique_id,
                            tier['tier'],
                            tier['tierName'],
                            tier['division'],
                            tier['divisionName'],
                            tier['color'],
                            tier['backgroundColor']
                        ))
                    except sqlite3.Error as e:
                        print('Error inserting competitive tier data:', e)
        conn.commit()
        print('Competitive tiers data populated successfully')
    else:
        print('Failed to fetch competitive tiers data from API')

def fetch_maps_from_api():
    url = 'https://valorant-api.com/v1/maps'
    headers = {
        "Accept": "application/json",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()['data']
    else:
        print('Failed to fetch maps data from API')
        return None


def populate_maps(conn, cursor):
    # Clear existing data 
    cursor.execute('DELETE FROM maps')  
    conn.commit()

    maps_data = fetch_maps_from_api()
    if maps_data:
        for map_item in maps_data:
            if map_item is not None:
                try:
                    callouts = map_item.get('callouts')
                    callouts_json = json.dumps([callout['regionName'] for callout in callouts] if callouts else [])
                    # SQL injection safe query using ? placeholder
                    cursor.execute('''
                        INSERT INTO maps (uuid, displayName, displayIcon, splash, coordinates, callouts)
                        VALUES (?, ?, ?, ?, ?, ?)
                    ''', (
                        map_item['uuid'],
                        map_item['displayName'],
                        map_item.get('displayIcon', ''),
                        map_item.get('splash', ''),
                        map_item.get('coordinates', ''),
                        callouts_json
                    ))
                except sqlite3.Error as e:
                    print('Error inserting map data:', e)
        conn.commit()
        print('Maps data populated successfully')
    else:
        print('Failed to fetch maps data from API')

def fetch_weapon_wraps_from_api():
    url = 'https://valorant-api.com/v1/weapons/skins'
    headers = {
        "Accept": "application/json",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()['data']
    else:
        print('Failed to fetch weapon wraps data from API')
        return None

def populate_weapon_wraps(conn, cursor):
    cursor.execute('DELETE FROM weapon_wraps')  # Clear existing data
    conn.commit()

    weapon_wraps_data = fetch_weapon_wraps_from_api()
    if weapon_wraps_data:
        for wrap in weapon_wraps_data:
            if wrap is not None:
                try:
                    cursor.execute('''
                        INSERT INTO weapon_wraps (uuid, displayName, themeUuid, contentTierUuid, displayIcon, wallpaper, assetPath)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        wrap['uuid'],
                        wrap['displayName'],
                        wrap['themeUuid'],
                        wrap['contentTierUuid'],
                        wrap['displayIcon'],
                        wrap['wallpaper'],
                        wrap['assetPath']
                    ))
                except sqlite3.Error as e:
                    print('Error inserting weapon wrap data:', e)
        conn.commit()
        print('Weapon wraps data populated successfully')
    else:
        print('Failed to fetch weapon wraps data from API')
    
def main():
    # Connect to SQLite database (or create it if it doesn't exist)
    conn = sqlite3.connect('data/valorant_bot.db')
    c = conn.cursor()
    fetch_agents_from_api()
    populate_agents(conn, c)
    fetch_competitive_tiers_from_api()
    populate_competitive_tiers(conn, c)
    fetch_maps_from_api()
    populate_maps(conn, c)
    fetch_weapon_wraps_from_api()
    populate_weapon_wraps(conn, c)
    conn.close()

if __name__ == "__main__":
    main()
