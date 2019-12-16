# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 2:16 PM
# @FileName        : manage.py

from app import *


if __name__ == '__main__':
    app.run(host=app.config["SERVER_HOST"], port=app.config["SERVER_PORT"])
