const express = require("express");
const javaExcecutor = require('child_process').exec;
const Document = require("./models/document")

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.get("/getDocuments", (req, res) => {
  Document.find({}, {"_id": false, "__v": false}).then( function(documents, error) {
    if(error) {
      res.status(400).send("Something went wrong!!")
    } else {
      res.send(documents)
    }
  })
})

router.post("/sendDocuments/:keepData", (req, res) => {
  console.log(req.params.keepData)
  if (req.params.keepData == "true") {
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
  const child = javaExcecutor(`java -jar ./QueryProcessorProject.jar "${req.body.query}"`, function(error, stdout, stderr) {
    res.status(200).send(stdout.split(","))
    console.log(stdout.split(","))
    // console.log('Error -> ' + error)
    // console.log|('StdError -> ' + stderr)
  })

  // const { query } = req.body;
  // // console.log(query)

  // const pages = [
  //   {
  //     title: "Test",
  //     content: "<html><body>Test</body></html>",
  //     url: "https://www.google.gr"
  //   },
  //   {
  //     title: "Giorgos",
  //     content: "<html><body>Giorgos</body></html>",
  //     url: "https://www.youtube.com"
  //   },
  //   {
  //     title: "Giorgos",
  //     content: "<html><body>Giorgos</body></html>",
  //     url: "https://www.youtube.com"
  //   },
  //   {
  //     title: "Giorgos",
  //     content: "<html><body>teteadasdasd adasdas dsa dasdsa</body></html>",
  //     url: "https://www.youtube.com"
  //   },
  //   {
  //     title: "Giorgos",
  //     content: "<html><body>dasdsadasd asdasdasdasd asdas</body></html>",
  //     url: "https://www.youtube.com"
  //   },
  //   {
  //     title: "Giannis",
  //     content: "<html><body>Giannis</body></html>",
  //     url: "https://www.wikipedia.com"
  //   }
  // ];

  // pages.forEach(page => {
  //   if (page.title.includes(query)) {
  //     results.push(page);
  //   }
  // });

  // if (results.length > 0) {
  //   return res.send(results);
  // } else {
  //   return res.send({
  //     status: 404,
  //     message: "Not Found"
  //   });
  // }
});

module.exports = router;
