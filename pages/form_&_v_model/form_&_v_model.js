var app = new Vue({
    el: '#app',
    data: {
        message: '',
        text: '',
        picked: 'js',
        checked: ['html', 'css'],
        selected: 'html',
        options: [
            {value: 'html', text: 'HTML'},
            {value: 'js', text: 'JavaScript'},
            {value: 'css', text: 'CSS'}
        ]
    }
});