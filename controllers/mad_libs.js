// REQUIREMENTS
var express = require('express');
var router = express.Router();
var Form = require('../models/form1.js');
var request = require('request');
var flickr = require("flickrapi");
var flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SECRET
};

// INDEX
// this route will initially display a link to fill out a new form to populate the mad lib, but later the lower part of the page will display previously created mad libs
router.get('/', function(req, res) {
  // this pair of console log and res.send will test that the route works.
  // console.log('hello');
  // res.send('goodbye')
  Form.find().then(function(form) {
    res.render("index3.ejs", {data: form})
  })
});

// //NEW PAGE
// // "Pirate" Mad Lib 
// router.get("/newpirate", function(req, res){
//   // console.log('hello');
//   // res.send('goodbye')
//   res.render("./newPages/pirate.ejs");
// });

// //NEW PAGE
// // "Date" Mad Lib
// router.get("/newdate", function(req, res){
//   // console.log('hello');
//   // res.send('goodbye')
//   res.render("./newPages/date.ejs");
// });

// //NEW PAGE
// // "Study" Mad Lib
// router.get("/newstudy", function(req, res){
//   // console.log('hello');
//   // res.send('goodbye')
//   res.render("./newPages/study.ejs");
// });

// //NEW PAGE
// // "Dentist" Mad Lib
// router.get("/newdentist", function(req, res){
//   // console.log('hello');
//   // res.send('goodbye')
//   res.render("./newPages/dentist.ejs");
// });

// // SHOW PAGE 
// // "Pirate" Mad Lib 
// router.get('/pirate/:id', function(req, res) {
//   console.log(req.params.id);
//   Form.findById(req.params.id).then(function(form) {
//     // res.json(form);
//     res.render("./showPages/pirate.ejs", form);
//   });
// });

// // SHOW PAGE  
// // "Date" Mad Lib
// router.get('/date/:id', function(req, res) {
//   console.log(req.params.id);
//   Form.findById(req.params.id).then(function(form) {
//     // res.json(form);
//     res.render("./showPages/date.ejs", form);
//   });
// });

// // SHOW PAGE
// // "Study" Mad Lib
// router.get('/study/:id', function(req, res) {
//   console.log(req.params.id);
//   Form.findById(req.params.id).then(function(form) {
//     // res.json(form);
//     res.render("./showPages/study.ejs", form);
//   });
// });

// // SHOW PAGE
// // "Dentist" Mad Lib
// router.get('/dentist/:id', function(req, res) {
//   // console.log("hello");
//   // console.log(req.params.id);
//   Form.findById(req.params.id).then(function(form) {
//     // res.json(form);
//     res.render("./showPages/dentist.ejs", form);
//   });
// });

// //EDIT PAGE
// // "Pirate" Mad Lib 
// router.get("/pirate/:id/edit", function(req, res) {
//   Form.findById(req.params.id).then(function(form) {
//     res.render("./editPages/pirate.ejs", form);
//   });
// });

// //EDIT PAGE
// // "Date" Mad Lib
// router.get("/date/:id/edit", function(req, res) {
//   Form.findById(req.params.id).then(function(form) {
//     res.render("./editPages/date.ejs", form);
//   });
// });

// //EDIT PAGE
// // "Study" Mad Lib
// router.get("/study/:id/edit", function(req, res) {
//   Form.findById(req.params.id).then(function(form) {
//     res.render("./editPages/study.ejs", form);
//   });
// });

// //EDIT PAGE
// // "Dentist" Mad Lib
// router.get("/dentist/:id/edit", function(req, res) {
//   Form.findById(req.params.id).then(function(form) {
//     res.render("./editPages/dentist.ejs", form);
//   });
// });

// //UPDATE PAGE
// //This route works for all four mad libs
// router.put("/:id", function(req, res) {
//   // console.log(req.body);
//   // console.log(req.params.id); 
//   Form.findOneAndUpdate( { _id: req.params.id }, req.body, function(err, form) {
//     res.redirect("/mad-libs/" + form.title + "/" + req.params.id);
//   })
// })

// // CREATE PAGE
// //This route works for all four mad libs
// router.post('/', function(req, res) {
//   // this variable will serve to populate images for the show pages
//   var word = req.body.title;
//   //this callback function provides my Key and Secret to the Flickr API
//   flickr.tokenOnly(flickrOptions, function(error, flickr) {
//     //this callback function tests the connection to the Flickr API
//     flickr.test.echo({"test": "test"}, function(err,result) {
//       if(err) { return console.log("note: error connecting to the flickr API"); }
//       var noun1Result;
//       //this function searches Flickr based on the key word for each mad lib
//       flickr.photos.search({ 
//         tags: word,
//         per_page: 4,
//         page: 1 }, function(err,result) {
//         if(err) { return console.log("error:", err); }
//         console.log(result.photos.photo.length + " results found. First result:");
//         // console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
//         //This block of variables takes the output from the Flickr API and parses it into a form that can be saved in the database and used to render the images on screen
//         var firstResult = result.photos.photo[0];
//         var img1 = "https://farm" + firstResult.farm + ".staticflickr.com/" + firstResult.server + "/" + firstResult.id + "_" + firstResult.secret + ".jpg"
//         req.body.image1 = img1;
//         var secondResult = result.photos.photo[1];
//         var img2 = "https://farm" + secondResult.farm + ".staticflickr.com/" + secondResult.server + "/" + secondResult.id + "_" + secondResult.secret + ".jpg"
//         req.body.image2 = img2;
//         var thirdResult = result.photos.photo[2];
//         var img3 = "https://farm" + thirdResult.farm + ".staticflickr.com/" + thirdResult.server + "/" + thirdResult.id + "_" + thirdResult.secret + ".jpg"
//         req.body.image3 = img3;
//         var fourthResult = result.photos.photo[3];
//         var img4 = "https://farm" + fourthResult.farm + ".staticflickr.com/" + fourthResult.server + "/" + fourthResult.id + "_" + fourthResult.secret + ".jpg"
//         req.body.image4 = img4;
//         // console.log(req.body);
//         //this variable and function allow me to save the new data to the database
//         var newform = new Form(req.body);
//         newform.save(function(err) {
//           if(err) {
//             console.log(err);
//           } else {
//             res.redirect("/mad-libs");
//             console.log(req.body);
//             console.log(req.body.title);
//             console.log(req.body._id);
//           }
//         });
//       });
//     });
//   });
// });

// // Create - this is a pre API test route
// router.post('/', function(req, res) {
//   // console.log(req.body);
//   // res.send("post request");
//   var newform = new Form(req.body);
//   newform.save(function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       res.redirect("/mad-libs");
//     }
//   });
// });

// // Delete
// // This route works for all four mad libs
// router.delete('/:id', function(req, res) {
//   Form.findOneAndRemove({_id: req.params.id}, function(err) {
//     if(err) console.log(err);
//     console.log("Mad Lib deleted");
//     res.redirect("/mad-libs");  
//   });
// });

module.exports = router;