網址連結：https://haotiencheng.github.io/final/
期末專題主題簡介：
之前常會遇到要比較股票績效的狀況，所以想說做一個可以自動比較的網頁。

要怎麼使用我的網站：
1. Claim your own API on RapidAPI / Use my API Key (As default, only allows 5 calls/sec 500 calls/month).
* You can see remaing calls under the "Create Chart" button after clicking it.
* Only US stocks are supported and each stock equals one call.
![image](https://github.com/haotiencheng/haotiencheng.github.io/blob/master/final/1.png)
2. Search for your target stock's symbol on Yahoo Finance.
![image](https://github.com/haotiencheng/haotiencheng.github.io/blob/master/final/2.png)
3. Type the symbol into the input box and check it.
![image](https://github.com/haotiencheng/haotiencheng.github.io/blob/master/final/3.png)
4. Select one of the range you want (Affect the data fetched), default 5 years.
![image](https://github.com/haotiencheng/haotiencheng.github.io/blob/master/final/4.png)
5. Press the "Create Chart" button to create chart.
![image](https://github.com/haotiencheng/haotiencheng.github.io/blob/master/final/5.png)
6. You can now play with the chart.
![image](https://github.com/haotiencheng/haotiencheng.github.io/blob/master/final/6.png)

做了什麼，使用了什麼技術：
1. 排版使用Bootstrap，因為本身美感的要求所以layout是完全自己做的。
2. 以JQuery去做按鈕網頁的互動，像是clear、add stock、minus stock、Submit API、導覽列點擊前往位置等等。
3. 股票資料的來源為RapidAPI的yahoo-finance1，用ajax去抓資料。
4. 圖表的繪製是用Highcharts的Highstock，裡面內建的功能幫助了我許多。

總結：
花了很多時間，希望大家可以自己玩玩看（最好自己去申請一個API，不然我的額度很快就用完了。），看一下一些細節，當然會有一點小bug（我現在技術可能不夠處理），但是我很盡力的作品><！
