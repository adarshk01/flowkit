export function ZapCell({
  name,
  index,
  image,
  onClick,
}: {
  name?: string;
  index: number;
  image: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="border border-white/12 flex text-white max-w-sm w-full items-center justify-start gap-1.5 p-6 rounded-xl bg-linear-to-br from-[#1a1a21] to-[#111116] cursor-pointer"
    >
      <div className="h-7 w-7 bg-purple-900/40 rounded-sm mr-3 ">
        <img src={image} alt="" />
      </div>
      <div className="font-semibold">{index}.</div>
      <div className="font-semibold">{name}</div>
    </div>
  );
}
