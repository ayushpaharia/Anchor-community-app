import React from "react";

interface MyProps {
  myActionFunction: () => void;
  name: string;
  style?: string;
  type?: string;
}

const Button: React.FC<MyProps> = ({
  myActionFunction,
  name,
  style = "blue",
  type = "light",
}) => {
  // Colors can be gray - red - yellow - green - blue - indigo - purple - pink
  return (
    <>
      <button
        className={`px-6 py-4  bg-${style}-${
          type === "light" ? "300" : "500"
        } border-${style}-${
          type === "light" ? "500" : "700"
        } rounded-lg border-b-6 active:border-0 active:mt-1.5 text-white font-black xl:text-2xl whitespace-nowrap 
        lg:text-xl md:text-lg sm:text-xl xs:text-3xl
        `}
        onClick={() => {
          myActionFunction();
        }}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
