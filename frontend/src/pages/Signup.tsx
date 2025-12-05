import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-[#111116] min-h-screen  flex flex-col ">
      <Appbar />
      <div className=" flex-1  flex justify-center items-center  ">
        <div className="h-fit min-h-20 w-110 bg-linear-to-br from-[#1a1a21] to-[#111116] rounded-xl p-5 py-10 text-white border border-neutral-600/50">
          <div>
            <div className=" font-medium text-xl">Welcome to Zapier</div>
            <span className="font-light text-neutral-400">
              Your personalised automation workflow
            </span>
          </div>
          <div className="mt-8">
            <h1>Name</h1>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your Name"
              className="border border-white/10  rounded-lg h-10 w-full mt-2 pl-2 focus:outline-none focus:ring-1 focus:ring-neutral-500  transition  duration-300"
            />
          </div>
          <div className="mt-4">
            <h1>Email</h1>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Your Email"
              className="border border-white/10  rounded-lg h-10 w-full mt-2 pl-2 focus:outline-none focus:ring-1 focus:ring-neutral-500  transition  duration-300"
            />
          </div>
          <div className="mt-4">
            <h1>Password</h1>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className="border border-white/10 rounded-lg h-10 w-full mt-2 pl-2 focus:outline-none focus:ring-1 focus:ring-neutral-500  transition  duration-300"
            />
          </div>
          <div className="relative bg-linear-to-b from-neutral-200/30 to-transparent w-full h-10 rounded-lg -top-1  mt-10 pt-px ">
            <button
              className="cursor-pointer flex absolute justify-center w-full bg-linear-to-b from-[#20202a] to-[#17171d] p-2 rounded-lg shadow-black/50 shadow-md  select-none"
              onClick={async () => {
                const res = await axios.post(
                  `${BACKEND_URL}/api/v1/user/signup`,
                  {
                    username: email,
                    password: password,
                    name: name,
                  }
                );
                navigate("/Login");
              }}
            >
              Get started free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
