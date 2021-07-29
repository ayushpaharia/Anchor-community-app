import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import image from "../images/background.jpg";
import useForm from "../helpers/formHelper";
import Button from "../components/Button";

export default function Register(): JSX.Element {
  const [isPasswordType, setPasswordType] = useState<boolean>(true);

  const { formValues, handleInputChange, clearForm, fillTestValues } =
    useForm();

  const { username, email, phoneno, password } = formValues;
  async function registerUser() {
    try {
      await axios.post("/auth/register", {
        username,
        email,
        phoneno,
        password,
        passwordConfirmation: formValues.password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <image
        className="w-7/12 h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${image.src})` }}
      />

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
              name="phone no"
              type="text"
              className="w-full py-3 pl-6 mb-6 text-xl font-black border-black rounded-md border-3 placeholder-size"
              placeholder="Phoneno"
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
            <div className="flex space-x-8">
              <Button
                myActionFunction={registerUser}
                name="Sign Up"
                type="dark"
              />
              <Button
                myActionFunction={clearForm}
                name="Clear Form"
                style="pink"
              />
              <Button
                myActionFunction={fillTestValues}
                name="Prefill"
                style="red"
                type="dark"
              />
            </div>

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
