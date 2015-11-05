from flask import Flask
app = Flask(__name__, static_url_path='/views')

@app.route("/")
def hello():
    return app.send_static_file('/index.html')

if __name__ == "__main__":
    app.run()