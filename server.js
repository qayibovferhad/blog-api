const app = require("./app");
const http = require("http");
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server is started on 8080 port!");
});
