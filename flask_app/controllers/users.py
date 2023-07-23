from flask_app import app
from flask import render_template, redirect, request, session
from flask_app.models import user #import entire file, rather than class, to avoid circular imports. may need to import more than one file if you have multiple tables.

# Create Users Controller
@app.route('/register')
def show_registration():
    return render_template('register.html')

@app.route('/register/submit', methods=['POST'])
def submit_registration():
    if not user.User.validate_user(request.form):
        return redirect('/register')
    user.User.create_user(request.form)
    return redirect('/account_creation/success')

@app.route('/account_creation/success')
def account_creation_success():
    return render_template("account_creation_success.html")

# Read Users Controller

@app.route('/')
def index():
    return render_template('login.html')

# Update Users Controller



# Delete Users Controller


# Notes:
# 1 - Use meaningful names
# 2 - Do not overwrite function names
# 3 - No matchy, no worky
# 4 - Use consistent naming conventions 
# 5 - Keep it clean
# 6 - Test every little line before progressing
# 7 - READ ERROR MESSAGES!!!!!!
# 8 - Error messages are found in the browser and terminal




# How to use path variables:
# @app.route('/<int:id>')
# def index(id):
#     user_info = user.User.get_user_by_id(id)
#     return render_template('index.html', user_info)

# Converter -	Description
# string -	Accepts any text without a slash (the default).
# int -	Accepts integers.
# float -	Like int but for floating point values.
# path 	-Like string but accepts slashes.