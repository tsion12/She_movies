import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";

const StarRating = ({
  maxRating = 3,
  setHoverRating,
  starRating,
  setStarRating,
  hoverRating,
}) => {
  return (
    <div className="bg-slate-700 mx-10 rounded-md p-5 flex items-center space-x-2 justify-center">
      {Array.from({ length: maxRating }, (_, i) =>
        hoverRating > i || starRating > i ? (
          <IoIosStar
            key={i}
            className="text-yellow-400"
            onClick={() => {
              setStarRating(i + 1);
            }}
            onMouseEnter={() => {
              setHoverRating(i + 1);
            }}
            onMouseLeave={() => {
              setHoverRating(0);
            }}
          />
        ) : (
          <FaRegStar
            key={i}
            className="text-yellow-400"
            onClick={() => {
              setStarRating(i + 1);
            }}
            onMouseEnter={() => {
              setHoverRating(i + 1);
            }}
            onMouseLeave={() => {
              setHoverRating(0);
            }}
          />
        )
      )}
      <p className="text-white text-xs">{hoverRating || starRating || ""}</p>
    </div>
  );
};

export default StarRating;
