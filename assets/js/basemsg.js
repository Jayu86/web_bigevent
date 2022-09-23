$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if(value < 6 ) {
                return '昵称必须在 1~6 个字符之间'
            }
        }
    });

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0 ) {
                    layui.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    });

    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('提交失败！');
                }
                layer.msg('更新用户信息成功！');
                window.parent.getUserInfo();
            }
        })
    })
})

