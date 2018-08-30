var http = require('http')

function process_request(req, res) {
    var body = 'hello',
        length = body.length

    res.writeHead(200, {
        'Content-Length': length,
        'Content-Type': 'text/plain'
    })

    res.end(body)
}

var s = http.createServer(process_request)

s.listen(8080)

// curl -i http://localhost:8080   命令获取响应