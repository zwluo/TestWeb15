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
    var purchaseOrder = {
        sayHello: function () {
            console.log("purchase_order model");
        },
        initDate: function (lang) {
            laydate.render({
                elem: '#orderDate',
                range: '~',
                type: 'datetime',
                format: 'yyyy-MM-dd HH:mm:ss',
                lang: lang
            });
        },
        loadTable: function (field) {
            // 加载表格
            table.render({
                elem: '#purchase-order-table',
                url: ctxPath + "/purchaseOrder/list",
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
                    {field: 'orderId', title: '采购单号', sort: true, width: 100},
                    {field: 'itemCode', title: 'Item Code', width: 100},
                    {field: 'quantity', title: '采购数量', width: 100},
                    {field: 'finalPrice', title: '采购单价', width: 120},
                    {field: 'serviceFee', title: '服务费', width: 90},
                    {field: 'subTotal', title: '订单金额', sort: true, width: 100},
                    {field: 'paymentMethod', title: '支付方式', sort: true, width: 100},
                    {field: 'poundage', title: '手续费', width: 90},
                    {field: 'orderDate', title: '采购日期', width: 100},
                    {field: 'orderStatus', title: '订单状态', width: 100},
                    {field: 'b2bStoreName', title: 'B2B店铺名', sort: true, width: 110},
                    {field: 'osjStoreName', title: '在库-大建云店铺名', sort: true, width: 160},
                    {field: 'country', title: '国别', sort: true, width: 90}
                ]],
                page: true,
                limit: 30,
                height: 'full-185',
                // width: '550px',
                text: '对不起，加载出现异常',
                toolbar: true,
                defaultToolbar: ['print', 'exports']
            });
        }
    };

    purchaseOrder.loadTable({});

    //监听搜索
    form.on('submit(purchase-order-search)', function (data) {
        var field = data.field;
        console.log(field);
        //执行重载
        purchaseOrder.loadTable(field);
    });

    // 输出purchaseOrder模块
    exports('purchaseOrder', purchaseOrder);
});