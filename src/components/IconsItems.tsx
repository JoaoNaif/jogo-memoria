import {
  FaBasketball,
  FaBitcoinSign,
  FaCloud,
  FaCookie,
  FaHeart,
  FaHorseHead,
} from "react-icons/fa6";

type Props = {
  id: number;
};

export const IconsItems = ({ id }: Props) => {
  return (
    <div className="text-4xl">
      {id === 1 && <FaBasketball />}
      {id === 2 && <FaHorseHead />}
      {id === 3 && <FaBitcoinSign />}
      {id === 4 && <FaCloud />}
      {id === 5 && <FaHeart />}
      {id === 6 && <FaCookie />}
    </div>
  );
};
