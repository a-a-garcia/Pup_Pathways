from dotenv import load_dotenv
import os
from flask_app import app
from flask_app.controllers import users, paths #controllers go here

#load environment variables from .env
load_dotenv()

api_key = os.getenv("API_KEY")

if __name__=="__main__":   
    app.run(debug=True) 

# debug needs to be set to False when deployed.
# We shared a video showing how the information leaked by this feature and help hackers.