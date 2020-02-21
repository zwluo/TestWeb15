// 使用layui内置模块（layui下拉选要加载form模块）
// layui.use(['form', 'table'], function () {
//
// });
// 定义User模块
layui.define(['form', 'table'], function (exports) {
    var $ = layui.$,
        table = layui.table,
        form = layui.form,
        ctxPath = localStorage.getItem("ctxPath");
    var obj = {
        hello: function () {
            console.log("User Model");
        }
    };
    // 用户管理
    table.render({
        elem: '#userTable',
        url: ctxPath + '/user/list',
        method: 'POST',
        where: {
            // 接口其他参数
        },
        parseData: function(res){ //res 即为原始返回的数据
            return {
                "code": res.status, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.data //解析数据列表
            }
        },
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'number', width: 80, title: '序号'},
            {field: 'id', width: 80, title: 'id', hide: true},
            {field: 'loginName', title: '登录名', width: 80},
            {field: 'username', title: '用户名', width: 80},
            {field: 'status', title: '账号状态', width: 80, sort: true},
            {field: 'loginLimit', title: '登陆限制', width: 30, sort: true},
            {field: 'expirationTime', title: '过期时间', width: 80, sort: true},
            {field: 'email', title: '邮箱'},
            {field: 'mobilePhone', title: '手机号码'},
            {field: 'tel', title: '电话号码'},
            {field: 'memo', title: '备注'},
            {field: 'createUserName', title: '创建者'},
            {field: 'createTime', title: '创建时间'},
            {field: 'updateUserName', title: '修改者'},
            {field: 'updateTime', title: '修改时间'}
        ]],
        page: true,
        limit: 30,
        height: 'full-220',
        width: '550px',
        text: '对不起，加载出现异常'
    });
    // 输出user模块
    exports('user', obj);
});