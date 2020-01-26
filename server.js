const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
require('./mongoose')

const app = express();

const port = process.env.port | 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
