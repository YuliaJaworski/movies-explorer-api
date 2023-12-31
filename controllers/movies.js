const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

// возвращает сохраненные пользователем фильмы
const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// создает фильм
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    movieId,
    thumbnail,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    movieId,
    thumbnail,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

// удаляет сохраненный фильм по id
const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new NotFoundError('Фильм с указанным id не найден'))
    .then((movie) => {
      // проверить возможность удаления фильма
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      }

      // удалить фильм
      Movie.findByIdAndRemove(movie.id)
        .then(() => {
          res.status(200).send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
