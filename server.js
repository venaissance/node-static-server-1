var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("贾维斯，需要指定端口号~\nnode server.js 1234 像这样就行");
  process.exit(1);
}

var server = http.createServer((request, response) => {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/
  console.log("灭霸发请求过来啦！路径（带查询参数）是：" + pathWithQuery);
  response.statusCode = 200;
  const filePath = path === "/" ? "index.html" : path; // 默认首页
  const index = filePath.lastIndexOf(".");
  const suffix = filePath.substring(index); // 取得请求文件后缀
  console.log("请求文件的后缀是：" + suffix);
  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
    ".png": "image/png",
    ".jpg": "image/jpeg"
  };
  response.setHeader(
    "Content-Type",
    `${fileTypes[suffix] || "text/html"};charset=utf-8`
  );
  let content;
  // try-catch 处理可能会出现的异常
  try {
    content = fs.readFileSync(`./public/${filePath}`); // 请求文件可能不存在
  } catch (error) {
    content = "文件不存在";
    response.statusCode = 404;
  }
  response.write(content);
  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听端口 " +
    port +
    " 成功\n贾维斯，现在就使用浏览器打开 http://localhost:" +
    port +
    " 这个链接吧~"
);
