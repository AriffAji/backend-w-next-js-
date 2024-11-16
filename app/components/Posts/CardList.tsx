import { ReactNode } from "react";

const CardList = ({ children }: { children: ReactNode }) => {
  return <div className="bg-[tomato] w-full p-4">{children}</div>;
};

export default CardList