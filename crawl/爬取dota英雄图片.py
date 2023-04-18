
import requests
import os
import json

def getDataFromUrl():
    params = {
        'task':'herolist'
    }
    headers={
    }
    response = requests.post('https://www.dota2.com.cn/datafeed/heroList',params=params,headers=headers)
    return response.json().get('result').get("heroes")

def downloadAllImage():
    data = getDataFromUrl()
    for item in data:
        saveImage(item)

def saveImage(hero):
    path = os.getcwd()
    filePath = './hero_image/{}.png'.format(hero.get('name'))
    # 已经保存过则不再处理
    if os.path.exists(filePath):
        print('图片已存在',hero.get('name'))
        return
    print('正在保存图片',hero.get('name'))
    dir = os.path.dirname(filePath)
    if not os.path.exists(dir):
        os.makedirs(dir)
    response = requests.get(hero.get('index_img'))
    with open(filePath,'wb') as f:
        f.write(response.content)


if __name__ == "__main__":
    downloadAllImage()