Vue.component('vInput', {
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    /*render: function (h) {
        var _this = this;
        return h('div', [
            h('span', '昵称：'),
            h('input', {
                attrs: {
                    type: 'text'
                },
                domProps: {
                    value: this.value
                },
                on: {
                    input: function (e) {
                        _this.value = e.target.value;
                        _this.$emit('input', e.target.value);
                    }
                }
            })
        ]);
    }*/
    template: '\
    <div>\
        <span>昵称：</span>\
        <input type="text" :value="value" @input="input">\
    </div>',
    methods: {
        input: function (e) {
            this.value = e.target.value;
            this.$emit('input', e.target.value);
        }
    }
});

Vue.component('vTextarea', {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    /*render: function (h) {
        var _this = this;
        return h('div', [
            h('span', '留言内容：'),
            h('textarea', {
                attrs: {
                    placeholder: '请输入留言内容'
                },
                domProps: {
                    value: this.value
                },
                ref: 'message',
                on: {
                    input: function (e) {
                        _this.value = e.target.value;
                        _this.$emit('input', e.target.value);
                    }
                }
            }, _this.value)
        ]);
    },*/
    template: '\
    <div>\
        <span>留言内容：</span>\
        <textarea placeholder="请输入留言内容" :value="value" ref="message" @input="input"></textarea>\
    </div>',
    methods: {
        focus: function () {
            this.$refs.message.focus();
        },
        input: function (e) {
            this.value = e.target.value;
            this.$emit('input', e.target.value);
        }
    }
});
