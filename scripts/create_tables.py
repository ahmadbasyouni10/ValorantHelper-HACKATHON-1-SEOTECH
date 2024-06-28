import sqlite3
import os


def create_tables():
    conn = sqlite3.connect('data/valorant_bot.db')
    c = conn.cursor()

    # Create tables
    c.execute('''
        CREATE TABLE IF NOT EXISTS agents (
            uuid VARCHAR(36) PRIMARY KEY,
            displayName VARCHAR(255),
            description TEXT,
            developerName VARCHAR(255),
            displayIcon VARCHAR(255),
            role_uuid VARCHAR(36),
            isPlayableCharacter BOOLEAN,
            isBaseContent BOOLEAN,
            abilities TEXT
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS competitive_tiers (
            uuid VARCHAR(36) PRIMARY KEY,
            tier INTEGER,
            tierName VARCHAR(255),
            division VARCHAR(255),
            divisionName VARCHAR(255),
            color VARCHAR(7),
            backgroundColor VARCHAR(7)
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS maps (
            uuid TEXT PRIMARY KEY,
            displayName VARCHAR(255),
            displayIcon VARCHAR(255),
            splash VARCHAR(255),
            coordinates TEXT,
            callouts TEXT,
            sites TEXT
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS weapon_wraps (
            uuid TEXT PRIMARY KEY,
            displayName TEXT,
            themeUuid TEXT,
            contentTierUuid TEXT,
            displayIcon VARCHAR(255),
            wallpaper VARCHAR(255),
            assetPath VARCHAR(255)
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS seasons (
            uuid VARCHAR(36) PRIMARY KEY,
            displayName VARCHAR(255),
            type VARCHAR(50),
            startTime DATETIME,
            endTime DATETIME,
            parentUuid VARCHAR(36),
            assetPath VARCHAR(255)
        )
    ''')

    conn.commit()
    conn.close()
    print('Tables created successfully')


if __name__ == '__main__':
    create_tables()


''' 
Implement Later
CREATE TABLE IF NOT EXISTS weapons (
    uuid TEXT PRIMARY KEY,
    displayName TEXT NOT NULL,
    category TEXT,
    headDamage INTEGER,
    bodyDamage INTEGER,
    legDamage INTEGER,
    fireRate FLOAT,
    magazineSize INTEGER,
    wallPenetration TEXT
        )
'''
