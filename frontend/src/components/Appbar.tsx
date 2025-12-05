import { useEffect, useState } from "react";
import { Button } from "./buttons/Button";
import { LinkBtn } from "./buttons/LinkBtn";
import { useNavigate } from "react-router-dom";
export function Appbar() {
  const navigate = useNavigate();
  const [checkUser, setCheckUser] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCheckUser(true);
    }
  }, []);
  return (
    <div className="flex justify-between px-10 pt-5 text-white">
      <div
        className="text-xl font-bold cursor-pointer select-none"
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="text-gray-500">FK</span> Flowkit
      </div>

      {checkUser ? <AppBarDashUtility /> : <AppBarUtility />}
    </div>
  );
}

function AppBarUtility() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-5 items-center">
      <div>
        <LinkBtn label={"Contact Sales"} onClick={() => {}} />
      </div>
      <div>
        <LinkBtn
          label={"Log in"}
          onClick={() => {
            navigate("/Login");
          }}
        />
      </div>
      <div>
        <Button
          label={"Sign up"}
          onClick={() => {
            navigate("/Signup");
          }}
        />
      </div>
    </div>
  );
}

function AppBarDashUtility() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-5 items-center">
      <div>
        <LinkBtn label={"Contact Sales"} onClick={() => {}} />
      </div>
      <div>
        <LinkBtn
          label={"Dashboard"}
          onClick={() => {
            navigate("/Dashboard");
          }}
        />
      </div>
    </div>
  );
}
