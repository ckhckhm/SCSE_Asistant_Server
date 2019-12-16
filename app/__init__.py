# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 2:22 PM
# @FileName        : __init__.py.py

from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
import os
from app.api import api as api_blueprint
from flask_mongoengine import MongoEngine
from app.models import *

db = MongoEngine()

app = Flask(__name__)
app.config.from_pyfile("config.py")
db.init_app(app)
CONFIG_NAME_MAPPER = {
    'product': 'app.config.ProductionEnvironment',
    'dev': 'app.config.DevelopmentEnvironment',
    'test': 'app.config.TestingEnvironment'
}


def create_app(flask_config_name=None):
    """
    创建配置
    :return:
    """
    app = Flask(__name__)
    app.wsgi_app = ProxyFix(app.wsgi_app)
    env_flask_config_name = os.getenv('FLASK_CONFIG')
    config_mapper_name = flask_config_name or env_flask_config_name or 'dev'
    config_name = CONFIG_NAME_MAPPER[config_mapper_name]
    app.config.from_object(config_name)

    return app


app = create_app()


app.register_blueprint(api_blueprint)
