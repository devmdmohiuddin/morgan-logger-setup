const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const accessLogStream = fs.createWriteStream(
  path.resolve("logs", "access.log"),
  { flags: "a" }
);

const useMorgan = (app) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production") {
    app.use(morgan(prodFormat, { stream: accessLogStream }));
  } else {
    app.use(
      morgan("dev", {
        skip: (_, res) => {
          return res.statusCode < 400;
        },
        stream: process.stderr,
      })
    );

    app.use(
      morgan("dev", {
        skip: (_, res) => {
          return res.statusCode >= 400;
        },
        stream: process.stdout,
      })
    );
  }
};

function prodFormat(tokens, req, res) {
  return JSON.stringify({
    method: tokens["method"](req, res),
    url: tokens["url"](req, res),
    status: tokens["status"](req, res),
    responseTime: tokens["response-time"](req, res),
  });
}

module.exports = useMorgan;
