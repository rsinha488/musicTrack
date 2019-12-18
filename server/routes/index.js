var express = require('express');
var router = express.Router();

var ctrlTracks =require('../controllers/tracks.controllers.js');

var ctrlGenres =require('../controllers/genres.controllers.js');


//Track routes
router
    .route('/tracks')
    .get(ctrlTracks.tracksGetAll)
    .post(ctrlTracks.tracksAddOne);

router
    .route('/tracks/:trackId')
    .get(ctrlTracks.tracksGetOne)
    .put(ctrlTracks.tracksUpdateOne);

//Genres routes

router
    .route('/:trackId/genres')
    .get(ctrlGenres.genresGetAll)
    .post(ctrlGenres.genresAddOne);

router
    .route('/:trackId/genres/:genreId')
    .get(ctrlGenres.genresGetOne)
    .put(ctrlGenres.genresUpdateOne);

module.exports = router;