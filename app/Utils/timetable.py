# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/4/2018 12:10 PM
# @FileName        : timetable.py

import re


class TimetableInfo:
    def __init__(self, info):
        self.info = info

    def timetable_more_info(self):

        timetable = self.info.strip(',').split(', ')
        # print(timetable)
        '''
        Test more than 2 element 
        '''
        kuohao1 = []
        course = []
        no = []
        result = []
        temp = []
        if len(timetable) == 1:
            if len(self.info) <= 1:
                kuohao = re.findall(r"[(](.*?)[)]", self.info)
                kuohao1.append(kuohao)
            else:
                kuohao = re.findall(r"[(](.*?)[)]", self.info)[-1]
                kuohao1.append(kuohao)
            course = re.findall(r"(.*)[(]", self.info)
            no = re.findall(r"[a-zA-Z0-9\s*]", kuohao1[0])

            for i in range(len(no)):
                if no[i] == " ":
                    break
            class_num = "".join(no[:i]).strip(',').split(',')

            keshi = re.findall(r"[[](.*?)[]]", kuohao1[0])
            teacher = re.findall(r"[\u4e00-\u9fa5]", kuohao1[0])
            teacher.pop(-1)
            teacher_list = "".join(teacher).strip(',').split(',')
            if "在线课" in teacher_list:
                return None

            space = re.findall(r"\s+[0-9]*", self.info)
            for j in range(len(self.info)):
                if ' ' in space:
                    space.remove(' ')
                else:
                    break

            week = [int(space[item]) for item in range(len(space))]
            return course + class_num + teacher_list + keshi + [week]
        else:
            for k in range(len(timetable)):
                kuohao = re.findall(r"[(](.*?)[)]", timetable[k])[-1]
                course = re.findall(r"(.*)[(]", timetable[k])
                no = re.findall(r"[a-zA-Z0-9\s*]", kuohao)
                for item in range(len(no)):
                    if no[item] == " ":
                        break
                class_num = "".join(no[:item]).strip(',').split(',')[0]
                keshi = re.findall(r"[[](.*)[]]", kuohao)
                teacher = re.findall(r"[\u4e00-\u9fa5]", kuohao)
                teacher.pop(-1)
                teacher_list = "".join(teacher).strip(',').split(',')[0]
                space = re.findall(r"\s+[0-9]*", timetable[k])
                for j in range(len(timetable[k])):
                    if ' ' in space:
                        space.remove(' ')
                    else:
                        break

                week = [int(space[item]) for item in range(len(space))]
                if "在线课" in teacher_list:
                    temp1 = None
                else:
                    temp1 = course + [class_num] + [teacher_list] + keshi + [week]
                temp.append(temp1)
            result.append(temp)
            temp = []
            return result
