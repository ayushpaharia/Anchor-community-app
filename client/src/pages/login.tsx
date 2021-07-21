import Head from "next/head";
// import styles from "../styles/Home.module.css";
import image from "../images/background.jpg";
import { BiRightArrow } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";

export default function Register(): JSX.Element {
  const [isPasswordType, setPasswordType] = useState(true);
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="w-7/12 h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${image.src})` }}
      ></div>

      <div className="flex flex-col w-5/12 h-screen px-16 py-24 lg:py-24 md:py-12">
        <h1 className="mb-2 text-5xl font-black">Join Us!</h1>
        <p className="mb-10 text-lg">
          By signing up you agree to our <br />
          <span className="text-blue-600 underline hover:no-underline">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="text-blue-600 underline hover:no-underline">
            Terms and Conditions
          </span>{" "}
          <br />
          Senpai ...
        </p>
        <ul className="flex flex-col justify-between h-full">
          <li className="relative w-20 mb-8 text-3xl font-black tracking-tight custom-underline whitespace-nowrap">
            Log In
          </li>

          <li className="flex ">
            <input
              type="text"
              className="w-full p-2 py-4 pl-6 mb-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Username"
            />
          </li>
          <li className="flex">
            <input
              type={isPasswordType ? "password" : "text"}
              className="w-full p-2 py-4 pl-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Password"
            />
            <span
              className="my-auto absoulte negative-margin-left"
              onClick={() => {
                setPasswordType((prevType) => !prevType);
              }}
            >
              {isPasswordType ? (
                <AiOutlineEyeInvisible size="2em" />
              ) : (
                <AiOutlineEye size="2em" />
              )}
            </span>
          </li>
          <li className="flex flex-col items-center justify-between mt-10">
            <button className="p-6 bg-black border-gray-700 rounded-lg border-b-6 active:border-0 active:mt-1.5 ">
              <BiRightArrow color="white" />
            </button>

            <span className="mt-3">
              Or{" "}
              <span className="text-blue-600 underline hover:no-underline">
                Create a new account
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
