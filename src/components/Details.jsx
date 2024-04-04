import React, { useEffect, useState } from "react";
import { HiHashtag } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import { GiStarFormation } from "react-icons/gi";
import { TiMinus } from "react-icons/ti";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import { BiSolidHourglass } from "react-icons/bi";
import StarRating from "./StarRating";
import { IoMdAddCircle } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

const API_KEY = "67f36c12";

const Details = ({ selectedMovieId, setSelectedMovieId }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const isWatched = watchedMovies
    .map((item) => item.imdbId)
    .includes(selectedMovieId);

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    Genre: genre,
    Released: released,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie;

  useEffect(() => {
    async function getMoviesData() {
      setLoading(true);
      const res = await fetch(
        ` http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovieId}`
      );

      const data = await res.json();
      console.log("movie data", data);
      setMovie(data);
      setLoading(false);
    }
    getMoviesData();
  }, [selectedMovieId]);

  return (
    <div className="flex flex-col space-y-4  rounded-lg bg-slate-800 h-[85vh] w-[30vw] ">
      {loading ? (
        <div className="text-white h-full flex items-center justify-center">
          Loading...
        </div>
      ) : selectedMovieId ? (
        <>
          <div className="relative flex w-full h-[40%] bg-slate-700 space-x-4 items-start">
            <div className="relative w-[40%] h-full   rounded-sm">
              <img
                className=" object-cover w-full h-full "
                src={poster}
                alt=""
              />

              <div
                onClick={() => setSelectedMovieId(null)}
                className="absolute left-2 top-2 cursor-pointer ">
                <BsArrowLeftCircleFill className="text-white text-2xl" />
              </div>
            </div>
            <div className="  relative flex flex-col text-xs items-start  w-[50%] h-full text-white space-y-5">
              <div className="absolute right-2 top-2 ">
                <TiMinus className="text-white text-lg" />
              </div>
              <div className=" pt-10 text-2xl font-bold"> {title}</div>
              <div>
                {released} . {runtime}
              </div>

              <div>{genre}</div>
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <div>{imdbRating} IMDB rating</div>
              </div>
            </div>
          </div>
          {!isWatched ? (
            <StarRating
              maxRating={10}
              starRating={starRating}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              setStarRating={setStarRating}
            />
          ) : (
            <div className="bg-slate-700 mx-  rounded-md p-5 flex items-center space-x-2 justify-center text-white ">
              you have already rated this movie: {starRating}
              <IoIosStar className=" text-yellow-500" />
            </div>
          )}

          <div className="px-10 text-white text-xs">{plot}</div>
          <div className="px-10 text-white text-xs">
            {actors} . {year} . {runtime}
          </div>
          <div className="px-10 text-white text-xs">Directed by {director}</div>
          {starRating >= 1 && !isWatched && (
            <div className="flex items-center justify-center w-full ">
              <button
                onClick={() => {
                  setSelectedMovieId(null);
                  setWatchedMovies((prev) => [
                    ...prev,
                    {
                      imdbId: selectedMovieId,
                      title: title,
                      poster: poster,
                      rating: imdbRating,
                      maxRating: 10,
                      duration: runtime,
                      starRating: starRating,
                    },
                  ]);
                }}
                type="button"
                class="text-white inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <IoMdAddCircle className="mx-2" />
                Add to Watchlist
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="bg-slate-700 w-full rounded-md px-3 py-2 flex flex-col">
            <div className="flex justify-end items-center">
              <button className="text-white bg-slate-600 px-2 rounded-md">
                -
              </button>
            </div>
            <div className="text-white">MOVIES YOU WATCHED</div>
            <div className="flex items-center text-xs text-white justify-around">
              <div className="flex items-center  space-x-2 justify-center">
                <div className="bg-blue-500 rounded-sm">
                  <HiHashtag className="text-white" />
                </div>
                <div>{watchedMovies.length} movies</div>
              </div>
              <div className="flex items-center  space-x-2 justify-center">
                <FaStar className="text-yellow-500" />

                <div>8.5</div>
              </div>
              <div className="flex items-center  space-x-2 justify-center">
                <GiStarFormation className="text-yellow-500" />

                <div>10</div>
              </div>
              <div className="flex items-center  space-x-2 justify-center">
                <BiSolidHourglass className="text-white" />

                <div>132 min</div>
              </div>
            </div>
          </div>
          {watchedMovies.map((item) => (
            <div className="flex flex-col items-start justify-start space-y-4">
              <div className="flex items-center space-x-6 justify-center">
                <div className="w-12 h-16 bg-slate-900 rounded-sm">
                  <img src={item.poster} alt="" />
                </div>
                <div className="flex flex-col w-full items-start space-y-2 text-white justify-center">
                  <div>{item.title}</div>
                  <div className="flex w-full text-xs items-start justify-center space-x-2">
                    <div className="flex w-full items-center text-xs text-white justify-around">
                      <div className="flex items-center  space-x-2 justify-center">
                        <FaStar className="text-yellow-500" />

                        <div>{item.starRating}</div>
                      </div>
                      <div className="flex items-center  space-x-2 justify-center">
                        <FaStar className="text-red-500" />

                        <div>{item.rating}</div>
                      </div>
                      <div className="flex items-center ` space-x-2 justify-center">
                        <GiStarFormation className="text-yellow-500" />

                        <div>{item.maxRating}</div>
                      </div>
                      <div className="flex items-center  space-x-2 justify-center">
                        <BiSolidHourglass className="text-white" />

                        <div>{item.duration}</div>
                      </div>
                    </div>

                    <CiCircleRemove
                      onClick={() => {
                        setWatchedMovies((prev) =>
                          prev.filter((movie) => movie.imdbId !== item.imdbId)
                        );
                      }}
                      className="text-red-500 text-xl cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="border border-gray-700 w-full "></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Details;
