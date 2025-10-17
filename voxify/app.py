from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/disclaimer')
def disclaimer():
    return render_template('disclaimer.html')

@app.route('/tracking')
def tracking():
    return render_template('tracking.html')

@app.route('/graph')
def graph():
    return render_template('graph.html')

@app.route('/knowledge')
def knowledge():
    return render_template('knowledge.html')

@app.route('/start')
def start():
    return render_template('start.html')

@app.route('/measure_tips')
def measure_tips():
    return render_template('measure_tips.html')

@app.route('/measuring')
def measuring():
    return render_template('measuring.html')

@app.route('/report')
def report():
    return render_template('report.html')

if __name__ == '__main__':
    app.run(debug=True)