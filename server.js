const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";

// Create the Express-Next App
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      handle(req, res, parsedUrl);
      console.log("pathname", pathname);
    }).listen(0, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });