import { FC } from "react";

type Props = {
  navbarComponent: FC;
  children?: any;
};

const NormalPage: FC<Props> = (props: Props) => {
  return (
    <div>
      <props.navbarComponent />
      {props.children}
    </div>
  );
};

export default NormalPage;
