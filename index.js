const http = require('http')

const conversion = require('html-to-xlsx')({
  tmpDir: process.env.temp,
  timeout: 300000
})

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    return res.end('OK')
  }

  var data = ''
  req.on('data', function (chunk) {
    data += chunk.toString()
  })

  req.on('end', function () {
    conversion(JSON.parse(data), (err, stream) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        return res.end('Error when doing html to xlsx ' + err.stack)
      }

      stream.pipe(res)
    })
  })
})

server.listen(7000)
