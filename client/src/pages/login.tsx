import Head from "next/head";
import image from "../images/background.jpg";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineTwitter,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";

export default function Register(): JSX.Element {
  const [isPasswordType, setPasswordType] = useState(true);

  const defaultValues = {
    username: "",
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
  const { username, password } = formValues;

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
        <ul className="flex flex-col h-full">
          <li className="relative w-20 mb-12 text-3xl font-black tracking-tight custom-underline whitespace-nowrap">
            Log In
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

          <li className="flex">
            <input
              value={password}
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

          <li className="flex justify-center mt-10 space-x-10">
            <button className="p-3 bg-gray-100 border-gray-300 rounded-lg border-b-6 active:border-0 active:mt-1.5">
              <FcGoogle size="2em" />
            </button>
            <button className="p-3 bg-blue-300 border-blue-500 rounded-lg border-b-6 active:border-0 active:mt-1.5">
              <AiOutlineTwitter size="2em" color="white" />
            </button>
            <button className="p-3 bg-black border-gray-500 rounded-lg border-b-6 active:border-0 active:mt-1.5">
              <AiFillGithub size="2em" color="white" />
            </button>
          </li>
          <li className="flex-grow"></li>

          <li className="flex flex-col items-center justify-between mt-10">
            <button
              className="px-6 py-4  bg-black border-gray-700 rounded-lg border-b-6 active:border-0 active:mt-1.5 text-white font-black text-2xl"
              onClick={() => {
                console.log(formValues);
                clearForm();
              }}
            >
              Login
            </button>

            <span className="mt-3">
              Or{" "}
              <span className="text-blue-600 underline hover:no-underline">
                <Link href="/register">Create a new account </Link>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
