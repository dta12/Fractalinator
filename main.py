from fileinput import filename
import flask
from flask import url_for
import database

import os
os.environ["GCLOUD_PROJECT"] = "frac-m2"

app = flask.Flask(__name__)
f = database.FractalData()

# note that we can include several routes for the same function.


@app.route('/')
@app.route('/login.html')
@app.route('/login')
def root():
    # use render_template to convert the template code to HTML.
    # this function will look in the templates/ folder for your file.
    return flask.render_template('login.html', state="null", page_title='Main Page')

@app.route('/signedUp', methods=['POST', 'GET'])
def loginSignUp():
    user = flask.request.form['username']
    password = flask.request.form['password']
    if user and password:
        add = f.add_user(user, password)
        # if username exists already, display an error that an account already exists with username
        if (add != True):
            return flask.redirect(url_for('root', state="userExists"))
    return flask.redirect(url_for('root', state="created"))

@app.route('/signedIn', methods=['POST', 'GET'])
def loginSignIn():
    user = flask.request.form['usernameSignIn']
    password = flask.request.form['passwordSignIn']
    if user and password:
        # if the username and password match what is in the database, then go to the index page
        if (f.credentials(user, password)):
            return flask.render_template('index.html', userID=f.getID(user))
    # display an error that either the username or password is incorrect
    return flask.redirect(url_for('root', state="wrongCredentials"))

# note in our previous example we used separate functions for each template.
# we can use our parameterization here to apply templates for many requests.
@app.route('/<requested_page>')
def templater(requested_page):
    return flask.render_template(requested_page)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
