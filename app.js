const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Configura body-parser para manejar solicitudes JSON
app.use(bodyParser.json());

// Conecta a la base de datos de MongoDB Atlas
const dbURI = 'mongodb+srv://usuario:ZhRiRUBYJxBEjfct@cluster0.5domenm.mongodb.net/mibasededatos';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB Atlas establecida');
  })
  .catch(err => {
    console.error('Error de conexión a MongoDB Atlas:', err);
  });

// Define un modelo de ejemplo para una colección de películas
const Movie = mongoose.model('Movie', {
  title: String,
  genre: String,
  director: String,
  year: Number,
});

// Ruta para obtener todas las películas
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error('Error al obtener películas:', err);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

// Ruta para agregar una nueva película
app.post('/movies', async (req, res) => {
  try {
    const { title, genre, director, year } = req.body;
    const movie = new Movie({ title, genre, director, year });
    await movie.save();
    res.json(movie);
  } catch (err) {
    console.error('Error al agregar película:', err);
    res.status(500).json({ error: 'Error al agregar película' });
  }
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
