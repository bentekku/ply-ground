import { BiSolidHome } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { MdRecommend } from "react-icons/md";

export const links = [
  {
    name: "News",
    url: "/recommended",
    icon: MdRecommend,
  },
  {
    name: "Home",
    url: "/",
    icon: BiSolidHome,
  },
  // {
  //   name: "Random",
  //   url: "/random",
  //   icon: FaRandom,
  // },
  {
    name: "Trending",
    url: "/trending",
    icon: BsNewspaper,
  },
] as const;
