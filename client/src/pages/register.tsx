import Head from "next/head";
// import styles from "../styles/Home.module.css";
import image from "../images/background.jpg";
import { BiRightArrow } from "react-icons/bi";
export default function Register(): JSX.Element {
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

      <div className="flex flex-col w-5/12 px-16 py-24">
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
            Sign In
          </li>

          <li className="flex">
            <input
              type="text"
              className="w-full p-2 py-4 pl-6 mb-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Username"
            />
          </li>
          <li className="flex">
            <input
              type="text"
              className="w-full p-2 py-4 pl-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Password"
            />
          </li>
          <li className="flex flex-col items-center justify-center mt-10">
            <button className="p-6 bg-black rounded-lg ">
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
