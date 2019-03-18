function isValueNumber(value) {
    return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(value + '');
}

Vue.component('input-number', {
    template: '<div class="input-number">' +
        '<input type="text" :value="currentValue" @change="handleChange"' +
        '       @keydown.down="handleDown" @keydown.up="handleUp">' +
        '   <button @click="handleDown"  :disabled="currentValue <= min">-</button>' +
        '   <button @click="handleUp" :disabled="currentValue >= max">+</button>' +
        '</div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function (val) {
            if (val > this.max) {
                val = this.max;
            }
            if (val < this.min) {
                val = this.min;
            }
            this.currentValue = val;
        },
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
        handleUp: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        handleChange: function (event) {
            var val = event.target.value.trim();
            if (!isValueNumber(val)) {
                event.target.value = this.currentValue;
                return;
            }
            val = Number(val);
            // 此处需要先改变值,双向绑定才能生效
            this.currentValue = val;
            if (val > this.max) {
                this.currentValue = this.max;
            } else if (val < this.min) {
                this.currentValue = this.min;
            }
        }
    },
    mounted: function () {
        this.updateValue(this.value);
    }
});