(function () {
  getUserInfo()
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success: function (res) {
      renderAvatar(res.data)
    },

    complete: function (res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }
  })
}

// 渲染用户的头像
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide()
  } else {
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show();
    $('.layui-nav-img').hide()
  }
}


// 退出
$('#btnLogout').on('click', function () {
  layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
    //do something
    localStorage.removeItem('token');
    location.href = '/login.html'
    layer.close(index);
  });

})