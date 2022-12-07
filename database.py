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
        result = ''
        count = 0
        """Grabs all the fractal info from a given account"""
        query = self.client.query(kind='fractals')
        query.add_filter("userID", "=", userID)
        
        for fractal in query.fetch():
            cellDiv = '<section id="cell">'
            cellDiv += '<div id="galleryImg">'
            cellDiv += '<canvas id=canvas' + count + ' class="img-class" height=300 width=300></div>'

            cellDiv += '<section id="galleryInfo">'
            cellDiv += '<div id="galleryText">Fractal Info<div class="fractal-info">'
            cellDiv += 'Name: ' + fractal['fractalName'] + '<br>'
            cellDiv += 'Real Start Span: ' + fractal['realStart'] + '<br>'
            cellDiv += 'Real End Span: ' + fractal['realEnd'] + '<br>'
            cellDiv += 'Imaginary Start Span: ' + fractal['imagStart'] + '<br>'
            cellDiv += 'Imaginary End Span: ' + fractal['imagEnd'] + '</div></div>'

            cellDiv += '<div id="galleryButton"><button type="button">Open in Generator</button></div>'
            cellDiv += '<div id="galleryButton"><button onclick="exportGalleryImg(this)" type="button" class="exportButton">Export as Image</button></div>'
            cellDiv += '</section></section>'

            count += 1
        return cellDiv

        """
        for fractal in query.fetch():
            outputDiv = '<div class="Fractal">%s, %s, %s, %s, %s</div>'
            span = '<span class="%s">%s</span>'
            nameSpan = span % ('Name:', fractal['fractalName'])
            realStartSpan = span % ('Real Start:', fractal['realStart'])
            realEndSpan = span % ('Real End:', fractal['realEnd'])
            imagStartSpan = span % ('Imaginary Start:', fractal['imagStart'])
            imagEndSpan = span % ('Imaginary End:', fractal['imagEnd'])
            result += outputDiv % (nameSpan, realStartSpan, realEndSpan, imagStartSpan, imagEndSpan)
            result += '\n'
        return result
        """
