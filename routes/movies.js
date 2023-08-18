const routerMovie = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

routerMovie.get('/movies', getMovies);

routerMovie.post('/movies', createMovie);

routerMovie.delete('/movies/:id', deleteMovieById);

module.exports = routerMovie;
