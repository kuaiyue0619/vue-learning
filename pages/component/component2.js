Vue.component('child-component', {
    name: 'child-component',
    props: {
        count: {
            type: Number,
            default: 1
        }
    },
    template: '<div class="child">{{count}}' +
        '<child-component :count="count + 1" v-if="count < 3"></child-component>' +
        '</div>'
});

Vue.component('child-component2', {
    data: function () {
        return {
            msg: '在子组件声明的数据'
        }
    }
});

var Home = {
    template: '<div>Welcome home!</div>'
};

Vue.component('child-component3', function (resolve, reject) {
    window.setTimeout(function () {
        resolve({
            template: '<div>我是异步渲染的</div>'
        });
    }, 2000);
});

Vue.component('my-component', {
    template: '#my-component'
});

var MyComponent = Vue.extend({
    template: '<div>Hello: {{name}}</div>',
    data: function () {
        return {
            name: 'Aresn'
        }
    }
});

new MyComponent().$mount('#mount-div');

var app = new Vue({
    el: '#app',
    components: {
        comA: {
            template: '<div>组件A</div>'
        },
        comB: {
            template: '<div>组件B</div>'
        },
        comC: {
            template: '<div>组件C</div>'
        }
    },
    data: {
        message: '在父组件声明的数据',
        currentView: 'comA',
        showDiv: false,
        divText: ''
    },
    methods: {
        handleChangeView: function (component) {
            if (component === 'HOME') {
                this.currentView = Home;
                return;
            }
            this.currentView = 'com' + component;
        },
        getText: function () {
            this.showDiv = true;
            // 此时div未被创建,报错
            // this.divText = document.getElementById('div').innerHTML;
            this.$nextTick(function () {
                this.divText = document.getElementById('div').innerHTML;
            })
        }
    }
});