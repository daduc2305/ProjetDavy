const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const movies = [
  {
    id: "1",
    title: "The Mandalorian",
    description: "Action",
    duree: "25 minutes",
  },
  { id: "2", title: "Silo", description: "Fiction", duree: "45 minutes" },
  { id: "3", title: "Avatar", description: "Fiction", duree: "210 minutes" },
  { id: "4", title: "Rocky", description: "Action", duree: "110 minutes" },
];

// endpoint pour lire tous les films
app.get("/", (req, res) => {
  res.json(movies);
});

// Endpoint pour obtenir le nombre total de films
app.get("/total", (req, res) => {
  const totalMovies = movies.length;
  res.json({ totalMovies });
});

// Endpoint pour obtenir le nombre de films par genre
app.get("/genre", (req, res) => {
  const genres = {};
  movies.forEach((movie) => {
    if (genres[movie.description]) {
      genres[movie.description]++;
    } else {
      genres[movie.description] = 1;
    }
  });
  res.json({ genres });
});

// Endpoint pour obtenir des statistiques sur la durée des films
app.get("/time", (req, res) => {
  const durations = movies.map((movie) => parseInt(movie.duree.split(" ")[0]));

  const totalDuration = durations.reduce((acc, duration) => acc + duration, 0);
  const longestDuration = Math.max(...durations);
  const shortestDuration = Math.min(...durations);

  res.json({
    totalDuration,
    longestDuration,
    shortestDuration,
  });
});

// endpoint pour creer un film
app.post("/created", (req, res) => {
  const { id, title, description, duree } = req.body;
  const movie = {
    id,
    title,
    description,
    duree,
  };
  movies.push(movie);
  res.json({ message: "Movie added successfully" });
});

// endpoint pour supprimer un film par son ID
app.delete("/deleted/:id", (req, res) => {
  const movieId = req.params.id;
  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    res.json({ message: "Movie deleted successfully" });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// endpoint pour modifier un film par son ID
app.put("/modified/:id", (req, res) => {
  const movieId = req.params.id;
  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  if (movieIndex !== -1) {
    const updatedMovie = req.body;
    movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };

    res.json({ message: "Movie updated successfully" });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

/* app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
}); */

module.exports = app;
