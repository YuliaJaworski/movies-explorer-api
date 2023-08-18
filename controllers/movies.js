const Movie = require('../models/movie');

// возвращает сохраненные пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
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
    trailer,
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user.id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

// удаляет сохраненный фильм по id
const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new Error('Фильм с указанным id не найден'))
    .then((movie) => {
      // проверить возможность удаления фильма
      if (movie.owner.toString() !== req.user.id) {
        throw new Error('Вы не можете удалить этот фильм');
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
