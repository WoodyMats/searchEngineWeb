const express = require("express");
const Document = require("./models/document")

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.post("/sendDocuments/:keepData", (req, res) => {
  console.log(req.params.keepData)
  if (req.params.keepData == true) {
    Document.insertMany(req.body, function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send({
          message: "Documents Inserted."
        })
      }
    })
  } else {
    Document.deleteMany({}, function (error, callback) {
      if (error) {
        console.log("Error deleting documents")
        res.status(400).send
      } else {
        Document.insertMany(req.body, function (err, docs) {
          if (err) {
            console.log(err)
          } else {
            res.status(200).send({
              message: "Documents Inserted."
            })
          }
        })
      }
    })
  }

})

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
