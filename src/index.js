const express = require("express");
const path = require("path");
const request = require("request");
const hbs = require("hbs");
const breakingbadapi = require("../api/breaking-bad");
const app = express();
const port = 3000;

// make directory
const publicDirectory = path.join(__dirname, "../public");
const viewDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

// template engine setting
app.set("views", viewDirectory);
app.set("view engine", "hbs");

// register partials
// hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerPartials(partialsDirectory);

// static file severs
app.use(express.static(publicDirectory));

// Dynamic File send
app.get("/", (req, res) => {
  request(
    { url: "https://breakingbadapi.com/api/deaths", json: true },
    function (error, { body }) {
      // console.log("statusCode:", response && response.statusCode);
      // console.log("body:", body[1].death_id);
      if (error) {
        console.log(error);
      } else {
        res.render("index", {
          arr: [
            { name: body[1].death, reg: body[1].death_id },
            { name: body[2].death, reg: body[3].death_id },
          ],
          footer: "Abdul Manan",
        });
      }
    }
  );
});

// Routes
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us Page",
    footer: "Azeem Rafique",
  });
});

// json Send
app.get("/weather", (req, res) => {
  let queryname = req.query.name;
  let querynum = req.query.num;
  // console.log(req.query); //give a object
  if (!queryname || !querynum) {
    return res.send({
      error: 404,
      errormessage: "You must provide a name and number of search ",
    });
  }
  switch (queryname) {
    case "episodes":
      queryname = "episodes";
      break;
    case "characters":
      queryname = "characters";
      break;
    case "quotes":
      queryname = "quotes";
      break;
    default:
      console.log("not match case");
      break;
  }
  breakingbadapi(queryname, querynum, (error = "", { name } = {}) => {
    // let { char_id, name, img, appearance, status } = data[0];
    if (error) {
      return res.send({
        error: 404,
        errormessage: error,
      });
    }

    res.send({
      data: name,
    });
  });
  // if (id <= 57) {
  //   request(
  //     { url: `https://breakingbadapi.com/api/characters/${id}`, json: true },
  //     function (error, response, body) {
  //       // console.log("statusCode:", response && response.statusCode);
  //       // console.log("body:", body[0].name);
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         res.send({
  //           arr: [{ name: body[0].name, reg: body[0].char_id }],
  //           footer: "Abdul Manan",
  //         });
  //       }
  //     }
  //   );
  // } else {
  //   res.send({
  //     error: 404,
  //     errormessage: "Number is Not Exist, greater than 57",
  //   });
  // }
});

// Static Send file
// app.get("/file", (req, res) => {
//   var fileName = "/index.html";
//   res.sendFile(publicDirectory + fileName, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Sent:", fileName);
//     }
//   });
// });

app.get("/about/*", (req, res) => {
  res.render("404-2", {
    title: "404",
    errormessage: "About this Category Not Found",
    footer: "Just-Chill",
  });
});

// 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errormessage: "Page Not Found",
    footer: "Just-Chill",
  });
});

app.listen(port, () => {
  console.log(`Server Start at Port ${port}!`);
});
