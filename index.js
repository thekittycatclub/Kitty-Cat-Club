const express = require("express");
const path = require("path");
const http = require("http");
const ejs = require("ejs");
const { createBareServer } = require("@tomphttp/bare-server-node");

const PORT = process.env.PORT || 3000
const app = express();
const server = http.createServer();
const bareServer = createBareServer("/bare/");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/gxmes", (req, res) => {
    res.render("gxmes", { title: "Gxmes" });
  });

app.get("/apps", (req, res) => {
    res.render("apps", { title: "Apps" });
});

app.get("/settings", (req, res) => {
    res.render("settings", { title: "Settings" });
});

app.get("/mobile", (req, res) => {
  res.render("mobile", { title: "Mobile Edition" });
});

app.get("/*", (req, res) => {
    res.render("404", { title: "404 Page", error: "Looks like the page you're looking for doesn't exist." });
});

server.on("request", (req, res) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else {
      app(req, res);
    }
  });

server.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
  });

app.listen(PORT, () => {
    console.log(`The Kitty Kat Klub is running on http://localhost:${PORT}`);
});
