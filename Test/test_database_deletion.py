""" Test Module used to hold the unit tests that will verify the methods related to the database"""
import os
import sqlite3
import shutil
from Code.databse_actions import DatabaseDeletion
CURRENT_PATH = os.path.dirname(os.path.abspath(__file__))
TEST_DATABASE_PATH = CURRENT_PATH + r'\Database\coffee-rating-app-database.db'

class TestDatabaseDeletion():
    """Test class to veirfy the application database is deleted correctly"""
    databasedeletion = DatabaseDeletion()#
    def setup_method(self):
        """ Setup Method to be run at the start of each test"""
        if not os.path.exists(CURRENT_PATH + r'\Database'):
            os.makedirs(CURRENT_PATH + r'\Database')
            connection = sqlite3.connect(CURRENT_PATH + r'\Database\coffee-rating-app-database.db')
            cursor = connection.cursor()
            cursor.execute("""CREATE TABLE IF NOT EXISTS Rating_Table(
            Date text,
            Coffee_Shop_Name text,
            Coffee_Beverage text,
            Rating real)""")
            connection.commit()
            test_inputs = [("05/09/2022", "Bristol Coffe Shop","Americano Black", 4.5),
                           ("01/05/2008", "Southampton Coffe Shop","Cappuccino", 2.0),
                            ("29/04/1957", "London Coffe Shop","Flat White", 0.5)]
            cursor.executemany("INSERT INTO Rating_Table VALUES (?,?,?,?)", test_inputs)
            connection.commit()
            connection.close()

    def teardown_method(self):
        """ Teaardown Method to be run at the end of each test"""
        if os.path.exists(CURRENT_PATH + r'\Database'):
            shutil.rmtree(CURRENT_PATH + r'\Database')
    def test_delete_database_file(self):
        """ Method to verify if the application database has been deleted"""
        self.databasedeletion.delete_database(CURRENT_PATH)
        assert not os.path.exists(CURRENT_PATH + r'\Database')
    def test_delete_entry(self):
        """ Method to verify if a specified record in the application database has been deleted"""
        pass