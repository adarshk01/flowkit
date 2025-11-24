import { Button } from "./buttons/Button";

export function HeroSection() {
  return (
    <div className="mt-15 relative">
      <div className="flex justify-center ">
        <div className="flex gap-2 items-center border  border-white/20 w-fit p-1.5 px-5 rounded-full bg-linear-to-r from-white/20 to-transparent to-30% text-neutral-400">
          <div className="flex items-center">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <span className="flex items-center"> Experience the Future</span>
        </div>
      </div>

      <div className="flex justify-center mt-5 ">
        <span className="bg-radial from-white from-50% to-gray-200/60 to-80% text-transparent bg-clip-text text-7xl/20 font-bold w-190 text-center tracking-tight">
          Create, Automate and Scale Faster with AI
        </span>
      </div>
      <div className="flex justify-center mt-10">
        <span className="w-125 text-center text-neutral-300/80">
          Automate tasks, streamline workflows, and save hours with Al built to
          understand your needs and scale with your team.
        </span>
      </div>

      <div className="flex justify-center mt-10 gap-2.5">
        <div>
          <Button
            label={"Start For Free"}
            onClick={() => {
              console.log("hello");
            }}
          />
        </div>
        <div>
          <button className="flex justify-center items-center bg-neutral-500 border border-white/60 rounded-full h-9 w-fit px-4 cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
      <div
        className="flex justify-center mt-30 "
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        }}
      >
        <div
          className="w-full h-40 bg-white opacity-25  "
          style={{
            clipPath: "path('M 80,80 Q 750,-50 1420,80 Q 750,-40 80,80 Z')",
          }}
        ></div>
        <div
          className=" bg-linear-to-r from-gray-600/80 from-35% via-white via-50% to-gray-600/80 to-65% h-40 w-full absolute "
          style={{
            clipPath: "path('M 350,40 Q 750,-12 1150,40 Q 750,0 350,40 Z')",
          }}
        ></div>
      </div>
      <div
        className="flex justify-center relative -top-45 blur-2xl  "
        // style={{ filter: "blur(20px)" }}
      >
        <div
          className="h-40 w-full bg-white opacity-35 absolute "
          style={{
            clipPath: "polygon(50% 0%, 0% 60%, 50% 25%, 100% 60%)",
          }}
        ></div>
        <div
          className="h-40 w-full bg-white opacity-35 absolute "
          style={{
            clipPath: "polygon(50% 0%, 35% 30%, 50% 30%, 65% 30%)",
          }}
        ></div>
      </div>
      <div className="flex justify-center relative -top-45 blur">
        {" "}
        <div
          className="w-full h-40 bg-white   absolute top-6 "
          style={{
            clipPath: "path('M 80,80 Q 750,-50 1420,80 Q 750,-40 80,80 Z')",
          }}
        ></div>
      </div>
    </div>
  );
}
{
  /* <div
          className="w-full h-50 rounded-full bg-red-800 absolute"
          style={{
            // maskImage: "ellipse(50% 45% at 50% 51%)",
            // WebkitMaskImage: "ellipse(50% 45% at 50% 51%)",
            // mask-[linear-gradient(to_bottom,black_7%,transparent_20%)]
            clipPath: "ellipse(41% 45% at 50% 52%)",
          }}
        ></div> */
}

{
  /* <div
className="w-full h-50 rounded-full bg-white  "
style={{
  WebkitMaskImage: `
  radial-gradient(ellipse 60% 50% at 50% 50%, black 100%, transparent 101%),
  radial-gradient(ellipse 40% 43% at 50% 50%, black 100%, transparent 101%)
`,

  clipPath: "ellipse(40% 45% at 50% 50%)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
}}
></div> */
}
// M 0,100 L 25,50 L 50,0 L 75,50 L 100,100 A

// M 80,80 L 325,20 L 750,0 L 1175,20 L 1420,80 Z'

//to be implemented

// <div className="flex justify-center mt-30 relative">
//   <svg
//     className="w-full h-40"
//     viewBox="0 0 1500 80"
//     preserveAspectRatio="none"
//   >
//     <defs>
//       <clipPath id="wave1">
//         <path d="M 80,80 Q 750,-50 1420,80 Q 750,-40 80,80 Z" />
//       </clipPath>
//       <clipPath id="wave2">
//         <path d="M 350,40 Q 750,-12 1150,40 Q 750,0 350,40 Z" />
//       </clipPath>
//     </defs>

//     <rect
//       width="100%"
//       height="100%"
//       fill="white"
//       opacity="0.25"
//       clipPath="url(#wave1)"
//     />
//     <rect
//       width="100%"
//       height="100%"
//       className="fill-gradient"
//       clipPath="url(#wave2)"
//     />
//   </svg>
// </div>
