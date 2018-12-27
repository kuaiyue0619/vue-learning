var app = new Vue({
        el: '#app',
        data: {
            list: [
                {
                    id: 1,
                    name: 'iPhone',
                    price: 8000,
                    count: 1,
                    checked: false
                },
                {
                    id: 2,
                    name: 'iPad',
                    price: 10000,
                    count: 1,
                    checked: false
                },
                {
                    id: 3,
                    name: 'Mac',
                    price: 21000,
                    count: 1,
                    checked: false
                }
            ]
        },
        computed: {
            totalPrice: function () {
                var total = 0;
                for (var i in this.list) {
                    var item = this.list[i];
                    if (item.checked) {
                        total += item.price * item.count;
                    }
                }
                return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
            }
        },
        methods: {
            checked: function (i) {
                this.list[i].checked = !this.list[i].checked;
            },
            checkedAll: function (e) {
                var checked = e.target.checked;
                for (var i in this.list) {
                    this.list[i].checked = checked;
                }
            },
            reduce: function (i) {
                if (this.list[i].count === 1) return;
                this.list[i].count--;
            },
            add: function (i) {
                this.list[i].count++;
            },
            remove: function (i) {
                this.list.splice(i, 1);
            }
        }
    })
;
