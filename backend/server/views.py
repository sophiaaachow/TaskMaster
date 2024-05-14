from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from datetime import datetime
from sqlalchemy import desc

from . import db
from .models import Task

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return "Server running."

@views.route('/create_task', methods=['POST'])
@cross_origin()
def create_task():
    data = request.json
    now = datetime.now()
    try:
        task = Task(
            title = data['title'],
            description = data['description'],
            status = 'Incomplete',
            timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"

@views.route('/get_all_tasks')
@cross_origin()
def get_all_tasks():
    try:
        res = Task.query.all()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"

@views.route('/get_task/<id>')
@cross_origin()
def get_task(id):
    try:
        res = Task.query.filter(Task.taskId == id).first()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@views.route('/delete_task/<id>')
@cross_origin()
def delete_task(id):
    try:
        res = Task.query.filter(Task.taskId == id).delete()
        db.session.commit()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@views.route('/update_status/<id>')
@cross_origin()
def update_status(id):
    now = datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    try:
        task = Task.query.filter(Task.taskId == id).first()
        status = ""
        if task is not None:
            status = task.status
        if status == 'Incomplete':
            updated_status = 'Complete'
        else:
            updated_status = 'Incomplete'
        res = Task.query.filter(Task.taskId == id).update({'status': updated_status, 'timestamp': timestamp})
        db.session.commit()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@views.route('/update_task', methods=["POST"])
@cross_origin()
def update_task():
    now = datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    data = request.json
    try:
        res = Task.query.filter(Task.taskId == data['id']).update({'title': data['title'], 'description': data['description'], 'timestamp': timestamp})
        db.session.commit()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@views.route('/get_tasks_by_time/<time>')
@cross_origin()
def get_tasks_by_time(time):
    try:
        if time == 'Latest':
            res = Task.query.order_by(desc(Task.timestamp)).all()
        else:
            res = Task.query.order_by(Task.timestamp).all()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@views.route('/get_tasks_by_status/<status>')
@cross_origin()
def get_incomplete_tasks(status):
    try:
        res = Task.query.filter(Task.status == status).all()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"