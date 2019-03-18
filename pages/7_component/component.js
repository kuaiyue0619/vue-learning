Vue.component('my-component1', {
    // template: '<div>这里是组件的内容</div>',
    template: '<button @click="counter++">{{counter}}</button>',
    data: function () {
        return {
            counter: 0
        }
    }
});

Vue.component('my-component2', {
    props: ['message', 'warningText'],
    template: '<div>' +
        '<div>message: {{message}} warningText: {{warningText}}</div>' +
        '</div>'
});

Vue.component('my-component3', {
    props: ['message'],
    template: '<div>message: {{message}}</div>'
});

Vue.component('my-component4', {
    props: ['message'],
    template: '<div>message: {{message}} message.length: {{message.length}}</div>'
});

Vue.component('my-component5', {
    props: ['initCount'],
    template: '<div>count: {{count}}</div>',
    data: function () {
        return {
            count: this.initCount
        }
    }
});

Vue.component('my-component6', {
    props: ['width'],
    template: '<div :style="style">组件内容</div>',
    // data: function () {
    //     return {
    //         style: {width: this.width + 'px'}
    //     }
    // },
    computed: {
        style: function () {
            return {width: this.width + 'px'}
        }
    }
});

Vue.component('my-component7', {
    props: {
        propA: Number,
        propB: [String, Number],
        propC: {
            type: Boolean,
            default: true
        },
        propD: {
            type: Number,
            required: true
        },
        propE: {
            type: Array,
            default: function () {
                return [];
            }
        },
        propF: {
            validator: function (value) {
                return value > 10;
            }
        }
    },
    template: '<div>propA: {{propA}} propB: {{propB}} propC: {{propC}} propD: {{propD}} ' +
        'propE: {{propE}} propF: {{propF}}</div>'
});

Vue.component('my-component8', {
    template: '<span>' +
        '<button @click="handleIncrease">+1</button>' +
        '<button @click="handleReduce">-1</button>' +
        '</span>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        handleIncrease: function () {
            this.counter++;
            this.$emit('increase', this.counter);
        },
        handleReduce: function () {
            this.counter--;
            this.$emit('reduce', this.counter);
        }
    }
});

Vue.component('my-component9', {
    props: ['value'],
    template: '<span>' +
        '<button @click="handleClick">+1</button>' +
        '<input :value="value" @input="updateValue">' +
        '</span>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        handleClick: function () {
            this.counter++;
            this.$emit('input', this.counter);
        },
        updateValue: function (event) {
            this.$emit('input', event.target.value);
        }
    }
});

var bus = new Vue();

Vue.component('component-a', {
    template: '<span>' +
        '<button @click="handleEvent">传递事件</button>' +
        '<button @click="handleEvent2">通过父链直接修改数据</button>' +
        '</span>',
    data: function () {
        return {
            message: '子组件内容'
        }
    },
    methods: {
        handleEvent: function () {
            bus.$emit('on-message', '来自组件component-a的内容');
        },
        handleEvent2: function () {
            // 不建议直接修改父组件的数据,否则父子组件紧耦合
            this.$parent.message = '来自组件component-a的内容2';
        }
    }
});

Vue.component('my-component10', {
    template: '\
    <div class="container">\
        <div class="header">\
            <slot name="header"></slot>\
        </div>\
        <div class="main">\
            <slot></slot>\
        </div>\
        <div class="footer">\
            <slot name="footer"></slot>\
        </div>\
    </div>',
    mounted: function () {
        var header = this.$slots.header;
        console.log(header);
        var main = this.$slots.default;
        console.log(main);
        var footer = this.$slots.footer;
        console.log(footer);
        console.log(footer[0].elm.innerHTML);
    }
});

Vue.component('my-component11', {
    template: '<div class="container">' +
        '<slot msg="来自子组件的内容"></slot>' +
        '</div>'
});

Vue.component('my-list', {
    props: {
        books: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    template: '<ul>' +
        '<slot name="book" v-for="book in books" :book-name="book.name"></slot>' +
        '</ul>'
});

var app = new Vue({
    el: '#app',
    data: {
        parentMessage: '',
        total: 0,
        total2: 0,
        message: '',
        divRef: '',
        componentRef: '',
        books: [
            {name: 'Vue.js实战'},
            {name: 'JavaScript语言精粹'},
            {name: 'JavaScript高级程序设计'}
        ]
    },
    mounted: function () {
        var _this = this;
        bus.$on('on-message', function (msg) {
            _this.message = msg;
        });
    },
    methods: {
        handleGetTotal: function (total) {
            this.total = total;
        },
        handleClick: function () {
            alert('单击事件')
        },
        handleReduce: function () {
            this.total2--;
        },
        handleRef: function () {
            this.message = this.$refs.comA.message;
        },
        printRef: function () {
            this.divRef = this.$refs.d;
            console.log(this.$refs.d);
            this.componentRef = this.$refs.comA.message;
            console.log(this.$refs.comA);
        }
    }
    /*components: {
        'my-component': {
            template: '<div>局部注册组件的内容</div>'
        }
    }*/
});