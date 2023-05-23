import NavBar from "@/components/navbar";
import NormalPage from "@/components/page/NormalPage";
import { FC } from "react";

type Props = {};

const HomeLayout: FC<Props> = ({}) => {
  return <NormalPage navbarComponent={() => <NavBar />}></NormalPage>;
};

export default HomeLayout;
