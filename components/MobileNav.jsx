import NavItems from "./NavItems";

export default function MobileNav() {
  return (
    <div className="w-full h-full text-[#111111] border-[#BBBBBB] border-b-[1px] bg-[#EEEEEE] relative text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[22px] justify-center flex items-center">
        <div className="flex items-center justify-center w-full relative h-full text-[10px]">
        <NavItems linkTo="/chemistry" text="Physics" />
          <NavItems linkTo="/chemistry" text="Chemistry" />
          <NavItems linkTo="/chemistry" text="Math" />
          <NavItems linkTo="/chemistry" text="Biology" />
          <NavItems linkTo="/chemistry" text="Bangla" />
        </div>
    </div>
  );
}