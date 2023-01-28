""" Test Module used to hold the unit tests that will verify the methods related to the database"""
import os
from Code.databse_actions import DatabaseDeletion
CURRENT_PATH = os.path.dirname(os.path.abspath(__file__))
TEST_DATABASE_PATH = CURRENT_PATH + r'\Database\coffee-rating-app-database.db'

class TestDatabaseDeletion():
    """Test class to veirfy the application database is deleted correctly"""
    databasedeletion = DatabaseDeletion()#
    def setup_method(self):
        """ Setup Method to be run at the start of each test"""
        pass

    def teardown_method(self):
        """ Teaardown Method to be run at the end of each test"""
        pass
    def test_create_database_file(self):
        """ Method to verify if the application database has been deleted"""
        pass
