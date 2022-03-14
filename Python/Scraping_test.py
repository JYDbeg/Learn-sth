import time
import pandas as pd 
import chromedriver_binary 
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
driver = webdriver.Chrome()

df=pd.read_excel('sample.xlsx',sheet_name=0,index_col=0)

start_col = 54
color = 4
id_row = 5
num = 7
s_row = 6
url_row = 8
bottun_2 = "search_btn"
inputarea = "search_form"
bun = "search_detail"
houkisei = "mdisc"
colorname = "その他の名称"
furigana = "フリガナ"
houNumber = "法規制番号"
bn =""
houtext=""
def exs_input(a,b):
    global houtext
    global bn
    hou = driver.find_elements_by_class_name(b)
    bsd = driver.find_elements_by_class_name(a)
    for i in bsd:
        if houNumber in i.text:
            hn=-1
            houtext = hou[hn].text
        else:houtext ="None"
    bsd = bsd[0].text.split('\n')
    
    for i in bsd:
        if colorname in i:
            sonota = bsd.index(i)+1
        if furigana in i:
            bn = i[9:]
        else :bn =="None"
    return bsd[sonota],bn,houtext


html = 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=200907058487000920&rel=1#%7B%22category%22%3A%227%22%2C%22keyword%22%3A%22C.I.16150%22%7D'
driver.get(html)
time.sleep(3)

for i in range(df.shape[0]):
    if start_col >=399:
        break
    ifsonzai = df.iat[start_col,8]
    if not pd.isna(ifsonzai):
        start_col +=1
        continue
    beforeval =df.iat[start_col-1,id_row]
    values = df.iat[start_col,id_row]
    if beforeval == values:
        df.iat[start_col,color] = df.iat[start_col-1,color]
        df.iat[start_col,s_row]  = df.iat[start_col-1,s_row]
        df.iat[start_col,num] = df.iat[start_col-1,num]
        df.iat[start_col,url_row] = df.iat[start_col-1,url_row]
        start_col +=1
        continue
    search_bar = driver.find_element_by_class_name(inputarea)
    search_btn = driver.find_element_by_class_name(bottun_2)

    search_bar.clear()
    time.sleep(2)
    search_bar.send_keys("C.I."+str(values))
    time.sleep(2)
    search_bar.send_keys(Keys.ENTER)
    time.sleep(5)

    if len(driver.find_elements_by_class_name('listbox_title_a'))>0:
        new_url = driver.find_element_by_class_name('listbox_title_a')
        new_url.click()
        time.sleep(5)
        if len(driver.find_elements_by_class_name('pane4_text'))>0:
            driver.find_element_by_class_name('pane4_text').click()
        meisyo,siki,houban = exs_input(bun,houkisei)
        df.iat[start_col,color] = meisyo
        df.iat[start_col,s_row]  = siki
        df.iat[start_col,num] = houban
        df.iat[start_col,url_row] = driver.current_url
        start_col += 1 

    else:
        df.iat[start_col,url_row] = "None"
        start_col += 1
    print(start_col)
with pd.ExcelWriter('Output.xlsx') as writer:
    df.to_excel(writer,sheet_name="1")


driver.quit()
