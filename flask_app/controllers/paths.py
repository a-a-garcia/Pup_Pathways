from flask_app import app
from flask import render_template, redirect, request, session, jsonify
from flask_app.models import user, path #import entire file, rather than class, to avoid circular imports. may need to import more than one file if you have multiple tables.

@app.route('/process_path', methods=["POST"])
def process_path():
        path.Path.create_path(request.form)
        return redirect('/dashboard')