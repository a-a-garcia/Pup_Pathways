from flask import app

class Path:
    def __init__(self, data) -> None:
        self.id = data['id']
        self.coordinates = data['coordinates']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']