# Om Vighneswaraya Namaha

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/game/id=<id>')
def game_2048(id):
    return render_template('2048.html')


if __name__ == '__main__':
    app.run(debug=True)
