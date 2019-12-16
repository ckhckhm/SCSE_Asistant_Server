# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 2:21 PM
# @FileName        : __init__.py

from flask import Blueprint

api = Blueprint('api', __name__, url_prefix='/api/v2')

from app.api.timetable import *
from app.api.students import *
from app.api.teachers import *
from app.api.auth import *
from app.api.userMsg import *
