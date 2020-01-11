const express = require("express");

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.post("/search", (req, res, next) => {
  const results = [];
  console.log(req.body);
  const { query } = req.body;

  const pages = [
    {
      title: "Test",
      content: "<html><body>Test</body></html>",
      url: "https://www.google.gr"
    },
    {
      title: "Giorgos",
      content: "<html><body>Giorgos</body></html>",
      url: "https://www.youtube.com"
    },
    {
      title: "Giorgos",
      content: "<html><body>Giorgos</body></html>",
      url: "https://www.youtube.com"
    },
    {
      title: "Giorgos",
      content: "<html><body>teteadasdasd adasdas dsa dasdsa</body></html>",
      url: "https://www.youtube.com"
    },
    {
      title: "Giorgos",
      content: "<html><body>dasdsadasd asdasdasdasd asdas</body></html>",
      url: "https://www.youtube.com"
    },
    {
      title: "Giannis",
      content: "<html><body>Giannis</body></html>",
      url: "https://www.wikipedia.com"
    }
  ];

  pages.forEach(page => {
    if (page.title.includes(query)) {
      results.push(page);
    }
  });

  if (results.length > 0) {
    return res.send(results);
  } else {
    return res.send({
      status: 404,
      message: "Not Found"
    });
  }
});

module.exports = router;
