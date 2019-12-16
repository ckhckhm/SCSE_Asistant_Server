# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/3/2018 2:21 PM
# @FileName        : utils.py


import re
from app.Utils.utils import slice_list


class StudentInfo:
    """
    Editor by : Kunhong Chan  Date : 9/15/2018
    """

    def __init__(self, soup):
        self.soup = soup

    def studentid(self):
        """
        获取加密的studentid
        :return:
        """
        link = self.soup.select('td[class="tablehead"]')[0]
        onclick_value = link.find_all('td', attrs={'height': '20'})[0].get('onclick')
        studentid = re.findall(r"studentid=(.+?)=", onclick_value)[0]
        return studentid

    def no_studentid(self):
        """
        获取未加密的studentid
        :return:
        """
        link = self.soup.select('td[class="tablehead"]')[2]
        onclick_value = link.find_all('td', attrs={'height': '20'})[0].get('onclick')
        studentid = re.findall(r"studentid=(.+)'", onclick_value)[0]
        return studentid

    def attendance_info(self):
        """
        获取gzcode
        :return:
        """
        link = self.soup.select('td[class="tablehead"]')[3]
        onclick_value = link.find_all('td', attrs={'height': '20'})[0].get('onclick')
        gzcode = re.findall(r"gzcode=(.+?)=", onclick_value)[0]
        return gzcode

    def more(self):
        """
        其余功能后续补充
        :return:
        """


class CompulsoryInfo:
    def __init__(self, compulsory_info):
        self.compulsory_info = compulsory_info

    def get_compulsory_info(self):
        num = list()
        mark_list = list()
        slicing_mark_list_result = list()
        '''Create a statistics list'''
        for j in range(len(self.compulsory_info)):
            if self.compulsory_info[j][0] is not None:
                num.append(j)

        '''利用列表进行分组切割处理'''

        for i in range(len(num)):
            if i < len(num) - 1:
                result = list(self.compulsory_info[num[i]:num[i + 1]])
            elif i == len(num) - 1:
                result = list(self.compulsory_info[num[i]:])
            else:
                break
            for item in range(len(result)):
                info_result = result[item][1:4] + result[item][-3:]
                mark_list.append(info_result)

        for course_item in range(len(num)):
            if course_item < len(num) - 1:
                slicing_mark_list = mark_list[num[course_item]:num[course_item + 1]]
                slicing_mark_list_result.append(slicing_mark_list)
            elif course_item == len(num) - 1:
                slicing_mark_list = mark_list[num[course_item]:]
                slicing_mark_list_result.append(slicing_mark_list)

        return slicing_mark_list_result


class OptionalInfo:
    def __init__(self, optional_info):
        self.optional_info = optional_info

    def get_optional_info(self):
        num = []
        mark_list = []
        '''Create a statistics list'''
        for j in range(len(self.optional_info)):
            if self.optional_info[j][0] is not None:
                num.append(j)

        '''利用列表进行分组切割处理'''

        for i in range(len(num)):
            if i < len(num) - 1:
                result = list(self.optional_info[num[i]:num[i + 1]])
            elif i == len(num) - 1:
                result = list(self.optional_info[num[i]:])
            else:
                break
            for item in range(len(result)):
                info_result = result[item][:3] + result[item][-3:]
                mark_list.append(info_result)
        return mark_list


'''This is a GPA method'''


class AcademicCredits:

    def __init__(self, soup):
        self.soup = soup

    def get_grade_point(self):
        grade_point_list = []
        point = self.soup.find_all('table')[-1]
        point_select_tr = point.select('td')
        for i in range(len(point_select_tr)):
            grade_point_list.append(point_select_tr[i].getText().strip())
        for del_item in range(len(grade_point_list)):
            if '' in grade_point_list:
                grade_point_list.remove('')

        slicing_grade_point_list = grade_point_list[4:]
        n = 2
        grade_point_list_result = slice_list(slicing_grade_point_list, n)
        return grade_point_list_result

