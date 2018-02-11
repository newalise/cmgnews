var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    }
];

var Articles = React.createClass({
    render: function () {
        var author = this.props.data.author,
            text = this.props.data.text;
        return (
            <div className="article">
                <div className="news__author">{author}</div>
                <div className="news__text">{text}</div>
            </div>
        )

    }
});

var News = React.createClass({
    render: function () {
        var data = this.props.data;
        var newsTemplate;
        if (data.length > 0) {
            var newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Articles data={item}/>
                    </div>
                )
            });
        } else {
            newsTemplate = <p>К сожалению, новостей нет.</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={data.length > 0 ? '' : 'none'}>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <h3>Новости</h3>
                <News data={my_news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);