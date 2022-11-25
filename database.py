import datetime
from google.cloud import datastore

class FractalData():

    def __init__(self):
        """Initialize the database"""
        self.client = datastore.Client()

    def add_user(self, user, password):
        """Add username and password of account to database"""
        query = self.client.query(kind='accounts')
        query.add_filter("username", "=", user)
        if (len(list(query.fetch())) != 0):
            return False

        key = self.client.key("accounts")
        account = datastore.Entity(key)

        account.update(
            {
                "username": user,
                "password": password
            }
        )
        self.client.put(account)
        return True

    def credentials(self, username, password):
        """Verifies the username and password are correct"""
        query = self.client.query(kind='accounts')
        query.add_filter("username", "=", username)
        for account in query.fetch():
            if (account['password'] == password):
                return True
            return False

    def getID(self, username):
        """Gets the ID of the user, a loophole for rerouting"""
        query = self.client.query(kind='accounts')
        query.add_filter("username", "=", username)
        
        for entity in query.fetch():
            return str(entity.key)  

    def add_fractal(self, userID, name, realStart, realEnd, imagStart, imagEnd):
        """Add fractal to fractal database using userID """
        if (userID == "null"):
            return False
        
        key = self.client.key("fractals")
        fractal = datastore.Entity(key)

        fractal.update(
            {
                "userID": userID,
                "fractalName": name,
                "realStart": realStart,
                "realEnd": realEnd,
                "imagStart": imagStart,
                "imagEnd": imagEnd
            }
        )
        self.client.put(fractal)
        return True

    def get_fractals(self, userID):
        """Grabs all the fractal info from a given account"""
        query = self.client.query(kind='fractals')
        query.add_filter("userID", "=", userID)

        return list(query.fetch())
