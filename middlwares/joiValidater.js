const { Joi, celebrate } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальная длина поля - 2',
        'string.max': 'Минимальная длина поля - 30',
      }),
    password: Joi.string().required().messages({
      'string.empty': 'Поле "password" должно быть заполнено',
    }),
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().messages({
      'string.empty': 'Поле "password" должно быть заполнено',
    }),
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
  }),
});

const validateUpdateInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Минимальная длина поля - 2',
        'string.max': 'Минимальная длина поля - 30',
      }),
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number()
      .required()
      .messages({
        'string.empty': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string()
      .required()
      .custom((value, err) => {
        if (!value.match(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)*$/i)) {
          return err.message('Поле "image" должно быть валидным url-адресом');
        }
        return value;
      })
      .message('Поле "image" должно быть валидным url-адресом'),
    trailerLink: Joi.string()
      .required()
      .custom((value, err) => {
        if (!value.match(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)*$/i)) {
          return err.message('Поле "trailerLink" должно быть валидным url-адресом');
        }
        return value;
      })
      .message('Поле "trailerLink" должно быть валидным url-адресом'),
    thumbnail: Joi.string()
      .required()
      .custom((value, err) => {
        if (!value.match(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)*$/i)) {
          return err.message('Поле "thumbnail" должно быть валидным url-адресом');
        }
        return value;
      })
      .message('Поле "thumbnail" должно быть валидным url-адресом'),
    movieId: Joi.number()
      .required()
      .messages({
        'string.empty': 'Поле "movieId" должно быть заполнено',
      }),
    nameRU: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateUpdateInfo,
  validateMovieId,
  validateMovie,
};
