var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号\nnode server.js 8888 像这样!')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ，下面模仿qq.com服务器************/

    console.log('有个请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('./public/qq.html'))
        response.end()
    } else if (path === '/qq.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('./public/qq.js'))
        response.end()
    } else if (path === '/friends.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/jason;charset=utf-8')
        // console.log(request.headers['referer'])
        // response.setHeader('Access-Control-Allow-Origin', 'http://hang.com:9999')
        //CORS方法阻止跨域被阻止
        response.write(fs.readFileSync('./public/friends.json'))
        response.end()
    } else if (path === '/friends.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        console.log(query)
        let string = fs.readFileSync('./public/friends.js').toString()
        let data = fs.readFileSync('./public/friends.json').toString()
        let string2 = string.replace('{ { data } }', data).replace('{{random}}', query.callBack)
        //query.callback拿到jsonp()生成的随机数???
        response.write(string2)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)