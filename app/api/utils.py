# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 2:22 PM
# @FileName        : utils.py

from flask import current_app as app
import requests
from bs4 import BeautifulSoup


class LoginFuc(object):
    def __init__(self, sno, password):
        self.sno = sno
        self.password = password
        self.LoginUrl = app.config["LOGIN_URL"]
        self.CheckLoginUrl = app.config["CHECK_LOGIN_URL"]
        self.IndexUrl = app.config["INDEX_URL"]

    def login(self):
        """

        :return: a tuple with session and error message.
        """
        s = requests.session()
        # then use get() method to request a HTML page.
        r = s.get(self.LoginUrl, headers=app.config["HEADERS"])

        # use BeautifulSoup and lxml to
        soup = BeautifulSoup(r.content, 'lxml', from_encoding="gb18030")

        # find form hidden values
        name = soup.select('input[type="hidden"]')[0].get('name')
        value = soup.select('input[type="hidden"]')[0].get('value')

        try:
            random = soup.select('input[name="random"]')[0].get('value')
        except IndexError:
            random = ''

        # define a form data dict
        payload = {
            name: value,
            'random': random,
            'token': '',
            'username': self.sno,
            'password': self.password
        }

        result = s.post(self.CheckLoginUrl, data=payload, headers=app.config["HEADERS"])
        if result.status_code == requests.codes.ok:
            results = BeautifulSoup(result.content, "html.parser", from_encoding="gb18030")
            return s, results.getText()
        else:
            return 0
