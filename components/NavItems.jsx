import Link from "next/link";
import colors from "@/app/colors/colors";
export default function NavItems({ linkTo, text }) {
  return (
    <>
      <Link href={linkTo}>
        <div className={`sm:ml-5 sm:mr-5 ml-2 mr-2 tracking-wider ${colors.KeyHoverText}`}>
          {text}
        </div>
      </Link>
    </>
  );
}