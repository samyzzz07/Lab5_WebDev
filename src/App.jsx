import { useState } from "react";
import "./App.css";


function StarRating({ rating, onRate }) {
  const stars = [1, 2, 3, 4, 5];

  function handleClick(n) {
    onRate(n === rating ? 0 : n);
  }

  return (
    <div className="stars">
      {stars.map((n) => (
        <button
          type="button"
          key={n}
          className={n <= rating ? "star filled" : "star"}
          onClick={() => handleClick(n)}
        >
          ⭐
        </button>
      ))}
      <span className="star-count">
        {rating === 0 ? "Not rated" : `You gave ${rating} ${"⭐".repeat(rating)}`}
      </span>
    </div>
  );
}

function MovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  function handleSubmit(e) {
    e.preventDefault(); 
    if (title.trim() === "") return;

    onAdd({ title: title.trim(), review: review.trim(), rating: rating });

    setTitle("");
    setReview("");
    setRating(0);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write a review (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <StarRating rating={rating} onRate={setRating} />
      <button type="submit">Add movie</button>
    </form>
  );
}


function MovieCard({ movie, onRemove, onRate }) {
  return (
    <li className="movie-card">
      <div className="movie-header">
        <h3 className="movie-title">{movie.title}</h3>
        <button className="remove-btn" onClick={() => onRemove(movie.id)}>
          Remove
        </button>
      </div>

      <StarRating rating={movie.rating} onRate={(n) => onRate(movie.id, n)} />

      {movie.review !== "" && <p className="review">{movie.review}</p>}
    </li>
  );
}


function App() {
  const [movies, setMovies] = useState([]);

  function addMovie(newMovie) {
    setMovies([...movies, { id: Date.now(), ...newMovie }]);
  }

  function removeMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function rateMovie(id, rating) {
    setMovies(
      movies.map((movie) => (movie.id === id ? { ...movie, rating: rating } : movie))
    );
  }

  return (
    <div className="app">
      <h1 className="app-title">🎬 Movies Watch List</h1>

      <MovieForm onAdd={addMovie} />

      {movies.length === 0 ? (
        <p className="empty">No movies yet. Add the first one!</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={removeMovie}
              onRate={rateMovie}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
