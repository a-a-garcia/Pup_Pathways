from flask_app import app
import os
from flask import render_template, redirect, request, session, jsonify, json
from flask_app.models import path, user #import entire file, rather than class, to avoid circular imports. may need to import more than one file if you have multiple tables.

@app.route('/process_path', methods=["POST"])
def process_path():
        path.Path.create_path(request.form)
        return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect('/access_denied')
    print("user_id in session: " + str(session['user_id']))

    api_key = os.getenv("API_KEY")

    #fetch paths from db
    all_paths = path.Path.show_all_paths()
    #create a list to store formatted path data
    all_paths_data = []
    #format the data to match expected javascript format (json)
    for path_entry in all_paths:
        coordinates = json.loads(path_entry['coordinates'])
    #create an object with the necessary format
        formatted_path = {
                'user_id': path_entry['User_id'],
                'created_at': path_entry['created_at'],
                'coordinates' : coordinates
        }
    #append formatted path onto all_paths_data
        all_paths_data.append(formatted_path)
        
    print(all_paths_data)
    return render_template('dashboard.html', api_key=api_key, all_paths_data=all_paths_data)