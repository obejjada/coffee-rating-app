"""Module contains classes and methods to manipulate the application database"""
import sqlite3
import os
class DatabaseCreation():
    """DatabaseCreation class contains methods to create the database for the application"""
    def create_database(self, database_path):
        """Method to create the database if one does not exist"""
        if not os.path.exists(database_path + r'\Database'):
            os.makedirs(database_path + r'\Database')
            connection = sqlite3.connect(database_path + r'\Database\coffee-rating-app-database.db')
            connection.close()
    def create_table(self, database_path):
        """Mthod to create a table within the database with the following attributes"""
        connection = sqlite3.connect(database_path)
        cursor = connection.cursor()#

        cursor.execute("""CREATE TABLE IF NOT EXISTS Rating_Table(
        Date text,
        Coffee_Shop_Name text,
        Coffee_Beverage text,
        Rating real)""")
        connection.commit()
        connection.close()
class DatabaseDeletion():
    """DatabaseDeletion class contains methods to delete the application database"""
    def delete_database(self):
        """Method to delete the application database"""
        pass