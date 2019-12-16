# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 2:30 PM
# @FileName        : students.py

from flask import request, Response, current_app as app
from app.api import api
from .utils import LoginFuc
from bs4 import BeautifulSoup
from app.Common.utils import StudentInfo, CompulsoryInfo, OptionalInfo, AcademicCredits
from app.Utils.utils import slice_list, json_results


@api.route('/student/info', methods=["POST"])
def student_info():
    sno = request.values.get("username")
    password = request.values.get("password")
    """此处预留token验证方法"""
    s, err = LoginFuc(sno, password).login()
    r = s.get(app.config["INDEX_URL"], headers=app.config["HEADERS"])
    soup = BeautifulSoup(r.content, "html.parser", from_encoding="gb18030")
    stu = StudentInfo(soup)
    sno_id = str(stu.studentid())
    res = s.get(app.config["STUDENT_INFO_URL"] + sno_id + "=", headers=app.config["HEADERS"])
    soup1 = BeautifulSoup(res.content, "html.parser", from_encoding="gb18030")
    stu_info = soup1.find_all('span', attrs={'class': 'font12'})  # 获取左边信息
    stu_right = soup1.find_all('td', attrs={'class': 'td_left'})  # 获取右边信息
    left = list()
    right = list()
    for i in range(len(stu_right)):
        right.append(stu_right[i].getText().strip().replace('\r', '').replace('\n', '').replace('\t', ''))
    for k in range(len(stu_info)):
        left.append(stu_info[k].getText())
    for j in range(len(right)):
        if '' in right:
            right.remove('')
    return Response(json_results(msg="个人信息返回正常", data=[left, right]),
                    content_type="application/json;charset=utf-8")


@api.route('/student/mark', methods=["POST"])
def get_all_mark_details():
    sno = request.values.get("username")
    password = request.values.get("password")
    """此处预留token验证方法"""
    s, err = LoginFuc(sno, password).login()
    r = s.get(app.config["INDEX_URL"], headers=app.config["HEADERS"])
    soup = BeautifulSoup(r.content, "html.parser", from_encoding="gb18030")
    stu = StudentInfo(soup)
    sno_id = str(stu.studentid())
    res = s.get(app.config["STUDENT_INFO_URL"] + sno_id + "=", headers=app.config["HEADERS"])
    soup1 = BeautifulSoup(res.content, "html.parser", from_encoding="gb18030")
    compulsory_title_list = list()
    compulsory_td_list = list()
    stu_mark = soup1.find('table', attrs={'class': 'table'})
    try:
        tag = stu_mark.select("th")  # 获取顶部信息
    except Exception:
        return Response(json_results(success=False, errmsg="该期间暂不提供查询", errcode=40413),
                        content_type="application/json;charset=utf-8")
    for i in range(len(tag)):
        compulsory_title_list.append(tag[i].getText())
    more = stu_mark.select("td")
    for j in range(len(more)):
        compulsory_td_list.append(more[j].getText())
    compulsory_none_item = [None if x == '' else x for x in compulsory_td_list]
    n = len(tag)
    mark_result = slice_list(compulsory_none_item, n)
    compulsory_mark_data = CompulsoryInfo(mark_result).get_compulsory_info()

    try:
        optional = soup1.find_all('table', attrs={'class': 'table'})[1]
        optional_title = optional.select('th')
        optional_td = optional.select('td')
        optional_td_list = list()
        for j in range(len(optional_td)):
            optional_td_list.append(optional_td[j].getText().strip())
        optional_none_item = [None if x == '' else x for x in optional_td_list]
        n = len(optional_title)
        optional_data_result = slice_list(optional_none_item, n)
        optional_mark_data = OptionalInfo(optional_data_result).get_optional_info()
    except:
        optional_mark_data = None

    student_credits = AcademicCredits(soup1).get_grade_point()
    return Response(json_results(msg="成绩信息返回正常", compulsory=compulsory_mark_data,
                                 optional=optional_mark_data, credits=student_credits),
                    content_type="application/json;charset=utf-8")


@api.route("/student/exam", methods=["POST"])
def get_exam():
    sno = request.values.get("username")
    password = request.values.get("password")
    """此处预留token验证方法"""
    s, err = LoginFuc(sno, password).login()
    r = s.get(app.config["INDEX_URL"], headers=app.config["HEADERS"])
    soup = BeautifulSoup(r.content, "html.parser", from_encoding="gb18030")
    stu = StudentInfo(soup)
    sno_no_id = str(stu.no_studentid())
    res = s.get(app.config["STUDENT_EXAM_URL"] + sno_no_id, headers=app.config["HEADERS"])
    soup1 = BeautifulSoup(res.content, "html.parser", from_encoding="gb18030")
    exam_info_list = list()
    '''考试API'''
    try:
        exam_details = soup1.find_all('table', attrs={'class': 'table'})[0]
        exam_title = exam_details.select('th')
        exam_info = exam_details.select('td')
        for i in range(len(exam_info)):
            exam_info_list.append(exam_details.select('td')[i].getText().strip())
        n = len(exam_title)
        return Response(json_results(msg="考试时间信息返回正常", exam=slice_list(exam_info_list, n)),
                        content_type="application/json;charset=utf-8")

    except:
        try:
            unfinished_details = soup1.find_all('table', attrs={'align': 'center'})[-1].select('td')[0].getText()
            if "未完成" in unfinished_details:
                return Response(json_results(success=False, errmsg=unfinished_details, errcode=-4, exam=None),
                                content_type="application/json;charset=utf-8")
        except:
            res2 = s.get(app.config["STUDENT_RE_EXAM_URL"] + sno_no_id, headers=app.config["HEADERS"])
            soup2 = BeautifulSoup(res2.content, 'html.parser', from_encoding="gb18030")
            exam_info_list2 = list()
            try:
                exam_details1 = soup2.find_all('table', attrs={'class': 'table'})[0]
                exam_title1 = exam_details1.select('th')
                exam_info1 = exam_details1.select('td')
                for i in range(len(exam_info1)):
                    exam_info_list2.append(exam_details1.select('td')[i].getText().strip())
                n = len(exam_title1)
                return Response(json_results(msg="重考考试时间信息返回正常", exam=slice_list(exam_info_list2, n)),
                                content_type="application/json;charset=utf-8")
            except:
                reExam_details = soup2.find_all('table', attrs={'align': 'center'})[-1].select('td')[0].getText()
                if "未公布" in reExam_details:
                    return Response(json_results(success=False, errmsg="暂无考试信息", errcode=-4, exam=None),
                                    content_type="application/json;charset=utf-8")
        return Response(json_results(success=False, errmsg="暂无考试信息", errcode=-4, exam=None),
                        content_type="application/json;charset=utf-8")
