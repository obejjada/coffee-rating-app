""" Test Module used to hold the unit tests that will verify the methods related to the database"""
import os
from Code.databse_actions import DatabaseCreation

DATABASE_PATH = os.path.dirname(os.path.abspath(__file__)) + r'\Database\coffee-rating-app-database.db'

class TestDatabaseCreation():
    """Test class to veirfy the application database is created correctly"""
    def test_create_database_file(self):
        """ Method to verify if the application database has been created"""
        databasecreation =DatabaseCreation()
        databasecreation.create_database()
        assert os.path.exists(DATABASE_PATH)
