![1](https://github.com/sophiaaachow/TaskMaster/assets/89060200/28e15599-2094-487e-970b-c43d141a38ca)
![](https://img.shields.io/badge/React-60DBFB?style=for-the-badge&logo=react&logoColor=black)![](https://img.shields.io/badge/bootstrap-7011EA?style=for-the-badge&logo=bootstrap&logoColor=white)![](https://img.shields.io/badge/Python3-FFCF40?style=for-the-badge&logo=python&logoColor=black)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![](https://img.shields.io/badge/Flask-black?style=for-the-badge&logo=flask&logoColor=white)![](https://img.shields.io/badge/sqlalchemy-1782CF?style=for-the-badge&logo=sqlite&logoColor=white)

### Table of Contents

- [Overview](#overview)
- [Run TaskMaster Locally](#run-taskmaster-locally)

## Overview

[Go To Top](#table-of-contents)

### Description

**TaskMaster** is a versatile and user-friendly to-do list application designed to help you efficiently manage your tasks and boost productivity. With TaskMaster, you'll have a powerful tool at your fingertips to streamline your workflow, stay organized, and achieve your goals efficiently. Whether you're managing personal errands or professional projects, TaskMaster is your ultimate task management companion.

**Key Features:**

-   **Intuitive Interface:** Enjoy a clean, easy-to-navigate interface that allows you to quickly add, edit, and delete tasks.
-   **Progress Tracking:** Monitor your progress with visual indicators and keep track of completed tasks.

### Repository Structure

```python
📦taskmaster
 ┣ 📂 frontend
 ┃ ┣ 📂 public
 ┃ ┃ ┗ 📜 index.html # index file
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 images # static assets
 ┃ ┃ ┣ 📂 components # reusable components
 ┃ ┃ ┣ 📂 pages # app pages
 ┃ ┃ ┣ 📂 services # api
 ┃ ┃ ┣ 📜 index.css # custom styles
 ┃ ┃ ┗ 📜 index.js # index script
 ┃ ┣ 📜 package.json # app dependencies   
 ┃ ┗ 📜 package-lock.json # app dependencies
 ┗ 📂 backend
   ┣ 📜 models.py # database models
   ┣ 📜 app.py # configurations and routes
   ┗ 📜 requirements.txt # server dependencies
```

## Run TaskMaster Locally

[Go To Top](#table-of-contents)

### Prerequisites

Ensure that you have installed the following:

1. [Python3](https://www.python.org/downloads/)
2. [Node.js](https://nodejs.org/en/download/)

Once Python is installed:

 1. Install [pip](https://pip.pypa.io/en/stable/installation/).

```python
 # Enter the following in cmd:
 py -m ensurepip --upgrade
 ```
 
 2. Install [virtualenv](https://pypi.org/project/virtualenv/).
 
 ```python
 # Enter the following in cmd:
 py -m pip install virtualenv
 ```

**Clone this repository** and change your current location in cmd to the repository's directory.

### Start the Server

Start the server in a virtual environment by entering the following in cmd:

```python
# Move into the backend folder
cd backend
```
```python
# Create a virtual environment
py -m virtualenv venv
```
```python
# Activate virtual environment
.\venv\Scripts\activate
```
```python
# Install server dependencies
py -m pip install -r requirements.txt
```
```python
# Start the server
py app.py
```

The server will be available at [localhost:5000](http://localhost:5000).

### Start the Application

Open a new cmd from the repository's directory and enter the following:

```python
# Move into the frontend folder
cd frontend
```
```python
# Install application dependencies
npm i
```
```python
# Start the application
npm start
```

TaskMaster will be automatically launched at [localhost:3000](http://localhost:3000).
