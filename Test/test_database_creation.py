""" Test Module used to hold the unit tests that will verify the methods related to the database"""
import os
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
            os.rmdir(CURRENT_PATH + r'\Database')
        self.databasecreation.create_database(CURRENT_PATH)
        assert os.path.exists(TEST_DATABASE_PATH)
    def test_create_table(self):
        """ Method to verify a table is created in the database with the correct title and column headings"""
        pass
