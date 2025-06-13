import React from "react";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  return (
    <div className="flex justify-between p-8 ">
      <h1 className="text-3xl font-bold text-black dark:text-white">InferIQ</h1>
      <ModeToggle />
    </div>
  );
}

export default Navbar;
