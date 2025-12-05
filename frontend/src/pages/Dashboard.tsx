import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { CreateBtn } from "../components/buttons/CreateBtn";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { LinkBtn } from "../components/buttons/LinkBtn";
import { useNavigate } from "react-router-dom";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

export function Dashboard() {
  const { loading, zaps } = useZaps();
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-b from-[#111116] to-[#2c2c35] min-h-screen h-fit">
      <Appbar />
      <div className="mt-10 flex justify-center ">
        <div className="flex justify-between w-full max-w-screen-lg">
          <div className="text-white font-bold text-2xl">My Zaps</div>
          <CreateBtn
            onClick={() => {
              navigate("/Zap/Create");
            }}
          >
            + Create
          </CreateBtn>
        </div>
      </div>{" "}
      <div className="text-white">
        {loading ? (
          "Loading..."
        ) : (
          <div className="flex justify-center w-full mt-5">
            {" "}
            <Zaptable zaps={zaps} />
          </div>
        )}
      </div>
    </div>
  );
}

function Zaptable({ zaps }: { zaps: Zap[] }) {
  const navigate = useNavigate();
  return (
    <div className="p-7 max-w-5xl w-full border-b border-blue-400/80 bg-[#202031]/30 rounded-2xl ">
      <div className="flex ">
        <div className="flex-1">Name</div>
        <div className="flex-1">ID</div>
        <div className="flex-1">Created At</div>
        <div className="flex-1 ">Go</div>
      </div>

      {zaps.map((z, index) => {
        return (
          <div
            key={index}
            className={`flex ${
              zaps.length - 1 == index
                ? "pt-4"
                : "border-b border-white/10   py-4"
            }`}
          >
            <div className="flex-1 flex h-6 gap-1.5">
              <img src={z.trigger.type.image} alt="" />
              {z.actions.map((x) => (
                <img src={x.type.image} alt="" />
              ))}
            </div>
            <div className="flex-1">{z.id}</div>
            <div className="flex-1">Nov 15, 2025</div>
            <div className="flex-1">
              <LinkBtn
                label={"Go"}
                onClick={() => {
                  navigate(`/Zap/${z.id}`);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
