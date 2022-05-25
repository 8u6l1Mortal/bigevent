
$(function () {
    // 使用ajax的预处理函数------------------------------，
    /* $.ajaxPrefilter() 它是ajax的预处理函数，
            【1】ajax的所有参数都是基于ajaxPrefilter里面这些配置项去实现的。
            【2】它可以在ajax发送请求之前就可以对ajax进行添加或者修改配置项
            【3】语法：jQuery.ajaxPrefilter(funciton(option){
                option:是请求的选项
            })
             
            参考：https://www.jquery123.com/jQuery.ajaxPrefilter/
        */

    // $.ajaxPrefilter(function (options) {
    //     options.url = 'http://www.liulongbin.top:3007' + options.url
    // })


    // alert('登录页面测试代码')

    // 根据框架去自定义表单的校验规则
    layui.form.verify({
        //规则名：规则自定义 正则表达式为：输入值必须是6~12位之间
        pwd: [
            /^\S{6,12}$/,
            '密码必须是6-12位的非空字符!'
        ],
        // 表单验证规则是支持函数
        repwd: function (value, item) {
            const pwd = $("#form_reg [name=password]").val().trim()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    /* 功能一：需求，点击去登录显示登录表单，点击注册显示注册表单
            1. 找到登录界面的盒子里面的去注册，添加点击事件，只要点击了
            2. 登录盒子就隐藏，注册盒子就显示
            3. 注册界面的盒子同理，一样的事件步骤
    */
    // 去注册
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    // 去登录
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    /*  功能二：注册用户表单的功能  使用表单收集+ajax提交
            1.给表单注册sumbit事件
            2.阻止表单的默认行为
            3.收集三个输入框里的内容
            4.使用ajax上传数据
            对象(data)和方法(success)都使用了简写
            5.success:0为成功 1为失败做判断
            6.完善注册成功的操作:返回值是使用了框架里的弹窗
                layui.layer.msg(res.message, { icon: 5/6 })
                弹出注册结果 和 字体图标 5为苦脸，6为笑脸
        */
    $("#form_reg").on('submit', function (e) {
        e.preventDefault()
        // console.log('asd');

        // const username = $("#form_reg [name=username]").val().trim()
        // const password = $("#form_reg [name=password]").val().trim()
        // const repassword = $("#form_reg [name=repassword]").val().trim()
        const datas = $(this).serialize()

        // if (username.length <= 0 || password.length <= 0 || repassword.length <= 0) {
        //     return alert("输入框内容不可以为空")
        // }

        $.ajax({
            method: 'post',
            // url: 'http://www.liulongbin.top:3007/api/reguser',
            url: '/api/reguser',
            // data: {
            //     // username,
            //     // password,
            // },
            data: datas,
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })
                $("#link_login").click()
            }
        })
    })


    /*  功能三：登录功能
        关于form表单加ajax一套组合拳
            1.注册submit事件
            2.阻止form表面默认行为
             【1】跳转的url是我在form标签中action属性定义的url，自动跳转，用户体验差
             【2】表单中会自动注册回车提交事件
             【3】当未指名form action 属性和button type类型，会先触发自定义按钮事件然后表单请求事件（表单又重新刷新了一遍）
            3.收集表单数据
            4.校验数据的内容（自己判断是否需要这一步）
            5.发送请求
            6.判断是否请求成功，失败或者成功都有提示，最后location.href跳转
            优化：由于考虑到实际工作中，url的根地址会随时被后台改变，方便我们自己也更改
     */

    $("#form_login").submit(function (e) {
        e.preventDefault()
        const data = $(this).serialize()

        $.ajax({
            method: 'post',
            url: '/api/login',
            data,
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function () {
                    //将登录成功后的token数据，保存到本地储存内
                    localStorage.setItem('token', res.token)
                    location.href = 'index.html'
                })
            }
        })
    })


})