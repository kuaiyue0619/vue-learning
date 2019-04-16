Vue.component('vTable', {
    props: {
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    methods: {
        makeColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                // 添加一个字段标识当前列排序的状态,后续使用
                col._sortType = 'normal';
                // 添加一个字段标识当前列在数组中的索引,后续使用
                col._index = index;
                return col;
            });
        },
        makeData: function () {
            this.currentData = this.data.map(function (row, index) {
                // 添加一个字段标识当前行在数组中的索引,后续使用
                row._index = index;
                return row;
            });
        },
        clearSort: function () {
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
        },
        handleSort: function (index, sortType) {
            // console.log('handleSort:', index, sortType);
            this.clearSort();
            var key = this.currentColumns[index].key;
            this.currentColumns[index]._sortType = sortType;
            this.currentData.sort(function (a, b) {
                if (sortType === 'asc') {
                    return a[key] > b[key] ? 1 : -1;
                } else if (sortType === 'desc') {
                    return a[key] < b[key] ? 1 : -1;
                }
            });
        }
    },
    mounted() {
        // v-table初始化时调用
        this.makeColumns();
        this.makeData();
    },
    template: '\
    <table>\
        <colgroup>\
            <col v-for="col in currentColumns" :style="{width:(col.width+\'px\')}"></col>\
        </colgroup>\
        <thead>\
        <tr>\
            <th v-for="(col, i) in currentColumns">\
                <span>{{col.title}}</span>\
                <a v-if="col.sortable" :class="col._sortType === \'asc\' ? \'on\' : \'\'"\
                   @click="handleSort(i, \'asc\')" >↑</a>\
                <a v-if="col.sortable" :class="col._sortType === \'desc\' ? \'on\' : \'\'"\
                   @click="handleSort(i, \'desc\')">↓</a>\
            </th>\
        </tr>\
        </thead>\
        <tbody>\
            <tr v-for="row in currentData">\
                <td v-for="cell in currentColumns">{{row[cell.key]}}</td>\
            </tr>\
        </tbody>\
    </table>',
    // render: function (h) {
    //     var _this = this;
    //     var cols = [];
    //     this.currentColumns.forEach(function (col, index) {
    //         cols.push(h('col', {
    //             style: {
    //                 width: col.width + 'px'
    //             }
    //         }));
    //     });
    //     var ths = [];
    //     this.currentColumns.forEach(function (col, index) {
    //         if (!col.sortable) {
    //             ths.push(h('th', col.title));
    //             return;
    //         }
    //         ths.push(h('th', [
    //             h('span', col.title),
    //             // 升序
    //             h('a', {
    //                 class: {
    //                     on: col._sortType === 'asc'
    //                 },
    //                 on: {
    //                     click: function () {
    //                         _this.handleSort(index, 'asc');
    //                     }
    //                 }
    //             }, '↑'),
    //             // 降序
    //             h('a', {
    //                 class: {
    //                     on: col._sortType === 'desc'
    //                 },
    //                 on: {
    //                     click: function () {
    //                         _this.handleSort(index, 'desc');
    //                     }
    //                 }
    //             }, '↓')
    //         ]))
    //     });
    //     var trs = [];
    //     this.currentData.forEach(function (row) {
    //         var tds = [];
    //         _this.currentColumns.forEach(function (cell) {
    //             tds.push(h('td', row[cell.key]));
    //         });
    //         trs.push(h('tr', tds));
    //     });
    //     return h('table', [
    //         h('colgroup', cols),
    //         h('thead', [
    //             h('tr', ths)
    //         ]),
    //         h('tbody', trs)
    //     ]);
    // },
    watch: {
        data: function () {
            this.makeData();
            var sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal';
            });
            if (sortedColumn.length > 0) {
                this.handleSort(sortedColumn[0]._index, sortedColumn[0]._sortType);
            }
        }
    }
});
