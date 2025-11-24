interface LinkBtnProp {
  label: String;
  onClick: () => void;
}
export function LinkBtn({ label, onClick }: LinkBtnProp) {
  return (
    <div
      className="hover:bg-white/10 py-1 px-3 rounded-lg cursor-pointer transition duration-300 ease-in"
      onClick={onClick}
    >
      <div className="text-neutral-200 font-medium ">{label}</div>
    </div>
  );
}
