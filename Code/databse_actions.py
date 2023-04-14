"""Module contains classes and methods to manipulate the application database"""
import sqlite3
import os
import shutil
import logging
CURRENT_PATH = os.path.dirname(os.path.abspath(__file__))

logging.basicConfig(filename = CURRENT_PATH + r'\coffee-rating-app.log',
                    format='%(levelname)s:%(asctime)s:%(message)s',
                    level=logging.INFO, force=True, datefmt='%m/%d/%Y %H:%M:%S')

class DatabaseCreation():
    """DatabaseCreation class contains methods to create the database for the application"""
    def create_database(self, database_path):
        """Method to create the database if one does not exist"""
        try:
            if not os.path.exists(database_path + r'\Database'):
                os.makedirs(database_path + r'\Database')
                connection = sqlite3.connect(database_path + r'\Database\coffee-rating-app-database.db')
                connection.close()
                logging.info('Database created successfully at %s', database_path + r'\Database\coffee-rating-app-database.db')
            else:
                logging.info('Database already exists at %s', database_path + r'\Database\coffee-rating-app-database.db')
        except Exception as exception:
            logging.exception('%s', exception)

    def create_table(self, database_path):
        """Mthod to create a table within the database with the following attributes"""
        try:
            connection = sqlite3.connect(database_path)
            cursor = connection.cursor()

            cursor.execute("""CREATE TABLE IF NOT EXISTS Rating_Table(
            Date text,
            Coffee_Shop_Name text,
            Coffee_Beverage text,
            Rating real)""")
            connection.commit()
            connection.close()
            logging.info('Rating_Table table created successfully')
        except Exception as exception:
            logging.exception('%s', exception)

    def add_record(self, database_path, date, coffee_shop_name, coffee_beverage, rating):
        """Method to input a record into the database"""
        try:
            connection = sqlite3.connect(database_path)
            cursor = connection.cursor()
            cursor.execute("INSERT INTO Rating_Table VALUES (?,?,?,?)",(date,coffee_shop_name,coffee_beverage,rating))
            connection.commit()
            connection.close()
            logging.info('Entry %s, %s, %s, %s added to Rating_Table',date, coffee_shop_name,coffee_beverage, rating )
        except Exception as exception:
            logging.exception('%s', exception)

class DatabaseDeletion():
    """DatabaseDeletion class contains methods to delete the application database"""
    def delete_database(self,database_path):
        """Method to delete the application database"""
        if os.path.exists(database_path + r'\Database'):
            shutil.rmtree(database_path + r'\Database')
    def delete_record(self, database_path, database_record):
        """Method to delete a specified entry within the application"""
        connection = sqlite3.connect(database_path + r'\coffee-rating-app-database.db')
        cursor = connection.cursor()
        cursor.execute("DELETE from Rating_Table WHERE rowid = (?)", str(database_record))
        connection.commit()
        connection.close()
