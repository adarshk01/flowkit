import { Button } from "./buttons/Button";
import { LinkBtn } from "./buttons/LinkBtn";
import { useNavigate } from "react-router-dom";
export function Appbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-10 pt-5 text-white">
      <div
        className="text-xl font-bold cursor-pointer select-none"
        onClick={() => {
          navigate("/");
        }}
      >
        Flowkit
      </div>
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
    </div>
  );
}
