const app = require("./app");
const http = require("http");
const server = http.createServer(app);
server.listen(1905, () => {
  console.log("Server is started on 1905 port!");
});
