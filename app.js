const express = require("express");
const appsController = require("./controllers/appliance-controller");

const server = express();

server.use(express.json());
server.use("/api/apps", appsController);

server.listen(4000, () => console.log("Listening on http://localhost:4000"));
