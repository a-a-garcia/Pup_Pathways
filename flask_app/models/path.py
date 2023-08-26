from flask import app
from flask_app.config.mysqlconnection import connectToMySQL

class Path:
    db = "pup_pathways_test_db"
    def __init__(self, data) -> None:
        self.id = data['id']
        self.coordinates = data['coordinates']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']

    @classmethod
    def create_path(cls, form_data):
        query="""
            INSERT INTO path (user_id, coordinates)
            VALUES (%(user_id)s, %(coordinates)s)
        """
        new_path_id = connectToMySQL(cls.db).query_db(query, form_data)
        print(new_path_id)
        return new_path_id
