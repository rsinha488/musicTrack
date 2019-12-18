
var mongoose = require('mongoose');
var Track     = mongoose.model('Track');

//Get all genre record
module.exports.genresGetAll = function(req, res) {
     var id = req.params.trackId;
    console.log('GET genres for trackId', id);
    
     Track
        .findById(id)
        .select('genres')
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : []
            };
         if (err) {
            console.log("Error finding track");
            response.status = 500;
            response.message = err;
        } else if(!doc) {
            console.log("Track id not found in database", id);
            response.status = 404;
            response.message = {
                "message" : "Track ID not found " + id
            };
        } else {
            response.message = doc.genres ? doc.genres : [];
        }
         res
            .status(response.status)
            .json(response.message);
    });
   
        
};
  
//Get single Genre record
module.exports.genresGetOne = function(req, res){
    var trackId = req.params.trackId;
    var genresId = req.params.genresId;
   console.log("GET the Genres Id :",genresId);

    Track
        .findById(trackId)
        .select('genres')
        .exec(function(err, track){
            var response = {
                    status : 200,
                    message : {}
            }
        
    
        if(err) {
                console.log("Error finding Track");
                response.status=500;
                response.message=err;
        }else if(!track){
            res
                response.status=404;
                response.message={
                    "message" : "Track ID not found"
                };
        } else {
        // Get the genre
        response.message = track.genres.id(genresId);
        // If the genres doesn't exist Mongoose returns null
        if (!response.message) {
          response.status = 404;
          response.message = {
            "message" : "Genres ID not found " + genresId
          };
        }
      }
        res
            .status(response.status)
            .json(response.message);
        
    });
    
};

//Edit or update a genre
module.exports.genresUpdateOne = function(req, res){
      var trackId = req.params.trackId;
    var genresId = req.params.genresId;
   console.log('PUT Genres Id' + genresId+ ' for trackId' + trackId );

    Track
        .findById(trackId)
        .select("genres")
        .exec(function(err,track){
         var thisGenre;
        var response = {
            status : 200,
            message : {}
        };
        
    
        if(err) {
                console.log("Error finding Track");
                response.status=500;
                response.message=err;
        }else if(!track){
            console.log("Track id not found in database", id);
                response.status=404;
                response.message={
                    "message" : "Track ID not found "+ id
                };
        }  else {
        // Get the review
        thisGenre = track.genres.id(genresId);
        // If the genre doesn't exist Mongoose returns null
        if (!thisGenre) {
          response.status = 404;
          response.message = {
            "message" : "Genre ID not found " + genreId
          };
        }
      }
        if(response.status !== 200){
        res
            .status(response.status)
            .json(response.message);
        } else{ 
            doc.name = req.body.name;
            
            doc.save(function(err, trackUpdated){
                if(err){
                    res
                        .status(500)
                        .json(err);
                    
                }else{
                    res
                        .status(204)
                        .json();
                    
                }
            });
        }
    });
};


var _addGenre = function (req, res, track) {
  
  track.genres.push({
      id : req.params.trackId,
    name : req.body.name
  });
    console.log(req.params.trackId);

  track.save(function(err, trackUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(trackUpdated.genres[trackUpdated.genres.length - 1]);
    }
  });

};
//Add a new Genre
module.exports.genresAddOne = function(req, res) {

  var id = req.params.trackId;

  console.log('POST Genre to trackId', id);

  Track
    .findById(id)
    .select('genres')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding track");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("TrackId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Track ID not found " + id
        };
      }
      if (doc) {
        _addGenre(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });


};