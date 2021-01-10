// Routing
module.exports = function(app) {
    app.get('/game', function(request, response) {
        response.sendFile(__dirname + '/html/index.html');
    });
    app.get('/', function(request, response) {
        response.sendFile(__dirname + '/html/title.html');
    });
}