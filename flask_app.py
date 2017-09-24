from flask import Flask
import feedparser

app = Flask(__name__)

search_word = 'Evangelio según San'

@app.route('/')
def hello_world():
    evang_value = find_gospel()
    gospel = get_gospel(evang_value)
    audio = get_audio(evang_value)
    copyright = get_copyright()
    content = gospel_html(gospel + audio + copyright)
    return content


def find_gospel():
    d = feedparser.parse('http://feeds.feedburner.com/mdc-misionerosdigitales')
    found = False
    gospel = ''
    i = 0
    entries = d.entries
    while found == False:
        evang_value = entries[i].content[0].value
        if evang_value.find(search_word) != -1 :
            found = True
            gospel = evang_value
        if len(entries) == (i+1):
            found = True
        i = i + 1
    return gospel


def get_gospel(evang_value):
    index_evang = evang_value.find(search_word)
    print (index_evang)
    end_evang = evang_value.find("</p>", index_evang)
    return evang_value[index_evang:end_evang]


def get_audio(evang_value):
    index_audio = evang_value.find('<audio')
    end_audio = evang_value.find('</audio>', index_audio)
    return evang_value[index_audio:end_audio+8] # to capture the tag


def get_style():
    return '''<style>
        body {
            background-color: black;
            font-size: 24;
            color: white;
            font-family: cursive;
        }
        .copyright {
            font-size: 8px;
            float: right;
        }
    </style>'''


def get_copyright():
    return '<p class="copyright">Contenido extraido de misioneros digitales</p>'


def gospel_html(content):
    return '''<html>
        <head><title>Evangelio</title><meta name="viewport" ,="" content="width=device-width, initial-scale=1">
            <meta charset="utf-8">
            <meta name="theme-color" content="#a1952e">
            <link rel="manifest" href="/static/manifest.json">
            <meta name="msapplication-TileColor" content="#33dfa0">
            <meta name="mobile-web-app-capable" content="yes">
            <meta name="application-name" content="Gospel">
            <link rel="icon" sizes="16x16" href="/static/favicon.ico">
            <style>
                body {
                    background-color: black;
                    font-size: 24;
                    color: white;
                    font-family: sans-serif;
                    line-height: 1.5;
                    max-width: 650px;
                    margin: 10px auto;
                }
                .copyright {
                    font-size: 8px;
                    float: right;
                }
            </style>
        </head>
        <body>''' + content +'''</body>
    </html>'''
