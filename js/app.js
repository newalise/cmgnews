var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'тут подробный текст'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'тут подробный текст'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'тут подробный текст'
    }
];

window.ee = new EventEmitter();

var Articles = React.createClass({
        propTypes: {
            data: React.PropTypes.shape({
                author: React.PropTypes.string.isRequired,
                text: React.PropTypes.string.isRequired,
                bigText: React.PropTypes.string.isRequired
            })
        },

        getInitialState: function () {
            return {
                visible: false
            };
        },

        readmoreClick: function (e) {
            e.preventDefault();
            this.setState({visible: true});
        },

        closeMore: function (e) {
            e.preventDefault();
            this.setState({visible: false});
        },

        render: function () {
            var author = this.props.data.author,
                text = this.props.data.text,
                bigText = this.props.data.bigText,
                visible = this.state.visible;
            return (
                <div className="article">
                    <p className="news__author">{author}</p>
                    <p className="news__text">{text}</p>
                    <a href="#" onClick={this.readmoreClick}
                       className={'news__readmore ' + (visible ? 'none' : '')}>Подробнее</a>
                    <p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>
                    <a href="#" onClick={this.closeMore} className={'close-more ' + (visible ? '' : 'none')}>Скрыть</a>
                </div>
            )

        }
    })
;

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
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
                <strong className={'news__count ' + (data.length > 0 ? '' : 'none') }>Всего
                    новостей: {data.length}</strong>
            </div>
        );
    }
});
var Add = React.createClass({
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },

    onBtnClickHandler: function (e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var TextEm = ReactDOM.findDOMNode(this.refs.text);
        var text = TextEm.value;
        var item = [{
            author: author,
            text: text,
            bigText: '...'
        }];

        window.ee.emit('News.add', item);
        TextEm.value = '';
        this.setState({textIsEmpty: true});
    },

    getInitialState: function () {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },

    btnOnClickCheck: function () {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },

    onFieldChange: function (fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({['' + fieldName]: false})
        } else {
            this.setState({['' + fieldName]: true})
        }
    },

    render: function () {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
            <form className="add cf">
                <div className="form__group">
                    <input className='autor' defaultValue='' placeholder="Ваше имя" ref='author'
                           onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}/>
                </div>
                <div className="form__group">
                    <textarea className="addText" defaultValue='' placeholder="Текст новости" ref="text"
                              onChange={this.onFieldChange.bind(this, 'textIsEmpty')}></textarea>
                </div>
                <div className="form__group">
                    <label className="add__checkrule">
                        <input type="checkbox" defaultChecked={false} ref="checkRule" onClick={this.btnOnClickCheck}/> Я
                        согласен с правилами
                    </label>
                </div>
                <button className="add__Btn" onClick={this.onBtnClickHandler} ref="alert_Btn"
                        disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>показать alert
                </button>
            </form>
        )
    }

});
var App = React.createClass({
    getInitialState: function () {
        return {
            news: my_news
        };
    },
    componentDidMount: function () {
        var self = this;
        window.ee.addListener('News.add', function (item) {
            var nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        })
    },
    componentWillUnmount: function () {
        window.ee.removeListener('News.add');
    },
    render: function () {
        console.log('log');
        return (
            <div className="app">
                <h3>Новости</h3>
                <Add/>
                <newButton/>
                <News data={this.state.news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);