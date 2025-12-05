export function CreateBtn({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <div className="relative bg-linear-to-b from-neutral-200/30 to-transparent h-10 w-25 rounded-lg  pt-px cursor-pointer">
      <div
        className="bg-linear-to-b from-[#292935] to-[#242431]  p-2 min-w-fit w-25 rounded-lg px-4 font-medium absolute text-white flex justify-center items-center"
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}
