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
        if os.path.exists(CURRENT_PATH + r'\Database'):
            shutil.rmtree(CURRENT_PATH + r'\Database')

    def teardown_method(self):
        """ Teaardown Method to be run at the end of each test"""
        if os.path.exists(CURRENT_PATH + r'\Database'):
            shutil.rmtree(CURRENT_PATH + r'\Database')

    def test_create_database_file(self):
        """ Method to verify if the application database has been created"""
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
        os.makedirs(CURRENT_PATH + r'\Database')
        connection = sqlite3.connect(CURRENT_PATH + r'\Database\coffee-rating-app-database.db')
        cursor = connection.cursor()
        self.databasecreation.create_table(TEST_DATABASE_PATH)

        assert len(cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Rating_Table'").fetchall()) == 1

        column_data = cursor.execute("PRAGMA table_info(Rating_Table)").fetchall()

        assert column_data[0][1] == "Date"
        assert column_data[0][2] == "TEXT"
        assert column_data[1][1] == "Coffee_Shop_Name"
        assert column_data[1][2] == "TEXT"
        assert column_data[2][1] == "Coffee_Beverage"
        assert column_data[2][2] == "TEXT"
        assert column_data[3][1] == "Rating"
        assert column_data[3][2] == "REAL"

        connection.close()
    def test_add_record(self):
        """Method to verify that a record has been correctly added to the database"""

        os.makedirs(CURRENT_PATH + r'\Database')
        connection = sqlite3.connect(CURRENT_PATH + r'\Database\coffee-rating-app-database.db')
        cursor = connection.cursor()
        cursor.execute("""CREATE TABLE IF NOT EXISTS Rating_Table(
        Date text,
        Coffee_Shop_Name text,
        Coffee_Beverage text,
        Rating real)""")
        connection.commit()
        connection.close()
        self.databasecreation.add_record(TEST_DATABASE_PATH, "05/09/2022", "Bristol Coffee Shop", "Americano Black", 4.5)
        connection = sqlite3.connect(CURRENT_PATH + r'\Database\coffee-rating-app-database.db')
        cursor = connection.cursor()
        test_record = cursor.execute('''SELECT * FROM Rating_Table WHERE Date = '05/09/2022' AND Coffee_Shop_Name = 'Bristol Coffee Shop'
                                     AND Coffee_Beverage = 'Americano Black' AND Rating = 4.5''').fetchall()
        connection.close()
        assert len(test_record) == 1
