import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { ZapCell } from "../components/ZapCell";

import { Button } from "../components/buttons/Button";
import { Close } from "../components/svg/Close";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CreateBtn } from "../components/buttons/CreateBtn";
import { useNavigate } from "react-router-dom";

function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState<Trigger[]>([]);
  const [availableTriggers, setAvailableTriggers] = useState<Action[]>([]);

  useEffect(() => {
    async function main() {
      const getTrigger = await axios.get(
        `${BACKEND_URL}/api/v1/trigger/available`
      );
      setAvailableTriggers(getTrigger.data.availbleTrigger);

      const getAction = await axios.get(
        `${BACKEND_URL}/api/v1/action/available`
      );
      setAvailableActions(getAction.data.availbleActions);
    }

    main();
  }, []);
  return {
    availableActions,
    availableTriggers,
  };
}
type Trigger = {
  id: string;
  image: string;
  name: string;
};
type Action = {
  id: string;
  name: string;
  image: string;
};
export function ZapCreate() {
  const { availableActions, availableTriggers } =
    useAvailableActionsAndTriggers();

  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: number;
    name: string;
  }>();

  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      AvailableActionId: string;
      AvailableActionName: string;
      AvailableActionImage: string;
      metadata: any;
    }[]
  >([]);

  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null
  );

  const navigate = useNavigate();

  return (
    <div className="min-h-screen   bg-[#111116] pb-10  ">
      <Appbar />
      <div className="flex justify-end m-3 mr-10 mt-10">
        <CreateBtn
          children={"Publish"}
          onClick={async () => {
            if (!selectedTrigger?.id) return;

            console.log(selectedTrigger?.id);
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/zap`,
              {
                availableTriggerId: selectedTrigger.id,
                triggerMetadata: {},
                actions: selectedActions.map((a) => ({
                  availableActionId: a.AvailableActionId,
                  actionMetadata: a.metadata,
                })),
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            navigate("/Dashboard");
          }}
        />
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex justify-center w-full mt-7">
          <ZapCell
            name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
            image={selectedTrigger?.name ? availableTriggers[0].image : ""}
            index={1}
            onClick={() => {
              setSelectedModalIndex(1);
            }}
          />
        </div>
        <div className=" w-full mt-15">
          {selectedActions.map((action, index) => {
            return (
              <div key={index} className="flex justify-center mb-7">
                <ZapCell
                  name={
                    action.AvailableActionName
                      ? action.AvailableActionName
                      : "Action"
                  }
                  image={
                    action.AvailableActionImage
                      ? action.AvailableActionImage
                      : ""
                  }
                  index={action.index}
                  onClick={() => {
                    setSelectedModalIndex(action.index);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center w-full text-2xl font-bold">
          <Button
            onClick={() => {
              setSelectedActions((a) => [
                ...a,
                {
                  index: a.length + 2,
                  AvailableActionId: "",
                  AvailableActionName: "",
                  AvailableActionImage: "",
                  metadata: {},
                },
              ]);
            }}
            label="+"
          />
        </div>
      </div>
      {selectedModalIndex && (
        <div className=" flex items-center justify-center inset-0 pointer-events-none  overflow-auto ">
          <div className="absolute pointer-events-auto top-30">
            <Modal
              availableItems={
                selectedModalIndex == 1 ? availableTriggers : availableActions
              }
              index={selectedModalIndex}
              onSelect={(
                props: null | {
                  name: string;
                  id: any;
                  image: string;
                  metadata: any;
                }
              ) => {
                if (props === null) {
                  setSelectedModalIndex(null);
                  return;
                }
                if (selectedModalIndex == 1) {
                  setSelectedTrigger({
                    id: props.id,
                    name: props.name,
                  });
                } else {
                  setSelectedActions((a) => {
                    let newActions = [...a];
                    newActions[selectedModalIndex - 2] = {
                      index: selectedModalIndex,
                      AvailableActionId: props.id,
                      AvailableActionName: props.name,
                      AvailableActionImage: props.image,
                      metadata: props.metadata,
                    };
                    return newActions;
                  });
                }
                setSelectedModalIndex(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({
  index,
  onSelect,
  availableItems,
}: {
  index: number;
  onSelect: (
    props: null | { name: string; id: string; image: string; metadata: any }
  ) => void;
  availableItems: { id: string; name: string; image: string }[];
}) {
  const [step, setStep] = useState(0);
  const [selectedAction, setSelectedAction] = useState<{
    id: string;
    name: string;
    image: string;
    metadata: any;
  }>();
  const isTrigger = index == 1;

  return (
    <div className=" h-105 w-90 bg-linear-to-br from-[#1a1a21] to-[#111116] text-white border border-white/20 rounded-lg  ">
      <div className="flex justify-between px-5 pt-5 pb-3">
        <div className="font-semibold">{`Select ${
          index == 1 ? "Trigger" : "Action"
        }`}</div>
        <div
          onClick={() => {
            onSelect(null);
          }}
          className="hover:bg-slate-300/50 h-7 w-7 rounded-full flex justify-center items-center transition duration-200"
        >
          <Close />
        </div>
      </div>
      <div className="h-px bg-white/10"></div>
      <div className="mt-3 px-5 w-full">
        {step == 1 && selectedAction?.id === "email" && (
          <EmailSelector
            setMetadata={(metadata) => {
              onSelect({
                ...selectedAction,
                metadata,
              });
            }}
          />
        )}
        {step == 1 && selectedAction?.id === "sol" && (
          <SolanaSelector
            setMetadata={(metadata) => {
              onSelect({
                ...selectedAction,
                metadata,
              });
            }}
          />
        )}
        {step == 0 && (
          <div>
            {availableItems.map(({ id, name, image }) => {
              return (
                <div
                  key={id}
                  onClick={() => {
                    if (isTrigger) {
                      onSelect({
                        id,
                        name,
                        image,
                        metadata: {},
                      });
                    } else {
                      setStep((s) => s + 1);
                      setSelectedAction({
                        id,
                        name,
                        image,
                        metadata: {},
                      });
                    }
                  }}
                  className=" mt-2 bg-slate-200/5 p-2 rounded-lg flex items-center gap-3 hover:bg-slate-300/20 cursor-pointer transition duration-300"
                >
                  <div>
                    <img
                      src={image}
                      alt=""
                      width={25}
                      className="rounded-full"
                    />
                  </div>
                  <div className="font-normal">{name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function EmailSelector({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="w-full">
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder="To"
        className="border border-white/10  rounded-lg h-10 w-full mt-2 pl-2 focus:outline-none focus:ring-1 focus:ring-neutral-500  transition  duration-300"
      />
      <input
        onChange={(e) => {
          setBody(e.target.value);
        }}
        type="text"
        placeholder="body"
        className="mt-5 border border-white/10  rounded-lg h-10 w-full  pl-2 focus:outline-none focus:ring-1 focus:ring-neutral-500  transition  duration-300"
      />
      <div className="w-full flex justify-center mt-5 ">
        <Btn
          children="Send Email"
          onClick={() => {
            setMetadata({
              email,
              body,
            });
          }}
        />
      </div>
    </div>
  );
}

function SolanaSelector({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) {
  const [publicId, setPublicId] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div className=" text-white">
      <input
        onChange={(e) => {
          setPublicId(e.target.value);
        }}
        type="text"
        placeholder="To"
        className="border border-white/10  rounded-lg h-10 w-full mt-2 pl-2 focus:outline-none focus:ring-1 focus:ring-neutral-500  transition  duration-300"
      />
      <input
        onChange={(e) => {
          // const value = parseInt(e.target.value);
          const value = e.target.value;
          setAmount(value);
        }}
        type="text"
        placeholder="Amount"
        className="border border-white/10  rounded-lg h-10 w-full mt-5 pl-2 focus:outline-none focus:ring-1 focus:ring-neutral-500  transition  duration-300"
      />
      <div className="w-full flex justify-center mt-5 ">
        <Btn
          children="Send Solana"
          onClick={() => {
            setMetadata({
              publicId,
              amount,
            });
          }}
        />
      </div>
    </div>
  );
}

function Btn({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <div className="w-full">
      <div
        className="bg-linear-to-b from-[#292935] to-[#242431]  p-2 border-t border-white/20  w-full rounded-lg px-4 font-medium   text-white flex justify-center items-center"
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}
