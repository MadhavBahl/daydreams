import os

from flask import Flask

app = Flask(__name__)

app.config['AZURE_SECRET_KEY'] = '5b98e6605bff40c8b656d1686cebc06f'

from app import routes