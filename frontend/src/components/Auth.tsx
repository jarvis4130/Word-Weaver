import { SignupInput } from "@jarvis_4130/medium-common";
import { ChangeEvent, useState } from "react";
import AuthHeader from "./AuthHeader";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      let jwt;
      if (type === "signup") {
        jwt = res.data.jwt;
      } else {
        jwt = res.data;
      }
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <AuthHeader type={type === "signup" ? "signup" : "signin"} />
          <div className=" mx-2 lg:mx-0 pt-4">
            {type === "signup" ? (
              <Input
                label="Name"
                type={"text"}
                placeholder="Atharva Adam..."
                onChange={(e) =>
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }))
                }
              />
            ) : null}
            <Input
              label="Email"
              placeholder="atharvaadam101010@gmail.com"
              type={"email"}
              onChange={(e) =>
                setPostInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }))
              }
            />
            <Input
              label="Password"
              type={"password"}
              placeholder="password."
              onChange={(e) =>
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }))
              }
            />
            <button
              type="button"
              onClick={sendRequest}
              className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

interface InputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function Input({ label, placeholder, onChange, type }: InputType) {
  return (
    <div className="py-2">
      <label className="block mb-2 text-sm font-medium text-black">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
