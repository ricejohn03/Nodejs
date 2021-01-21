const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  /* Check If Base url */
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title> Enter Message </title><head>");
    res.write(
      '<body> <form action="/message" method="POST"><input type="text" name="messge"/><button type="sumbit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  /* Check to see if URL has message and method is POST */
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1].split("+").join(" ");
      console.log(message);
      fs.writeFileSync("myMessage.txt", message);
      console.log(parseBody);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> Node Js Basics</title><head>");
  res.write("<h1> Node Js Basics<h1>");
  res.write("<html>");
  res.end();
});

server.listen(3000);
