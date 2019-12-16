# -*- coding: utf-8 -*-
# @Author          : Kunhong Chan
# @Time            : 9/4/2018 12:11 PM
# @FileName        : utils.py
import json


def slice_list(lists, length):
    """
    :param lists:
    :param length:
    :return: return a slice list
    """
    return [lists[i:i + length] for i in range(0, len(lists), length)]


def json_results(success=True, errcode=1, msg=None, errmsg=None, key=False, key_values=None, **kwargs):
    """

    :param success: Boolean True or False
    :param errcode: int
    :param msg: values when successful
    :param errmsg: values when unsuccessful
    :param key: values when Embedded
    :param key_values: values when key is True
    :param kwargs: dict values when Embedded
    :return: Json dictionary

    __Author__: Kunhong Chan
    __Time__: 10/15/2018
    """
    results = {"success": success, "errcode": errcode, "msg": msg, "errmsg": errmsg}
    if success:
        if errcode is not 1:
            return None, "Successful return errCode must be 1"
    if key and key_values is not None:
        """This function just provide a key_values, Please use this function with  a key_values"""
        return json.dumps({"success": success, "errcode": errcode, "msg": msg, "errmsg": errmsg, key_values: kwargs},
                          ensure_ascii=False)
    else:
        if kwargs:
            for item in kwargs:
                results[item] = kwargs[item]
            return json.dumps(results, ensure_ascii=False)
        else:
            return json.dumps(results, ensure_ascii=False)
