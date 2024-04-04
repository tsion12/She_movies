import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";

import Details from "./Details";

const SearchResult = ({
  movies,
  loading,
  error,
  selectedMovieId,
  setSelectedMovieId,
}) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <>
      <div className="flex flex-col   py-2 px-4 rounded-lg bg-slate-800 h-[85vh] overflow-y-auto w-[30vw] ">
        <div
          onClick={() => setCollapse((collapse) => !collapse)}
          className="flex justify-end items-center">
          <button className="text-white bg-slate-600 px-3 rounded-md">
            {collapse ? "-" : "+"}
          </button>
        </div>
        {loading && (
          <div className="text-white h-full flex items-center justify-center">
            Loading...
          </div>
        )}
        {!loading && !error && collapse && (
          <>
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => {
                  // console.log(movies.length);
                  // setSelectedMovieId("tt0372784");
                  // setDetails(true);

                  setSelectedMovieId(movie.imdbID);
                  console.log(movie.imdbID);
                }}
                className="flex flex-col cursor-pointer items-start justify-start space-y-4">
                <div className="flex items-center space-x-6 justify-center">
                  <div className="w-12 h-16 bg-slate-900 rounded-sm">
                    <img src={movie.Poster} alt="" className="object-cover" />
                  </div>
                  <div className="flex flex-col items-start space-y-2 text-white justify-center">
                    <div>{movie.Title}</div>
                    <div className="flex text-xs items-start justify-center space-x-2">
                      <div>
                        <SlCalender />
                      </div>
                      <div>{movie.Year}</div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-700 w-full "></div>
              </div>
            ))}
          </>
        )}
        {error && (
          <p className="text-white h-full flex items-center justify-center">
            {error}
          </p>
        )}
      </div>
      <Details
        movie={movies}
        selectedMovieId={selectedMovieId}
        setSelectedMovieId={setSelectedMovieId}
      />
      ;
    </>
  );
};

export default SearchResult;
