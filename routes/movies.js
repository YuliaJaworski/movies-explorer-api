const routerMovie = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlwares/joiValidater');

routerMovie.get('/movies', getMovies);

routerMovie.post('/movies', validateMovie, createMovie);

routerMovie.delete('/movies/:id', validateMovieId, deleteMovieById);

module.exports = routerMovie;
