const express = require("express");
const useMorgan = require("./useMorgan");

const app = express();
const PORT = 8080;

useMorgan(app)

app.get("/", (_, res) => {
  res.json({
    message: "Morgan setup",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
