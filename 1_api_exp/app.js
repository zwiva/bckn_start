const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')

const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express();

app.use(express.json());

app.use(cors({ // vacio es un *
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.disable('x-powered-by');

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS en metodos complejos: 
// CORS PRE-Flight
// OPTIONS

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev'
]

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
});

// todos los recursos que sean movies se identifican con /movies
app.get('/movies', (req, res) => {

  // const origin = req.header('origin')

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   // res.header('Access-Control-Allow-Origin', '*') // todos los origenes que no sean nuestro propio origen estan permitidos

  //   // res.header('Access-Control-Allow-Origin', 'http://localhost:8080') // solo permite el 8080

  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { genre } = req.query // recuperar peliculas por genero
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies) // si no, muestra todas
})

// app.get('/movies/:id/:mas/:otro', (req, res) => { // path-to-regex
//   const { id, mas, otro } = req.params
// })

// recuperar una pelicula por id:
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'movie not found :(' })
})

// agregar pelicula
app.post('/movies', (req, res) => {
  console.log('req', req.body);

  const result = validateMovie(req.body)

  if (!result.success) {
    // 400: bad request o 422: unprocessable entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data // datos validados, no es req.body!
  }
  console.log('nw movie', newMovie);

  movies.push(newMovie)
  res.status(201).json(newMovie) // 201 created, adjunta json para actualizar la data
})

// eliminar 
app.delete('/movies/:id', (req, res) => {

  // const origin = req.header('origin')
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})

// patch
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  
  
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.json(updateMovie)

})

// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   res.send(200)
// })

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on porr ${PORT}`);
})