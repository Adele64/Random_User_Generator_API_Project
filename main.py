from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    response = requests.get('https://randomuser.me/api/?results=10')
    data = response.json()['results']
    return render_template('index.html', users=data)

if __name__ == '__main__':
    app.run(debug=True)
