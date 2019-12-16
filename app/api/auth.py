# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 3:22 PM
# @FileName        : auth.py


from flask import request, abort, jsonify, current_app as app
from app.api import api
from bs4 import BeautifulSoup
from .utils import LoginFuc


@api.route('/api', methods=["GET", "POST"])
def index():
    if request.method == "GET":
        abort(403)
    else:
        sno = request.values.get("username")
        password = request.values.get("password")
        """此处预留token验证方法"""
        s, err = LoginFuc(sno, password).login()
        r = s.get(app.config["INDEX_URL"], headers=app.config["HEADERS"])
        soup = BeautifulSoup(r.content, "html.parser", from_encoding="gb18030")
        title = soup.title
        if title is not None:
            return jsonify({'status': 1, "errcode": 1, "success": True, "msg": u"登陆成功"})
        else:
            if "密码错误" in err:
                return jsonify({'status': 0, "success": False, "errmsg": u"密码错误"})
            elif "找不到" in err:
                return jsonify({'status': -1, "success": False, "errmsg": u"账号不存在"})
            elif "选课" in err:
                return jsonify({'status': -3, "success": False, "errmsg": u"未到你的选课时间"})
            else:
                return jsonify({'status': -2, "success": False, "errmsg": u"服务器维护"})
