# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 3:23 PM
# @FileName        : timetable.py

from flask import request, Response, abort, current_app as app
from app.api import api
from .utils import LoginFuc
from bs4 import BeautifulSoup
from app.Utils.timetable import TimetableInfo
from app.Utils.utils import slice_list, json_results
import re
import datetime


@api.route('/timetable', methods=["GET", "POST"])
def curr_timetable():
    if request.method == "GET":
        abort(403)
    else:
        sno = request.values.get("username")
        password = request.values.get("password")
        """此处预留token验证方法"""
        s, err = LoginFuc(sno, password).login()
        res = s.get(app.config["TIMETABLE_URL"], headers=app.config["HEADERS"])
        soup = BeautifulSoup(res.content, "html.parser", from_encoding="gb18030")
        timetable_td = soup.find_all('td', attrs={'align': 'left'})
        try:
            week = soup.find_all('span', attrs={'class': 'style16'})[-1]
            week_text = week.getText().strip().split(': ')[-1]
            re_week = re.findall(r"[0-9]*", week_text)
            find_term = soup.find_all('span', attrs={'class': 'style17'})[0]
            split_term = find_term.getText().strip().split('\n')
            term = split_term[0]
            for item in range(len(re_week)):
                if '' in re_week:
                    re_week.remove('')
            result_week = int(re_week[0])
        except IndexError:
            result_week = "假期"
            term = "假期"
        timetable = list()
        for item in range(len(timetable_td)):
            if len(timetable_td[item].getText()) <= 1:
                timetable.append(None)
            else:
                timetable.append(TimetableInfo(timetable_td[item].getText()).timetable_more_info())
        n = 7  # 设置分割点长度
        data = slice_list(timetable, n)
        for i in range(len(data)):
            data[i].insert(0, None)
            data[i].pop(-1)
        return Response(json_results(msg="课表数据返回正常", week=result_week, term=term, timetable=data),
                        content_type="application/json;charset=utf-8")


@api.route('/timetable/new', methods=["GET", "POST"])
def new_timetable():
    if request.method == "GET":
        abort(403)
    else:
        sno = request.values.get("username")
        password = request.values.get("password")
        """此处预留token验证方法"""
        s, err = LoginFuc(sno, password).login()
        current_result = s.get(app.config["TIMETABLE_URL"], headers=app.config["HEADERS"])
        current_soup = BeautifulSoup(current_result.content, 'html.parser', from_encoding="gb18030")
        current_soup_td = current_soup.find_all('td', attrs={'align': 'left'})

        s_mon = datetime.datetime.now().strftime('%m')
        s_years = datetime.datetime.now().strftime('%Y')
        # 此处预留一个月份判断学年bug，待修复
        if int(s_mon) > 8:
            school_year = int(s_years)
            semester = 2
        elif 1 <= int(s_mon) <= 2:
            school_year = int(s_years) - 1
            semester = 2
        else:
            school_year = int(s_years)
            semester = 1

        new_timetable_url = app.config["TIMETABLE_URL"] + "?schoolyear=" + str(school_year) + "&semester=" + str(semester)  # 新学期课表url
        new_timetable_result = s.get(new_timetable_url, headers=app.config["HEADERS"])
        new_timetable_soup = BeautifulSoup(new_timetable_result.content, 'html.parser', from_encoding="gb18030")
        new_timetable_td = new_timetable_soup.find_all('td', attrs={'align': 'left'})
        timetable = list()
        current_timetable = list()

        for item in range(len(current_soup_td)):
            if len(current_soup_td[item].getText()) <= 1:
                current_timetable.append(None)
            else:
                current_timetable.append(TimetableInfo(current_soup_td[item].getText()).timetable_more_info())
        for item in range(len(new_timetable_td)):
            if len(new_timetable_td[item].getText()) <= 1:
                timetable.append(None)
            else:
                timetable.append(TimetableInfo(new_timetable_td[item].getText()).timetable_more_info())
        # 对比两个课表是否一致 周数必须大于15才可以启用
        if timetable == current_timetable:
            return Response(json_results(success=False, errmsg="没有新学期课表信息", errcode=40010),
                            content_type="application/json;charset=utf-8")
        else:
            # 设置分割点长度
            data = slice_list(timetable, 7)
            for i in range(len(data)):
                data[i].insert(0, None)
                data[i].pop(-1)
            return Response(json_results(msg="新学期课表信息返回正常", timetable=data),
                            content_type="application/json;charset=utf-8")
