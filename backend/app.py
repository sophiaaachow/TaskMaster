from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, User, Task
from datetime import datetime
from sqlalchemy import desc
from uuid import uuid4

app = Flask(__name__)
DB_NAME = "taskmaster.db"
app.config["SQLALCHEMY_DATABASE_URI"] = f'sqlite:///{DB_NAME}'

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Server running."

@app.route('/get_tasks_by_user/<userId>')
def get_all_tasks(userId):
    try:
        res = Task.query.filter(Task.userId == userId).all()
        result = []
        for item in res:
            result.append(item.serialize())
        return jsonify(result)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/create_task', methods=['POST'])
def create_task():
    data = request.json
    now = datetime.now()
    try:
        task = Task(
            title = data['title'],
            description = data['description'],
            status = 'Incomplete',
            timestamp = now.strftime("%Y-%m-%d %H:%M:%S"),
            userId = data['userId']
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/delete_task/<taskId>')
def delete_task(taskId):
    try:
        Task.query.filter(Task.taskId == taskId).delete()
        db.session.commit()
        return "200"
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/update_status/<taskId>')
def update_status(taskId):
    try:
        task = Task.query.filter(Task.taskId == taskId).first()
        status = ""
        if task is not None:
            status = task.status
        if status == 'Incomplete':
            updated_status = 'Complete'
        else:
            updated_status = 'Incomplete'
        res = Task.query.filter(Task.taskId == taskId).update({'status': updated_status})
        db.session.commit()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/update_task', methods=["POST"])
def update_task():
    data = request.json
    try:
        res = Task.query.filter(Task.taskId == data['taskId']).update({'title': data['title'], 'description': data['description']})
        db.session.commit()
        return jsonify(res)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/get_tasks_by_time', methods=["POST"])
def get_tasks_by_time():
    data = request.json
    try:
        if data['time'] == 'Latest':
            res = Task.query.filter(Task.userId == data['userId']).order_by(desc(Task.timestamp)).all()
        else:
            res = Task.query.filter(Task.userId == data['userId']).order_by(Task.timestamp).all()
        result = []
        for item in res:
            result.append(item.serialize())
        return jsonify(result)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/get_tasks_by_status', methods=["POST"])
def get_tasks_by_status():
    try:
        data = request.json
        res = Task.query.filter((Task.status == data['status']) & (Task.userId == data['userId'])).all()
        result = []
        for item in res:
            result.append(item.serialize())
        return jsonify(result)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/register', methods=["POST"])
def register():
    data = request.json
    try:
        user = User(
            username = data['username'],
            password = bcrypt.generate_password_hash(data['password']),
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user)
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/check_username', methods=["POST"])
def check_username():
    data = request.json
    try:
        if User.query.filter(User.username == data['username']).first():
            return "Username already exists."
        return ""
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"
    
@app.route('/login', methods=["POST"])
def login():
    data = request.json
    try:
        user = User.query.filter(User.username == data['username']).first()
        if user:
            if bcrypt.check_password_hash(user.password, data['password']):
                return jsonify({"auth": uuid4().hex, "userId": user.userId})
        return "400"
    except (AttributeError, TypeError, KeyError, ValueError) as e:
        return f"Error: {e}"

if __name__ == '__main__':
    app.run(debug=True)