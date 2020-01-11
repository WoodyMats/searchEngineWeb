const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
