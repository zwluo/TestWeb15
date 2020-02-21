// 引入该JS必须先引入JQuery
$(document).ready(function () {
    var ctxPath = localStorage.getItem("ctxPath");
    $.ajaxSetup({
        complete: function (XMLHttpRequest, textStatus) {
            //ajax 请求 session 过期处理
            if (XMLHttpRequest.responseJSON.code) {
                if (XMLHttpRequest.responseJSON.code === 1001) {
                    // Session 失效，跳转登陆页
                    window.location.href = ctxPath + "/";
                }
            }
        }
    });
});