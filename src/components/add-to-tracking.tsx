import React from "react";

const AddToTracking = () => {
  /* Add to user-collection */
  return (
    <div className="group absolute z-[10] right-10 top-6 p-3 bg-white text-black flex items-center justify-center text-center font-medium text-lg rounded-full shadow-black/50 shadow-lg border border-white/40 cursor-pointer hover:scale-105 focus:scale-105 outline-none transition">
      +
      <div className="group-hover:flex hidden absolute top-[3rem] right-[-.2rem] w-[12rem] rounded-xl py-3 px-2 flex-col gap-3 bg-white/90 text-[1rem] font-medium">
        <p className="hover:bg-black/10 p-1">Playing</p>
        <p className="hover:bg-black/10 p-1">Want to play</p>
        <p className="hover:bg-black/10 p-1">Dropped</p>
        <p className="hover:bg-black/10 p-1">Completed</p>
      </div>
    </div>
  );
};

export default AddToTracking;
