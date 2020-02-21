layui.define(['form', 'table', 'laydate'], function (exports) {
    // 声明变量
    var $ = layui.$,
        // Context Path
        ctxPath = localStorage.getItem("ctxPath"),
        // Table
        table = layui.table,
        // Form
        form = layui.form,
        // LayDate
        laydate = layui.laydate;

    // 自定义方法
    var oversizeOrder = {
        initDate: function (lang) {
            laydate.render({
                elem: '#createTime',
                range: '~',
                type: 'datetime',
                format: 'yyyy-MM-dd HH:mm:ss',
                lang: lang
            });
            laydate.render({
                elem: '#processTime',
                range: '~',
                type: 'datetime',
                format: 'yyyy-MM-dd HH:mm:ss',
                lang: lang
            });
        },
        loadTable: function (field) {
            // 加载表格
            table.render({
                elem: '#oversize-order-table',
                url: ctxPath + "/order/oversizeOrder/list",
                method: 'GET',
                where: field,
                parseData: function (res) {
                    return {
                        // 解析接口状态
                        "code": res.status,
                        // 解析提示文本
                        "msg": res.message,
                        // 解析数据长度
                        "count": res.total,
                        // 解析数据列表
                        "data": res.data
                    }
                },
                cols: [[
                    {type: 'checkbox', fixed: 'left'},
                    {field: 'headerId', title: 'ID', hide: true},
                    {field: 'country', title: '国别', sort: true, width: 115},
                    {field: 'salesOrderId', title: '销售订单号', width: 172},
                    {field: 'createTime', title: '订单导入日期'},
                    {field: 'ltlProcessTime', title: '订单处理日期'},
                    {field: 'nickNumber', title: '昵称（编号）'},
                    {field: 'itemCodes', title: 'Item Code', templet: '#itemCodeTpl'},
                    {field: 'orderStatus', title: '订单状态', sort: true, width: 100},
                    {
                        field: 'ltlProcessStatus',
                        title: '详情',
                        align: 'center',
                        templet: '#oversizeButtonTpl',
                        minWidth: 180,
                        fixed: 'right'
                    }
                ]],
                page: true,
                limit: 30,
                height: 'full-185',
                // width: '550px',
                text: '对不起，加载出现异常',
                toolbar: '#oversizeOrderToolBar',
                done: function (res, curr, count) {
                    for (var i = 0; i < res.data.length; i++) {
                        var state = res.data[i].ltlProcessStatus;
                        // 已处理的数据禁用复选框
                        if (state) {
                            var index = res.data[i]['LAY_TABLE_INDEX'];
                            $(".layui-table tr[data-index=" + index + "] input[type='checkbox']").prop('disabled', true);
                            $(".layui-table tr[data-index=" + index + "] input[type='checkbox']").next().addClass('layui-btn-disabled');
                            $('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('name', 'caib');
                        }
                    }
                },
                defaultToolbar: ['']
            });
        }
    };

    //头工具栏事件
    table.on('toolbar(oversizeOrderTable)', function (obj) {
        // 获取选中的元素
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            // 确认订单
            case 'confirmOrder': {
                var data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请至少选择一个订单!');
                    return;
                }
                // 获取选中数据的headerId
                var headerIds = [];
                for (let d of data) {
                    headerIds.push(d.headerId);
                }
                // 调用Ajax
                $.ajax({
                    url: ctxPath + '/order/oversizeOrder/sure',
                    data: JSON.stringify(headerIds),
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (result) {
                        if (result) {
                            if (result.code == 200) {
                                // 修改成功
                                layer.open({
                                    type: 1,
                                    offset: 'auto',
                                    content: '<div style="padding: 20px 100px;">' + result.msg + '</div>',
                                    btn: '关闭',
                                    btnAlign: 'c',
                                    shade: 0.4,
                                    yes: function () {
                                        // 触发查询点击按钮
                                        $("#oversize-query-btn").click();
                                        layer.closeAll();
                                    }
                                });
                            } else {
                                // 修改失败
                                layer.open({
                                    type: 1,
                                    offset: 'auto',
                                    content: '<div style="padding: 20px 100px;">' + '保存失败，请联系IT！' + '</div>',
                                    btn: '关闭',
                                    btnAlign: 'c',
                                    shade: 0.4,
                                    yes: function () {
                                        // 触发查询点击按钮
                                        $("#oversize-query-btn").click();
                                        layer.closeAll();
                                    }
                                });
                            }
                        }
                    }
                });
                break;
            }
            // 取消订单
            case 'cancelledOrder': {
                var data = checkStatus.data;
                if (data.length == 0) {
                    layer.msg('请至少选择一个订单!');
                    return;
                }
                // 获取选中数据的headerId
                var headerIds = [];
                for (let d of data) {
                    headerIds.push(d.headerId);
                }
                // 调用Ajax
                $.ajax({
                    url: ctxPath + '/order/oversizeOrder/cancel',
                    data: JSON.stringify(headerIds),
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (result) {
                        if (result) {
                            if (result.code == 200) {
                                // 修改成功
                                layer.open({
                                    type: 1,
                                    offset: 'auto',
                                    content: '<div style="padding: 20px 100px;">' + result.msg + '</div>',
                                    btn: '关闭',
                                    btnAlign: 'c',
                                    shade: 0.4,
                                    yes: function () {
                                        // 触发查询点击按钮
                                        $("#oversize-query-btn").click();
                                        layer.closeAll();
                                    }
                                });
                            } else {
                                // 修改失败
                                layer.open({
                                    type: 1,
                                    offset: 'auto',
                                    content: '<div style="padding: 20px 100px;">' + '保存失败，请联系IT！' + '</div>',
                                    btn: '关闭',
                                    btnAlign: 'c',
                                    shade: 0.4,
                                    yes: function () {
                                        // 触发查询点击按钮
                                        $("#oversize-query-btn").click();
                                        layer.closeAll();
                                    }
                                });
                            }
                        }
                    }
                });
                break;
            }
        }
    });

    // 监听工具条
    table.on('tool(oversizeOrderTable)', function (obj) {
        var data = obj.data;
        if (obj.event === 'view') {
            // 查看订单
            layer.open({
                type: 2,
                title: '查看订单：' + data.salesOrderId + '<span class="pull-right">状态：' + data.orderStatus + '</span>',
                content: ctxPath + '/order/oversizeOrder/form?view=true&headerId=' + data.headerId,
                area: ['650px', '590px'],
                closeBtn: 0,
                maxmin: false,
                skin: 'viewAndEditTitle',
                shadeClose: true,
                btn: ['返回'],
                btnAlign: 'c',
                btn1: function (index, layero) {
                    // 关闭弹出层
                    layer.close(index);
                }
            });
            console.log("查看订单");
        } else if (obj.event === 'edit') {
            // 编辑订单
            layer.open({
                type: 2,
                title: '查看订单：' + data.salesOrderId + '<span class="pull-right">状态：' + data.orderStatus + '</span>',
                content: ctxPath + '/order/oversizeOrder/form?headerId=' + data.headerId,
                area: ['650px', '590px'],
                closeBtn: 0,
                maxmin: false,
                skin: 'viewAndEditTitle',
                shadeClose: true,
                btn: ['返回', '保存'],
                btnAlign: 'c',
                btn1: function (index, layero) {
                    // 关闭弹出层
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    // 获取iframe里面的form元素
                    var detailForm = layero.find('iframe').contents().find("#details-form-table");
                    var formData = $(detailForm[0]).serializeArray();
                    var submitData = {};
                    if (formData) {
                        for (var i = 0; i < formData.length; i++) {
                            submitData[formData[i].name] = formData[i].value;
                        }
                    }
                    submitData['headerId'] = data.headerId;
                    // 提交修改数据
                    $.ajax({
                        url: ctxPath + '/order/oversizeOrder/salesOrderShip',
                        data: submitData,
                        type: 'PUT',
                        dataType: 'json',
                        success: function (result) {
                            if (result) {
                                if (result.code == 200) {
                                    // 修改成功
                                    layer.open({
                                        type: 1,
                                        offset: 'auto',
                                        content: '<div style="padding: 20px 100px;">' + result.msg + '</div>',
                                        btn: '关闭',
                                        btnAlign: 'c',
                                        shade: 0.4,
                                        yes: function () {
                                            layer.closeAll();
                                        }
                                    });
                                } else {
                                    // 修改失败
                                    layer.open({
                                        type: 1,
                                        offset: 'auto',
                                        content: '<div style="padding: 20px 100px;">' + '保存失败，请联系IT！' + '</div>',
                                        btn: '关闭',
                                        btnAlign: 'c',
                                        shade: 0.4,
                                        yes: function () {
                                            layer.closeAll();
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        }
    });

    //监听搜索
    form.on('submit(oversize-order-search)', function (data) {
        var field = data.field;
        console.log(field);
        //执行重载
        oversizeOrder.loadTable(field);
    });

    // 监听复选框（是否选中未处理状态）
    form.on('checkbox(not-process)', function (data) {
        var arr = [];
        $("input:checkbox[class='ch-query']:checked").each(function (i) {
            arr[i] = $(this).val();
        });
        if (arr.length > 1) {
            // 选中了两个以上元素
            if (arr.indexOf("1") > -1) {
                // 选中了已处理
                // 取消订单状态禁用
                $("#orderStatus").removeAttr("disabled");
                // 取消处理日期禁用
                $("#processTime").removeAttr("disabled");
                // 订单状态重置
                $("#orderStatus").val("");
            }
        } else {
            // 选中了一个元素
            if (arr.indexOf("2") > -1) {
                // 选中了未处理
                // 清空处理日期
                $("#processTime").val("");
                // 订单状态选择LTL Check
                $("#orderStatus").val("64");
                // 禁用处理日期
                $("#processTime").attr("disabled", "disabled");
                // 禁用订单状态
                $("#orderStatus").attr("disabled", "disabled");
            } else {
                // 取消订单状态禁用
                $("#orderStatus").removeAttr("disabled");
                // 取消处理日期禁用
                $("#processTime").removeAttr("disabled");
                // 订单状态重置
                $("#orderStatus").val("");
            }
        }
        // 重新加载
        form.render(null, 'query-form');
    });
    // 初始加载表格数据
    $("#oversize-query-btn").click();
    // 输出purchaseOrder模块
    exports('oversizeOrder', oversizeOrder);
});