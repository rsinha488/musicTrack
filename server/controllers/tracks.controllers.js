
var mongoose = require('mongoose');
var Track     = mongoose.model('Track');

//Get Track list
module.exports.tracksGetAll = function(req, res) {
    var offset = 0;
    var count = 5;
    var maxCount = 10;
    
    console.log(" Tracks ");
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    
    
    if( isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message" : "If supplied in querystring count and offset should be a number"
            });
        return;
    }
        
    if(count > maxCount){
        res
            .status(400)
            .json({
                "message" : "Count limit of "+ maxCount+" exceeded"
        });
        return;
    }
    
    
    Track
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, tracks){
            if(err) {
                console.log("Error finding Track");
                res
                    .status(500)
                    .json(err);
            }else{
                console.log("Found Tracks",tracks.length);
                res
                    .json(tracks);
            }
        });
        
};

//Get Single Track List
module.exports.tracksGetOne = function(req, res){
    var trackId = req.params.trackId;
   console.log("GET the Track Id :",trackId);

    Track
        .findById(trackId)
        .exec(function(err,doc){
            var response = {
                    status : 200,
                    message : doc
            }
        
    
        if(err) {
                console.log("Error finding Track");
                response.status=500;
                response.message=err;
        }else if(!doc){
            res
                response.status=404;
                response.message={
                    "message" : "Track ID not found"
                };
        } 
        res
            .status(response.status)
            .json(response.message);
        
    });
    
};

//Update or edit a track
module.exports.tracksUpdateOne = function(req, res){
     var trackId = req.params.trackId;
   console.log("GET the Track Id :",trackId);

    Track
        .findById(trackId)
        .select(" ")
        .exec(function(err,doc){
        var response = {
            status : 200,
            message : doc
        }
        
    
        if(err) {
                console.log("Error finding Track");
                response.status=500;
                response.message=err;
        }else if(!doc){
            res
                response.status=404;
                response.message={
                    "message" : "Track ID not found"
                };
        } 
        if(response.status !== 200){
        res
            .status(response.status)
            .json(response.message);
        } else{ 
            doc.title = req.body.title;
            doc.rating = parseInt(req.body.rating);
            doc.genres = req.body.genres;
            
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


//Add a new Track
module.exports.tracksAddOne = function(req, res){
 
        Track
            .create({
                 title : req.body.title,
                 rating : parseInt(req.body.rating),
                 genres : req.body.genres || null
            }, function(err, track){   
                if(err){
                    console.log("Error creating Track");
                    res
                        .status(400)
                        .json(err);
                } else {
                    console.log("Track created", track)
                    res
                        .status(201)
                        .json(track);
                }
            });
};