import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="pt-16 ">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Learn anything, anytime, anywhere</h1>
        <p className="text-sm md:text-base text-gray-500">
          ncididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam <br /> aliqua proident excepteur commodo do ea.
        </p>
      </div>
      <div className="mt-8 flex justify-center gap-5">
        <button className="bg-blue-600 rounded text-white md:px-8 px-5 md:py-3 py-2 mx-1">Get Started</button>
        <button className="flex items-center gap-2">Learn more <span><img src={assets.arrow_icon} alt="" /></span></button>
      </div>
    </div>
  );
};

export default CallToAction;
