/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */

layui.define(function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        setter = layui.setter,
        view = layui.view,
        admin = layui.admin,
        ctxPath = localStorage.getItem("ctxPath");

    //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
    //……


    //退出
    admin.events.logout = function () {
        admin.exit(function () {
            location.href = ctxPath + '/logout';
        });

        location.href = ctxPath + '/logout';
        //执行退出接口
        /*admin.req({
            url: ctxPath + '/logout',
            type: 'get',
            data: {},
            done: function (res) {
                //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行
                //清空本地记录的 token，并跳转到登入页
                admin.exit(function () {
                    location.href = ctxPath;
                });
            }
        });*/
    };

    // Ajax session 过期全局设置
    $.ajaxSetup({
        complete: function (XMLHttpRequest, textStatus) {
            //ajax 请求 session 过期处理
            if (XMLHttpRequest.responseJSON.code) {
                if (XMLHttpRequest.responseJSON.code === 1001) {
                    // Session 失效，跳转登陆页
                    window.location.href = ctxPath + "/";
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });

    //对外暴露的接口
    exports('common', {});
});
