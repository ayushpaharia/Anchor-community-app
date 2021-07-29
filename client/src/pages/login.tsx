import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { AiOutlineTwitter, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import image from "../images/background.jpg";
import Button from "../components/Button";
import useForm from "../helpers/formHelper";

export default function Register(): JSX.Element {
  const [isPasswordType, setPasswordType] = useState(true);

  const { formValues, handleInputChange, clearForm, fillTestValues } =
    useForm();

  async function login() {
    try {
      await axios.post("/auth/register", {
        password: formValues.password,
        username: formValues.username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const { username, password } = formValues;

  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <image
        className="w-7/12 h-screen bg-center bg-cover xs:hidden sm:block"
        style={{ backgroundImage: `url(${image.src})` }}
      />

      <div className="flex flex-col h-screen px-16 py-24 lg:py-24 md:py-12 xs:w-screen sm:w-5/12">
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
              name="password"
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
            <button className="p-3 bg-gray-100 border-gray-300 rounded-lg border-b-6 active:border-0 active:mt-1.5 xs:text-3xl xl:text-3xl lg:text-2xl ">
              <FcGoogle />
            </button>
            <button className="p-3 bg-blue-300 border-blue-500 rounded-lg border-b-6 active:border-0 active:mt-1.5 xs:text-3xl xl:text-3xl lg:text-2xl">
              <AiOutlineTwitter color="white" />
            </button>
            <button className="p-3 bg-black border-gray-500 rounded-lg border-b-6 active:border-0 active:mt-1.5 xs:text-3xl xl:text-3xl lg:text-2xl">
              <AiFillGithub color="white" />
            </button>
          </li>
          <li className="flex-grow"></li>

          <li className="flex justify-center mt-10 ">
            <div className="flex flex-row space-x-8 ">
              <Button
                myActionFunction={clearForm}
                name="Clear Form"
                style="yellow"
              />
              {/* <Button myActionFunction={login} name="Login" style="green" /> */}
              {/* <Button
                myActionFunction={fillTestValues}
                name="Prefill"
                style="purple"
                type="dark"
              /> */}
            </div>
          </li>
          <li className="flex justify-center">
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
