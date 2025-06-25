const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const route = require("./routes");
const db = require("./config/db");
const cors = require("cors"); // hoặc: const cors = require('cors');
db.connect();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("combined"));
route(app);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`API server listening at http://localhost:${port}`)
);
