layui.define(function (exports) {
    var obj = {
        hello: function (str) {
            alert('Hello' + (str || 'mymod'))
        },
        say: function (str) {
            console.log("123" + str);
        }

    };

    exports('mymod', obj);
});