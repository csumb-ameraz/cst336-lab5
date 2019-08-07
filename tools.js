const request = require('request');
const mysql = require('mysql');

module.exports = {

/**
* Return random image URLs from an API
* @param string keyword - search term
* @param int imageCount - number of random images
* @return array of image URLs
*/
getRandomImages_cb: function (keyword, imageCount, callback) {
  var requestURL = "https://api.unsplash.com/photos/random?query="+ keyword + "&count="+ imageCount +"&client_id=0973ba70ad4ac9803bb8afcc864dca154dd060031068763031a1614979de3f45"
  request(requestURL, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the API data
    if(!error) {
  var parsedData = JSON.parse(body);
  //console.log("image url: ", parsedData["urls"]["regular"]);
  var imageURLs = [];
      for (let i = 0; i < 9; i++){
        imageURLs.push(parsedData[i].urls.regular);
      }
      //console.log(imageURLs);
      callback(imageURLs);
    } else {
      console.log("results", {"error":"Unable to access API"});
    }
  });//Request
},


/**
* Return random image URLs from an API
* @param string keyword - search term
* @param int imageCount - number of random images
* @return array of image URLs
*/
getRandomImages: function (keyword, imageCount) {
  var requestURL = "https://api.unsplash.com/photos/random?query="+ keyword + "&count="+ imageCount +"&client_id=0973ba70ad4ac9803bb8afcc864dca154dd060031068763031a1614979de3f45"
  
  return new Promise( function(resolve, reject){
      request(requestURL, function (error, response, body) {
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the API data
      if(!error) {
    var parsedData = JSON.parse(body);
    //console.log("image url: ", parsedData["urls"]["regular"]);
    var imageURLs = [];
        for (let i = 0; i < imageCount; i++){
          imageURLs.push(parsedData[i].urls.regular);
        }
        //console.log(imageURLs);
        //return imageURLs;
        resolve(imageURLs);
      } else {
        console.log("error", error);
      }
    });//Request
  });//promise
},//function
  
  /**
  * creates database connection
  * @return db connection
  */
  createConnection:  function() {
    var conn = mysql.createConnection({
    host: "us-cdbr-iron-east-02.cleardb.net",
    user: "b8d487c4fd2c71",
    password: "0c06441c",
    database: "heroku_40f0131f81eb8a0"
  });
    return conn;
  }
}