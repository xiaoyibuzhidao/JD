window.onload = function () {
    bannerEffect();
    searchEffect();
    timeBack();
}

function searchEffect() {
    //头部搜索块的js
    var banner = document.querySelector('.jd_banner');
    var bannerHeight = banner.offsetHeight;
    //获取header搜索块
    var search = document.querySelector('.jd_search')
    window.onscroll = function () {
        var offsetTop = document.documentElement.scrollTop;
        if (offsetTop / bannerHeight <= 1) {
            search.style.backgroundColor = `rgba(233,35,34,${offsetTop/bannerHeight})`
        }
    }
}

function timeBack() {
    var sTime = setInterval(() => {

        var sDate = new Date('2019-3-15 17:00').getTime()
        var date = new Date().getTime();
        var tim = (sDate - date) / 1000;
        if (tim < 0) {
            clearInterval(sTime)
            return;
        }
        var h = Math.floor(tim / 3600 / 10)
        var h1 = Math.floor(tim / 3600 % 10)
        var m = Math.floor(tim % 3600 / 60 / 10)
        var m1 = Math.floor(tim % 3600 / 60 % 10)
        var s = Math.floor(tim % 60 / 10)
        var s1 = Math.floor(tim % 60 % 10)

        document.querySelector('.jd_sk_time span:nth-of-type(1)').innerText = h
        document.querySelector('.jd_sk_time span:nth-of-type(2)').innerText = h1
        document.querySelector('.jd_sk_time span:nth-of-type(4)').innerText = m
        document.querySelector('.jd_sk_time span:nth-of-type(5)').innerText = m1
        document.querySelector('.jd_sk_time span:nth-of-type(7)').innerText = s
        document.querySelector('.jd_sk_time span:nth-of-type(8)').innerText = s1
    }, 1000);
}

function bannerEffect() {
    var banner = document.querySelector('.jd_banner')
    var imgBox = document.querySelector('ul:first-of-type');
    var first = imgBox.querySelector('li:first-of-type');
    var last = imgBox.querySelector('li:last-of-type');
    //将第一张图片添加到这组图片最后
    imgBox.appendChild(first.cloneNode(true));
    //将最后一张图片复制,添加到这组图片最前面
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);
    //insetBefore将元素添加到某个元素之前
    //找到轮播图中所有图片
    var lis = imgBox.querySelectorAll('li');
    //count是图片的总数量
    var count = lis.length;
    //获取当前轮播图窗口的大小
    var bannerWidth = banner.offsetWidth;
    //将图片的总宽度为  图片总数量*轮播图窗口的宽度
    imgBox.style.width = count * bannerWidth + 'px';
    //找到每张图片的li元素
    for (var i = 0; i < lis.length; i++) {
        //将每个li的宽度设置为当前当前轮播图窗口大小
        lis[i].style.width = bannerWidth + 'px';
    }

    var index = 1
    //将图片偏移,使图片的第一张位置正确
    imgBox.style.left = -bannerWidth + "px";
    //当屏幕大小发生变化时,重新定义宽度
    window.onresize = function () {
        //获取当前的banner的宽度
        bannerWidth = banner.offsetWidth;
        //重新设置图片的总宽度
        imgBox.style.width = count * bannerWidth + "px";
        //遍历所有的li标签
        for (var i = 0; i < lis.length; i++) {
            //将每个Li标签重新设定宽度
            lis[i].style.width = bannerWidth + "px";
        }
        //重新设置偏移
        imgBox.style.left = -index * bannerWidth + "px";
        
    }
    //实现小点移动
    // --------------------------------------------------------------------
    bgCurrent(index)
    function bgCurrent(index){
    var circle = document.querySelector('.jd_bannerIndicator')
    console.log(circle)
    var bannerImg=document.querySelector('.jd_bannerImg').querySelectorAll('li')
    console.log(bannerImg)
    for (var i = 0; i < bannerImg.length-2; i++) {
        console.log(1)
        circle.innerHTML+='<li></li>'
        
    }
    // circle[index - 1].classList.add('current')

    // var setIndicator=function(index){
    //     var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
    //     /*先清除其它li元素的active样式*/
    //     for(var i=0;i<indicators.length;i++){
    //         indicators[i].classList.remove("active");
    //     }
    //     /*为当前li元素添加active样式*/
    //     indicators[index-1].classList.add("active");
    // }

    }
    // ----------------------------------------------------------------------
    //实现自动轮播
    //设置一个定时器
    var timeId;
    var startTime = function () {
        setTime = setInterval(function () {
            //索引++
            index++;
            // 添加过渡效果
            // console.log(index)
            imgBox.style.transition = 'left 0.5s';
            //设置偏移;
            imgBox.style.left = (-index * bannerWidth) + 'px';
            //判断是否到最后一张,如果是则
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    //关闭过渡效果
                    imgBox.style.transition = 'none'
                    // 偏移
                    imgBox.style.left = (-index * bannerWidth) + 'px';
                }
            }, 500)
        }, 1000);
        
    }
    startTime()
// ----------------------------------------------------------------------------
    //手动轮播图
    var clientX, pageX, disX
    imgBox.addEventListener('touchstart', function (e) {
        clearInterval(setTime)
        clientX = e.targetTouches[0].clientX
    })
    imgBox.addEventListener('touchmove', function (e) {

        pageX = e.targetTouches[0].pageX
        disX = pageX - clientX
        imgBox.style.transition = 'none';
        imgBox.style.left = (-index * bannerWidth + disX) + 'px';
    })

    imgBox.addEventListener('touchend', function (e) {
        // console.log('离开时' + disX)
        if (Math.abs(disX) > 100) {
            if (disX > 0) {
                index--;
            } else if (disX < 0) {
                index++;
            }
            imgBox.style.transition = 'left 0.5s';
            imgBox.style.left = (-index * bannerWidth) + 'px';
        } else if (Math.abs(disX) > 0 && Math.abs(disX) < 100) {
            imgBox.style.transition = 'left 0.5s';
            imgBox.style.left = (-index * bannerWidth) + 'px';
        }
        startTime()
        
        if (index == count - 1) {
            index = 1;
        } else if (index == 0) {
            index = count - 2;
        }

        
        setTimeout(function () {
            imgBox.style.transition = 'none'
            imgBox.style.left = (-index * bannerWidth) + 'px';
        }, 500)
        
    })
    
    
}