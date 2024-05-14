from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"

    userId = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    tasks = db.relationship('Task', backref='user')

    def serialize(self):
        return {"userId": self.userId,
                "username": self.username,
                "password": self.password,
                "tasks": self.tasks}

class Task(db.Model):
    __tablename__ = "tasks"

    taskId = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    status = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.userId))

    def serialize(self):
        return {"taskId": self.taskId,
                "title": self.title,
                "description": self.description,
                "status": self.status,
                "timestamp": self.timestamp,
                "userId": self.userId}