""" Test Module used to hold the unit tests that will verify the methods related to the database"""
import os
import shutil
import sqlite3
from Code.databse_actions import DatabaseCreation
CURRENT_PATH = os.path.dirname(os.path.abspath(__file__))
TEST_DATABASE_PATH = CURRENT_PATH + r'\Database\coffee-rating-app-database.db'

class TestDatabaseCreation():
    """Test class to veirfy the application database is created correctly"""
    databasecreation = DatabaseCreation()
    def setup_method(self):
        """ Setup Method to be run at the start of each test"""
        pass

    def teardown_method(self):
        """ Teaardown Method to be run at the end of each test"""
        pass

    def test_create_database_file(self):
        """ Method to verify if the application database has been created"""
        if os.path.exists(CURRENT_PATH + r'\Database'):
            shutil.rmtree(CURRENT_PATH + r'\Database')
        self.databasecreation.create_database(CURRENT_PATH)
        assert os.path.exists(TEST_DATABASE_PATH)
    def test_create_table(self):
        """ Method to verify a table is created in the database with the correct title and column headings
        Title: Rating Table
        Column 1: Date (Text)
        Column 2: Coffee Shop Name (Text)
        Column 3: Coffee Beverage (Text)
        Column 4: Rating (Real)
        """
        self.databasecreation.create_table(TEST_DATABASE_PATH)
        connection = sqlite3.connect(TEST_DATABASE_PATH)
        cursor = connection.cursor()

        assert len(cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Rating Table'").fetchall()) == 1

        column_data = cursor.execute("PRAGMA table_info(Rating Table)").fetchall()

        assert column_data[0][1] == "Date"
        assert column_data[0][2] == "Text"
        assert column_data[1][1] == "Coffee Shop Name"
        assert column_data[1][2] == "Text"
        assert column_data[2][1] == "Coffee Beverage"
        assert column_data[2][2] == "Text"
        assert column_data[3][1] == "Rating"
        assert column_data[3][2] == "Real"

        connection.close()
