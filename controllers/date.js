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
router.get('/', function(req, res) {
  Form.find({title: "date"}).then(function(form) {
    res.render("./indexPages/date.ejs", {data: form})
  })
});

//NEW PAGE
router.get("/new", function(req, res){
  // console.log('hello');
  // res.send('goodbye')
  res.render("./newPages/date.ejs");
});

// SHOW PAGE  
router.get('/:id', function(req, res) {
  console.log(req.params.id);
  Form.findById(req.params.id).then(function(form) {
    // res.json(form);
    res.render("./showPages/date.ejs", form);
  });
});

//EDIT PAGE
// "Date" Mad Lib
router.get("/:id/edit", function(req, res) {
  Form.findById(req.params.id).then(function(form) {
    res.render("./editPages/date.ejs", form);
  });
});

//UPDATE PAGE
router.put("/:id", function(req, res) {
  // console.log(req.body);
  // console.log(req.params.id); 
  Form.findOneAndUpdate( { _id: req.params.id }, req.body, function(err, form) {
    res.redirect("/" + form.title + "/" + req.params.id);
  })
})

// CREATE PAGE
router.post('/', function(req, res) {
  // this variable will serve to populate images for the show pages
  var word = req.body.title;
  //this callback function provides my Key and Secret to the Flickr API
  flickr.tokenOnly(flickrOptions, function(error, flickr) {
    //this callback function tests the connection to the Flickr API
    flickr.test.echo({"test": "test"}, function(err,result) {
      if(err) { return console.log("note: error connecting to the flickr API"); }
      var noun1Result;
      //this function searches Flickr based on the key word for each mad lib
      flickr.photos.search({ 
        tags: word,
        per_page: 4,
        page: 1 }, function(err,result) {
        if(err) { return console.log("error:", err); }
        console.log(result.photos.photo.length + " results found. First result:");
        // console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
        //This block of variables takes the output from the Flickr API and parses it into a form that can be saved in the database and used to render the images on screen
        var firstResult = result.photos.photo[0];
        var img1 = "https://farm" + firstResult.farm + ".staticflickr.com/" + firstResult.server + "/" + firstResult.id + "_" + firstResult.secret + ".jpg"
        req.body.image1 = img1;
        var secondResult = result.photos.photo[1];
        var img2 = "https://farm" + secondResult.farm + ".staticflickr.com/" + secondResult.server + "/" + secondResult.id + "_" + secondResult.secret + ".jpg"
        req.body.image2 = img2;
        var thirdResult = result.photos.photo[2];
        var img3 = "https://farm" + thirdResult.farm + ".staticflickr.com/" + thirdResult.server + "/" + thirdResult.id + "_" + thirdResult.secret + ".jpg"
        req.body.image3 = img3;
        var fourthResult = result.photos.photo[3];
        var img4 = "https://farm" + fourthResult.farm + ".staticflickr.com/" + fourthResult.server + "/" + fourthResult.id + "_" + fourthResult.secret + ".jpg"
        req.body.image4 = img4;
        // console.log(req.body);
        //this variable and function allow me to save the new data to the database
        var newform = new Form(req.body);
        newform.save(function(err) {
          if(err) {
            console.log(err);
          } else {
            res.redirect("/date");
            console.log(req.body);
            console.log(req.body.title);
            console.log(req.body._id);
          }
        });
      });
    });
  });
});

// Delete
router.delete('/:id', function(req, res) {
  Form.findOneAndRemove({_id: req.params.id}, function(err) {
    if(err) console.log(err);
    console.log("Mad Lib deleted");
    res.redirect("/date");  
  });
});

module.exports = router;