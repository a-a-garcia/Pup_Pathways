
from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session, request
import re
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
# The above is used when we do login registration, be sure to install flask-bcrypt: pipenv install flask-bcrypt


class User:
    db = "pup_pathways_test_db" #which database are you using for this project
    def __init__(self, data):
        self.id = data['id']
        self.username = data['username']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.paths = []
        # What changes need to be made above for this project?
        #What needs to be added her for class association?



    # Create Users Models
    @classmethod
    def create_user(cls, form_data):
        form_data = form_data.copy()
        form_data['password'] = bcrypt.generate_password_hash(form_data['password'])
        query="""
            INSERT INTO user (username, first_name, last_name, email, password)
            VALUES (%(username)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s)
        ;"""
        new_users_id = connectToMySQL(cls.db).query_db(query, form_data)
        session['user_id'] = new_users_id
        session['user_first_name'] = f"{form_data['first_name']}"
        session['user_last_name'] = f"{form_data['last_name']}"
        return new_users_id
    
    @staticmethod
    def validate_user(user):
        isValid = True
        if len(user['username']) < 2:
            flash('Username must have at least 2 characters!')
            isValid = False
        if len(re.findall("_", user['username'])) > 2:
            flash('**Username cannot have more than 2 underscores!')
            isValid = False
        if " " in user['username']:
            flash('**Username cannot contain any spaces!')
            isValid = False
        if not re.match("^[a-zA-Z0-9_]+$", user['username']):
            flash('**Username can only contain letters, numbers, and underscores!')

        if len(user['first_name']) < 2:
            flash('First name must be at least 2 characters.')
            isValid = False
        if not re.match("^[a-zA-Z]+$", user['first_name']):
            flash('**First name must only contain letters!')
            isValid = False

        if len(user['last_name']) < 2:
            flash('Last name must be at least 2 characters.')
            isValid = False
        if not re.match("^[a-zA-Z]+$", user['last_name']):
            flash('Last name cannot have any numbers in it.')
            isValid = False
        

        if not re.search(r'\d', user['password']):
            flash('Password must contain at least ONE (1) number.')
            isValid = False
        if not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]', user['password']):
            flash('**Password must contain at least 1 special character!')
            isValid = False
        else:
            EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') #email must have email expected characters
            if not EMAIL_REGEX.match(user['email']):
                flash('You must use the correct email format, ie name@email.com.')
                isValid = False
            else:
                email = request.form['email']
                user_by_email = User.get_user_by_email(email)
                if user_by_email:
                    flash('Email is already registered and in use.')
                    isValid = False
    
        #validate password
        if len(user['password']) < 8:
            flash('Password must be at least 8 characters long.')
            isValid = False
        if request.form['password'] != request.form['confirm_password']:
            flash('Password fields do not match.')
            isValid = False
    
        return isValid



    # Read Users Models
    @classmethod
    def get_user_by_email(cls, email):
        query ="""
            SELECT * FROM user
            WHERE email = %(email)s
        ;"""
        data = {'email' : email}
        user_by_email = connectToMySQL(cls.db).query_db(query, data)
        if user_by_email:
            return cls(user_by_email[0])
        return None
    
    @classmethod
    def parse_login_data(cls, form_data):
        this_user = User.get_user_by_email(form_data['email'])
        if this_user:
            if bcrypt.check_password_hash(this_user.password, form_data['password']):
                session['user_id'] = this_user.id
                session['user_first_name'] = this_user.first_name
                session['user_last_name'] = this_user.last_name
                return True
        flash('**Invalid email or password.')
        return False

    @classmethod
    def get_user_by_id(cls, id):
        data = {'id' : id}
        query = """
            SELECT *
            FROM user
            WHERE user.id = %(id)s
        """
        single_user = connectToMySQL(cls.db).query_db(query, data)
        if single_user:
            user_info = single_user[0]
            return User(user_info)
        else:
            return None


    # Update Users Models



    # Delete Users Models