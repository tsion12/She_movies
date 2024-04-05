import "./App.css";
import NavBar from "./components/NavBar";
import SearchResult from "./components/SearchResult";
import { useEffect, useState } from "react";

const API_KEY = "67f36c12";
function App() {
  const [queries, setQueries] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          ` http://www.omdbapi.com/?apikey=${API_KEY}&s=${queries}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong while fetching data");
        const data = await res.json();
        console.log("initial data", data);
        if (data.Response === "False") throw new Error("Movie not found");

        if (data.Error) throw new Error(data.Error);
        setMovies(data.Search);
        console.log(data.Search);
      } catch (error) {
        console.log(error.message);
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (!queries.length) {
      setMovies([]);
      setError("Search for a movie");
      setSelectedMovieId(null);
      return;
    }
    fetchData();

    setMovies([]);
    // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=inception`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setMovies(data.Search);
    //   });

    return function () {
      controller.abort();
    };
  }, [queries]);

  useEffect(() => {
    document.title = `Movie `;
  }, [selectedMovieId]);
  return (
    <div className="flex flex-col space-y-6 h-screen w-full bg-slate-900">
      <NavBar movies={movies} queries={queries} setQueries={setQueries} />
      <div className="flex space-x-4 w-full items-center justify-center h-full">
        <SearchResult
          error={error}
          loading={loading}
          movies={movies}
          selectedMovieId={selectedMovieId}
          setSelectedMovieId={setSelectedMovieId}
        />
        {/* <Details /> */}
      </div>
    </div>
  );
}

export default App;
