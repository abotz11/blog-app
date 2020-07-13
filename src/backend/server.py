from flask import Flask, request, abort, make_response
from datetime import datetime
import mysql.connector as mysql
import json
import uuid
import bcrypt

db = mysql.connect(
	host = "localhost",
	user = "root",
	passwd = "dbpwd",
	database = "world")

print(db)

app = Flask(__name__)

@app.route('/posts', methods=['GET', 'POST', 'PUT'])
def manage_posts():
	if request.method == 'GET':
		return get_all_posts()
	elif request.method == 'PUT':
		return edit_post()
	else:
		return add_post()

@app.route('/comments', methods=['GET', 'POST'])
def manage_comments():
	if request.method == 'GET':
		return get_all_comments()
	else:
		return add_comment()

@app.route('/deletePost', methods=['POST'])
def delete_post():
	data = request.get_json()
	print(data)
	if not data["postId"]:
		abort(401)
	
	query = "delete from comments where post = %s"
	values = (data["postId"], )
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()

	query = "delete from posts where id = %s"
	values = (data["postId"], )
	cursor.execute(query, values)
	db.commit()
	cursor.close()
	return get_all_posts()

def add_post():
	data = request.get_json()
	print(data)
	if not data["user"]:
		abort(401)
		
	user = get_id(data["user"])
	now = datetime.now()
	query = "insert into posts (user_id, title, content, last_update, published) values (%s ,%s, %s, %s, %s)"
	values = (user, data["title"], data["content"], now, now)

	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return get_post(new_post_id)

def edit_post():
	data = request.get_json()
	print(data)
	if not data["user"]:
		abort(401)
	now = datetime.now()

	query = "update posts set title=%s, content=%s, last_update=%s where id=%s"
	values = (data["title"], data["content"], now, data["id"])

	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	cursor.close()
	return get_post(data["id"])

def get_id(user_name):
	query = "select id from users where user_name= %s"
	values = (user_name, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	return record[0]

def get_post(id):
	query = "select id, user_id, title, content, published, last_update from posts where id = %s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	header = ['id', 'user_id', 'title', 'content', 'published', 'last_update']
	return json.dumps(dict(zip(header, record)), default=str)

def get_all_posts():
	user = check_login()
	query = "select users.user_name, users.authorization, users.img_src, posts.id, title, content, last_update from posts join users on posts.user_id = users.id order by last_update desc"
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	cursor.close()
	print(records)
	header = ['user_name', 'authorization','img_src', 'id', 'title', 'content', 'last_update']
	data = []
	
	for r in records:
		data.append(dict(zip(header, r)))
	
	return json.dumps(data, default=str)

def add_comment():
	data = request.get_json()
	print(data)
	if not data["user"]:
		abort(401)
		
	user = get_id(data["user"])
	now = datetime.now()

	query = "insert into comments (user, post, content, last_update, published) values (%s ,%s, %s, %s, %s)"
	values = (user, data["post"], data["content"], now, now)

	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_comment_id = cursor.lastrowid
	cursor.close()
	return get_comment(new_comment_id)

def get_comment(id):
	query = "select id, user, post, content, published, last_update from comments where id = %s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	header = ['id', 'user', 'post', 'content', 'published', 'last_update']
	return json.dumps(dict(zip(header, record)), default=str)


def get_all_comments():
	user = check_login()
	query = "select users.user_name, comments.post, comments.id, comments.content, comments.last_update from comments join posts on comments.post = posts.id join users on comments.user = users.id order by last_update"
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	cursor.close()
	print(records)
	header = ['user_name','post', 'id', 'content', 'last_update']
	data = []
	
	for r in records:
		data.append(dict(zip(header, r)))
	
	return json.dumps(data, default=str)

@app.route('/deleteComment', methods=['POST'])
def delete_comment():
	data = request.get_json()
	print(data)
	if not data["postId"]:
		abort(401)
	query = "delete from comments where id = %s"
	values = (data["postId"], )
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	cursor.close()
	return get_all_comments()

@app.route('/login', methods=['GET','POST'])
def manage_login():
	if request.method == 'GET':
		return check_login()
	else:
		return login()

def login():
	data = request.get_json()
	print(data)
	query = "select id, password from users where user_name = %s"
	values = (data['user'], )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	if not record:
		abort(401)
	user_id = record[0]
	hashed_pwd = record[1].encode('utf-8')

	if bcrypt.hashpw(data['pass'].encode('utf-8'), hashed_pwd) != hashed_pwd:
		abort(401)


	session_id = str(uuid.uuid4())
	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
	values = (user_id, session_id, session_id)
	cursor.execute(query, values)
	db.commit()
	resp = make_response()
	resp.set_cookie("session_id", session_id)
	return resp

def check_login():	
	session_id = request.cookies.get('session_id')
	print("session_id: ", session_id)
	if not session_id:
		abort(401)
	query = "select user_id from sessions where session_id = %s"
	values = (session_id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	cursor.close()

	if not record:
		abort(401)
	
	return get_user(record[0])

def get_user(user_id):
	query = "select full_name, user_name from users where id= %s"
	values = (user_id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	cursor.close()
	print(record)
	header = ['full_name', 'user_name']
	return json.dumps(dict(zip(header, record)), default=str)

@app.route('/signin', methods=['POST'])
def signin():
	data = request.get_json()
	print(data)
	query = "insert into users (full_name, user_name, password) values (%s, %s, %s)"

	hashed_pwd = bcrypt.hashpw(data['pass'].encode('utf-8'), bcrypt.gensalt())
	values = (data['name'], data['user'], hashed_pwd)
	
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	user_id = cursor.lastrowid

	session_id = str(uuid.uuid4())
	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
	values = (user_id, session_id, session_id)
	cursor.execute(query, values)
	db.commit()
	resp = make_response()
	resp.set_cookie("session_id", session_id)
	return resp

@app.route('/logout', methods=['POST'])
def logout():
	data = request.get_json()
	print(data)
	query = "delete from sessions where user_id = %s"
	values = (get_id(data['user']),)
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()

	resp = make_response()
	resp.set_cookie("session_id", '', expires=0)
	return resp

if __name__ == "__main__":
	app.run()