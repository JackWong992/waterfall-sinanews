# 懒加载+瀑布流实现新闻页面
[预览地址](http://www.feelone.top/waterfall-sinanews/)


## 懒加载实现原理
准备工作： 找固定的图片代替需要缓存的图片

封装三个函数：
* 判断元素是否出现在用户视野内
  * 大致为：窗口的高度+元素滚动的距离 >= 元素距离页面顶部的距离
* 加载缓存的图片
  * 大致为：将固定图片的标签(src)修改为真实图片的地址
* 开始执行，先判断是否满足封装的第一个函数，满足执行第二个函数。
* 滚动触发事件：执行封装的第三个函数

注意事项：首屏是默认出现在用户视野内的，所以要先执行一次封装的第三个函数

[点击预览：懒加载实现](http://js.jirengu.com/ditef/1/edit?html,js,output)

关于页面元素的位置判断:<br>
（这里讨论的是一个页面的高度大于浏览器的窗口的前提下）<br>
起始位置：<br>
1. 页面没有滚动，只要元素出现在浏览器的窗口内，等于出现在可视区<br>
2. 页面发生滚动，窗口的高度+元素滚动的距离 >= 元素距离页面顶部的距离，满足这个条件默认为元素出现在用户视野内<br>
3. 页面滚动至最低端，元素距离页面顶部的距离 = 浏览器窗口的高度+滚动的距离<br>



## 瀑布流实现原理
前置分析： 瀑布流的实现分为两种，<br>
1. 屏幕宽度固定
2. 宽度随着屏幕改变而改变<br>

对于第一种而言实现起来相对比较简单，对于第二种来说列数随着屏幕的宽度发生变化而变化。<br>
瀑布流要求元素的宽度是相等的，高度是不等的！<br>

对于第二种，首先通过绝对定位对页面进行布局，通过JS控制使图片的位置发生变化<br>
第一步：获取列的数目(屏幕的宽度/每一张图片的宽度)<br>
第二步：设置每列的高度的集合，每个子元素初始化为0<br>
第三步：获取每行元素的最小值，和最小值的下标，初次默认为第一个元素的下标为最小值<br>
第四步：设置样式<br>
  * 对于每张图片来说，要排在每列中最小值的后面，左边的宽度：left = min * image-width，高度为： 最小值元素对应的高度<br>
  * 列的高度的集合为上一次元素的元素的高度之和<br>

[点击预览懒加载](http://js.jirengu.com/qonuw/1/edit?html,js,output)


## 展示<br>
![image](https://github.com/JackWong992/waterfall-sinanews/blob/master/lazyload.gif)
<br>

[效果预览地址](http://www.feelone.top/waterfall-sinanews/)<br>
[代码展示]()

实现：<br>

i：<br>
1. 获取数据<br>
2. 把数据封装成 dom 到页面中<br>
3. 使用瀑布流去访问dom的位置<br>

ii：<br>

1. 把获取page=1的20条数据拼装成dom放到页面中<br>
2. 使用瀑布流访问dom位置
3. page++<br>

iii：<br>
页面触发滚动：执行ii操作<br>
