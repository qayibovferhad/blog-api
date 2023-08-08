const app = require("./app");
const fs = require("fs");
const http = require("http");
const https = require("https");
const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: fs.readFileSync("cert/key.pem"),
    cert: fs.readFileSync("cert/cert.pem"),
  },
  app
);
const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Server is started on ${PORT} port!`);
});



httpsServer.listen(8083, () => console.log(`Server is started on 8083 port!`));
