from flask_app import app
from flask import render_template, redirect, request, session, jsonify
from flask_app.models import user #import entire file, rather than class, to avoid circular imports. may need to import more than one file if you have multiple tables.

# Create Users Controller
@app.route('/register')
def show_registration():
    return render_template('register.html')

@app.route('/submit_registration', methods=['POST'])
def submit_registration():
    if request.method == 'POST':
        # For testing purposes, simply return a success message in JSON format
        return jsonify({"message": "REGISTRATION SUCCESS"})

# @app.route('/register/submit_user_info', methods=['POST'])
# def submit_registration():
#     if not user.User.validate_user(request.form):
#         return redirect('/register')
#     user.User.create_user(request.form)
#     return redirect('/account_creation/success')

#-WORK IN PROGRESS- STEP BY STEP REGISTRATION FORM
# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if request.method == 'POST':
#         # Step 1: Process the User form data
#         if 'step' not in session:
#             session['step'] = 1
#             session['user_data'] = {
#                 'username': request.form['username'],
#                 'email': request.form['email'],
#                 # Add other user-related fields
#             }
#             return redirect(url_for('register'))

#         # Step 2: Process the Dog form data
#         elif session['step'] == 1:
#             session['step'] = 2
#             session['dog_data'] = {
#                 'dog_name': request.form['dog_name'],
#                 'dog_breed': request.form['dog_breed'],
#                 # Add other dog-related fields
#             }
#             return redirect(url_for('register'))

#         # Step 3: Process the final step with password and save to the database
#         elif session['step'] == 2:
#             session.pop('step', None)  # Remove the step key from the session
#             # Combine user and dog data
#             user_data = session['user_data']
#             dog_data = session['dog_data']

#             # Additional processing for password (e.g., hashing)
#             user_data['password'] = request.form['password']

#             # Save user_data and dog_data to the database
#             # Implement the database storage logic here

#             # Redirect to a thank you or confirmation page
#             return redirect(url_for('confirmation'))

#     return render_template('register.html')

@app.route('/register/2')
def show_registration_2():
    return render_template('register_two.html')

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