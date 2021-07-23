import Head from "next/head";
// import styles from "../styles/Home.module.css";
import image from "../images/background.jpg";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

export default function Register(): JSX.Element {
  const [isPasswordType, setPasswordType] = useState(true);

  const defaultValues = {
    username: "",
    email: "",
    phoneno: "",
    password: "",
  };
  const [formValues, setFormValues] = useState({ ...defaultValues });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function clearForm() {
    setFormValues({ ...defaultValues });
  }

  const { username, email, phoneno, password } = formValues;
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

      <div className="flex flex-col w-5/12 h-screen px-16 py-24 md:py-12">
        <h1 className="mb-2 text-3xl font-black">Join Us!</h1>
        <p className="mb-10 text-md">
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
          <li className="relative w-20 mb-8 text-xl font-black tracking-tight custom-underline whitespace-nowrap">
            Sign In
          </li>

          <li className="flex ">
            <input
              name="username"
              value={username}
              type="text"
              className="w-full py-3 pl-6 mb-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </li>

          <li className="flex ">
            <input
              value={email}
              name="email"
              type="email"
              className="w-full py-3 pl-6 mb-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </li>

          <li className="flex ">
            <input
              value={phoneno}
              name="phoneno"
              type="text"
              className="w-full py-3 pl-6 mb-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Phone no"
              onChange={handleInputChange}
            />
          </li>

          <li className="flex">
            <input
              value={password}
              name="password"
              type={isPasswordType ? "password" : "text"}
              className="w-full py-3 pl-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Password"
              onChange={handleInputChange}
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
          <li className="flex items-center ">
            <span className="flex items-center justify-between w-48 mt-5">
              <label htmlFor="agree">
                Signup for our{" "}
                <span className="text-blue-600 underline hover:no-underline">
                  newsletter
                </span>{" "}
              </label>
              <input type="checkbox" name="agree" id="" required />
            </span>
          </li>
          <li className="flex flex-col items-center justify-between mt-10">
            <button
              className="px-6 py-4 transition duration-500 bg-blue-500  border-blue-700 rounded-lg border-b-6 active:border-0 active:mt-1.5 text-white font-black text-2xl"
              onClick={() => {
                console.log(formValues);
                clearForm();
              }}
            >
              Sign Up
            </button>

            <span className="mt-3">
              Or{" "}
              <span className="text-blue-600 underline hover:no-underline">
                <Link href="/login">Login </Link>
              </span>{" "}
              into an existing account
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
