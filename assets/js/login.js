$(function () {
    // 登录和注册链接绑定事件
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    //自定义layui表单校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repass: function(value) {
            var pwd = $('.reg-box [name=password').val();
            if(value !== pwd) {
                return '两次密码不一致！'
            }
        }
    });
    // 监听表单注册的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
          username: $('#form_reg [name=username]').val(),
          password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
       layer.msg('注册成功，请登录！')
          // 模拟人的点击行为
          $('#link-login').click();
        })
      });
    // 监听表单注册的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.post('/api/login', $(this).serialize(), function(res) {
            if(res.status !==0) {
                return layer.msg('登陆失败！');
            }
            layer.msg('登陆成功！');
            // 添加到本地存储
            localStorage.setItem('token', res.token);
            // 跳转到---页面
            location.href = '/index.html';
        })
    })
})