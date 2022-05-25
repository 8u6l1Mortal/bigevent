$(function () {
    // let aa = confirm('asa')
    // console.log(aa);

    /* 需求：用户信息先展示到页面，然后让用户自定义去更改，最后提交给服务器
        步骤：1）获取用户的信息
             2）把用户的信息展示到页面的表单内
             3）把用户修改后的内容，提交给服务器
     */

    inituserinfo()

    function inituserinfo() {
        $.ajax({
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.massage, { icon: 5 })
                }
                // 获取成功，展示内容 ，使用框架layui里面表单的一次性赋值内容的功能
                //layui.form.val('在html中指定的表单', 对象，传入的值是获取到的之前用户的值，这个值的来源是其实还是一开始用户注册时输入的值，是一个逆向的过程)
                layui.form.val('formUserInfo', res.data)
            }
        })
    }

    // 表单数据的校验
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1-6个字符内'
            }
        }
    })

    // 将用户修改后的名称 昵称 邮箱提交出去
    $("form").on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        // console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data,
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })
                inituserinfo()
            }
        })
    })

    // 重置功能 -- 阻止重置按钮的默认行为
    $("#btnReset").on('click', function (e) {
        e.preventDefault()
        inituserinfo()
    })
})