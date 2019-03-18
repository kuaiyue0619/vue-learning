Vue.directive('focus', {
    inserted: function (el) {
        // 聚焦元素
        el.focus();
    }
});

Vue.directive('test', {
    bind: function (el, binding, vnode) {
        var keys = [];
        for (var i in vnode) {
            keys.push(i)
        }
        el.innerHTML =
            'name: ' + binding.name + '<br>' +
            'value: ' + binding.value + '<br>' +
            'expression: ' + binding.expression + '<br>' +
            'arg: ' + binding.arg + '<br>' +
            'modifiers: ' + JSON.stringify(binding.modifiers) + '<br>' +
            'vnode keys: ' + keys.join(', ');

    }
});

Vue.directive('test2', {
    bind: function (el, binding, vnode) {
        console.log(binding.value.msg);
        console.log(binding.value.name);
    }
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'some text',
        show: false,
        timeNow: (new Date()).getTime(),
        timeBefore: 1488930695721
    },
    computed: {
        birthday: function () {
            var date = new Date();
            date.setFullYear(1992, 6, 19);
            return date;
        }
    },
    methods: {
        handleClose: function () {
            this.show = false;
        }
    }
});
