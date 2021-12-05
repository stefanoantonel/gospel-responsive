from flask import Flask
import feedparser
from lxml import html, etree
import requests
import gospel_utils


app = Flask(__name__)

search_word = 'Evangelio según San'

@app.route('/')
def show_gospel():
    return gospel_utils.main()
