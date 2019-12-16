# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 2:23 PM
# @FileName        : config.py


class Config:
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'Assistant'
    HEADERS = {
        'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 '
                      'Safari/537.36 '
    }
    LOGIN_URL = "http://class.sise.com.cn:7001/sise/login.jsp"
    CHECK_LOGIN_URL = "http://class.sise.com.cn:7001/sise/login_check_login.jsp"
    INDEX_URL = "http://class.sise.com.cn:7001/sise/module/student_states/student_select_class/main.jsp"
    TIMETABLE_URL = "http://class.sise.com.cn:7001/sise/module/student_schedular/student_schedular.jsp"
    STUDENT_INFO_URL = "http://class.sise.com.cn:7001/SISEWeb/pub/course/courseViewAction.do?method=doMain&studentid="
    STUDENT_EXAM_URL = "http://class.sise.com.cn:7001/SISEWeb/pub/exam/studentexamAction.do?method=doMain&studentid="
    STUDENT_RE_EXAM_URL = "http://class.sise.com.cn:7001/SISEWeb/pub/exam/studentReExamAction.do?method=doMain&studentid="


class DevelopmentEnvironment(Config):
    # Server Setting
    SERVER_HOST = "127.0.0.1"
    SERVER_PORT = "5000"
    DEBUG = True
    MONGODB_DB = "test1"
    MONGODB_HOST = ""
    MONGODB_PORT = 27017
    MONGODB_USERNAME = None
    MONGODB_PASSWORD = None

    # DB Setting
    pass


"""
class ProductionEnvironment(Config):
    # Server Setting
    SERVER_HOST = "0.0.0.0"
    SERVER_PORT = "5000"
    print("You are in Production environment")

    # DB Setting
    pass

"""
"""
class TestingEnvironment(Config):
    # Server Setting
    SERVER_HOST = "127.0.0.1"
    SERVER_PORT = "8000"
    TESTING = True

    # DB Setting
    pass
    
"""
