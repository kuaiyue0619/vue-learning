Vue.component('list', {
    props: {
        list: {
            Array,
            default: function () {
                return [];
            }
        }
    },
    /*render: function (h) {
        var _this = this;
        var list = [];
        this.list.forEach(function (msg, index) {
            var node = h('div', {
                attrs: {
                    class: 'list-item'
                }
            }, [
                h('span', msg.name + '：'),
                h('div', {
                    attrs: {
                        class: 'list-msg'
                    }
                }, [
                    h('p', msg.message),
                    h('a', {
                        attrs: {
                            class: 'list-reply'
                        },
                        on: {
                            click: function () {
                                _this.handleReply(index);
                            }
                        }
                    }, '回复'),
                    h('a', {
                        attrs: {
                            class: 'list-del'
                        },
                        on: {
                            click: function () {
                                _this.handleDel(index);
                            }
                        }
                    }, '删除')
                ])
            ]);
            list.push(node);
        });
        if (!this.list.length) {
            return h('div', {
                attrs: {
                    class: 'list-nothing'
                }
            }, '留言列表为空');
        }
        return h('div', {
            attrs: {
                class: 'list'
            }
        }, list);
    },*/
    template: '\
    <div>\
        <div class="list">\
            <div class="list-item" v-for="(item, i) in list">\
                <span>{{item.name}}：</span>\
                <div class="list-msg">\
                    <p>{{item.message}}</p>\
                    <a class="list-reply" @click="handleReply(i)">回复</a>\
                    <a class="list-del" @click="handleDel(i)">删除</a>\
                </div>\
            </div>\
        </div>\
        <div v-if="!list.length" class="list-nothing">留言列表为空</div>\
    </div>',
    methods: {
        handleReply: function (index) {
            this.$emit('reply', index);
        },
        handleDel: function (index) {
            this.$emit('del', index);
        }
    }
});
