$.ajaxPrefilter(function (options) {
    // 给有权限限制的接口，设置请求头，   首先判断当前的url是否有权限的限制
    // 方案1：利用字符串方法startsWith 查看options.url这个字符串是否以/my/开头
    if (options.url.startsWith('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    // 方案2：利用indexOf查看字符串里面是否有/my/，没有找到的返回值为负一
    /* if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    } */


    options.url = 'http://www.liulongbin.top:3007' + options.url


    // 方案3：制奇葩用户的访问方式，没有正常登录就无法访问到首页
    // 限制用户的访问权限
    /* options.complete = function (xhr) {
        /******** 判断响应的数据，来确定用户的登录状态 
        if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
            // 清除token
            localStorage.removeItem('token')
            // 强制跳转到后台登录页
            location.href = '/login.html'
        }
    } */
    options.complete = function (xhr) {
        if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
            // 清楚本地储存的token（就是用户的信息）
            localStorage.removeItem('token')
            // 强制跳转到后台登录页
            location.href = '/login.html'
        }
    }

})