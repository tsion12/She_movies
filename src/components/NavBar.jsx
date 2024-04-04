import React from "react";

const NavBar = ({ movies, queries, setQueries }) => {
  return (
    <div className="h-[10vh] bg-purple-600 flex items-center rounded-b-md justify-between p-5 ">
      <div className="text-white text-lg font-medium">usePopcorn</div>
      <input
        type="search"
        name=""
        id=""
        className="w-1/4  text-sm text-gray-900 bg-transparent  rounded-lg  py-2 px-2
         border border-gray-300 placeholder:text-xs placeholder:px-2 outline-none "
        placeholder="Search for movies"
        value={queries}
        onChange={(e) => setQueries(e.target.value)}
      />

      <div className="text-white">Found {movies.length} results</div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
};

export default NavBar;
