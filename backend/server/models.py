from . import db
from dataclasses import dataclass

@dataclass
class Task(db.Model):
    taskId: int
    title: str
    description: str
    status: str
    timestamp: str

    taskId = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    status = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.String, nullable=False)