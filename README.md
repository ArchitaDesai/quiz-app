# Quiz App with React and Django

A quiz app built with React and Django!



## Installation Instructions

- After cloning the repository, `cd` into it and run following commands:

```
# Create a virtual environment for the backend
virtualenv env

# Activate the virtual environment
source env/bin/activate

# Install the packages
pip install -r requirements.txt

# Make build.sh executable 
chmod +x build.sh

# Run build script manually from either project's root or 'frontend' directory
./build.sh

# Install nodemon gloablly to auto-reload the server when making changes in the files
npm install -g nodemon

# cd into the frontend directory
cd frontend

# Install packages for the React app
npm install

# Use npm-watch to track the changes being made in the React app
npm run watch
```

- Now, open up a new terminal, go inside the repo and run following commands:

```
source env/bin/activate
cd backend

# To run Django dev server and watch file changes in the app
nodemon --exec python manage.py runserver
```



