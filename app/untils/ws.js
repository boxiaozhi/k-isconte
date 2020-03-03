let count = 0

module.exports = wss => {
    wss.on('connection', function connection(ws, request) {
        count++;
        console.log(count)
        const ip = request.connection.remoteAddress;
        //console.log(wss.clients)
        wssockets.set(count.toString(), ws)
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.on('close', function (code, reason) {
            count--;
        })
    });
}