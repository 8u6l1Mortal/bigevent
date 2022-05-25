$(function () {
    // console.log(localStorage.getItem('token'));
    /*
    功能一：获取用户信息
     */
    getuserinfo()

    function getuserinfo() {
        //调接口，需要请求头
        $.ajax({
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success(res) {
                // console.log(res);
                // 判断获取用户信息是否成功 + 提示信息
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 渲染的封装函数,传入data data里面装的是用户的信息
                renderavater(res.data)
            },
            /* 需求分析：限制奇葩用户的访问方式，没有正常登录就无法访问到首页
            方案：判断用户是否处于登录状态，判断AJAX请求的返回值
            complete:是ajax请求完成后，不管请求是否成功，都一定会执行的函数*/

            /* complete: function (xhr) {
                /* 请求完成后，调用此函数
                console.log('ok')
                console.log(xhr) ajax对象
                console.log(xhr.responseText) 服务器响应回来的数据（json字符串）
                console.log(xhr.responseJSON) 把响应的数据转成了对象
                ----------判断响应的数据，来确定用户的登录状态 
                if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                    清楚本地储存的token（就是用户的信息）
                    localStorage.removeItem('token')
                    强制跳转到后台登录页
                    location.href = '/login.html'
                }
            } */
        })
    }
    // 渲染 欢迎语和头像
    function renderavater(user) {
        console.log(user);
        // 短路预算的判断：有nickname就用nickname，没有就用username   最后渲染到页面上
        let name = user.nickname || user.username
        $("#welcome").html('欢迎: ' + name)
        // 判断返回的信息中用户是否有
        if (user.user_pic) {
            $(".text-avatar").hide()
            $(".layui-nav-img").prop('src', user.user_pic)
        } else {
            $(".layui-nav-img").hide()
            const first = name[0].toUpperCase()
            $(".text-avatar").html(first)
        }
    }

    //功能二： 退出登录功能
    // 知识点：弹出来的询问框：confirm(询问内容)，可以用一个变量接收返回值，点击确定返回true，点击取消返回flase，可以通过这个去实现我们需要的擦偶哦
    // layui.layer.confirm 是框架提供的 比较好看的询问框
    $("#logout").on("click", function () {
        // biu的询问框
        layui.layer.confirm('您确定要退出吗？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 清除token
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href = '/login.html'

            layui.layer.close(index);
        });
    })



})