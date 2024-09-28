const Divider = () => {
  return (
    <div className="flex items-center justify-center  my-[4rem] gap-2">
      <div className="w-[16rem] h-[1px] bg-gradient-to-l from-white to-transparent glow-white-box"></div>
      <div className="w-[1.9rem] h-[1.9rem] bg-white relative rounded-full ">
        <div className="w-[1.8rem] h-[1.8rem] bg-black absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full -translate-y-1/2">
          <div className="w-[1rem] h-[1rem] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 rounded-full -translate-y-1/2 opacity-90 "></div>
        </div>
      </div>
      <div className="w-[16rem] h-[1px] bg-gradient-to-r from-white to-transparent glow-white-box"></div>
    </div>
  );
};
export default Divider;
