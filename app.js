var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//ポート番号指定とsocketioの設定
var app = express();
var server = app.listen(3001);
var io = require('socket.io').listen(server);

//socketio
io.on('connection', function(socket){
    console.log('a user connected : ' + socket.id);
    var gid = 0;
    socket.on('client_to_server_join', function(num){
        gid = num;
        socket.join(String(num));
        console.log('joined to '+ num);
    });

    socket.on('chat message', function(array){
        io.to("1").emit('chat message', array);
    });

    socket.on('disconnect', function(){
        console.log('a user disconnected');
    });

});

//読み込み
var routes = require('./routes/index');

//ルーティン設定
app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//node_modules依存関係ルーティング設定
app.use('/socket.io',express.static(__dirname + '/node_modules/socket.io-client/dist'));
app.use('/three', express.static(__dirname + '/node_modules/three'));

app.use('/src', express.static(__dirname + '/../src'));

//なんかのクッキーと証明書発行
app.use(session({
    secret: 'topicnote',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure:false, maxAge: 30 * 60 * 1000
    }
}));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found' + req + res );
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;