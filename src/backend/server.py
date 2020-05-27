from flask import Flask, request
from datetime import datetime
import mysql.connector as mysql
from flask_cors import CORS
import json

db = mysql.connect(
	host = "localhost",
	user = "root",
	passwd = "dbpwd",
	database = "world")

print(db)

app = Flask(__name__)
CORS(app)


@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
	if request.method == 'GET':
		return get_all_posts()
	else:
		return add_post()

def add_post():
	data = request.get_json()
	print(data)
	user = get_id(data["user"])
	now = datetime.now()
	query = "insert into posts (user, title, content, last_update, published) values (%s ,%s, %s, %s, %s)"
	values = (user, data["title"], data["content"], now, now)

	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return get_post(new_post_id)

def get_id(user_name):
	query = "select id from users where user_name= %s"
	values = (user_name, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	# header = ['id']
	# print("------------>record: ",record)
	return record[0]

def get_post(id):
	query = "select id, user, title, content, published, last_update from posts where id = %s"
	values = (id, )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	header = ['id', 'user', 'title', 'content', 'published', 'last_update']
	return json.dumps(dict(zip(header, record)), default=str)

def get_all_posts():
	query = "select users.user_name, users.authorization, users.img_src, posts.id, title, content, last_update from posts join users on posts.user = users.id order by last_update desc"
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

if __name__ == "__main__":
	app.run()