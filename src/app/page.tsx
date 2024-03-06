"use client";

import { useEffect, useState } from "react";
import { BiSolidMemoryCard } from "react-icons/bi";
import { memory } from "@/data/Memory";
import { IconsItems } from "@/components/IconsItems";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Page = () => {
  const [active, setActive] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(0);
  const [listCard, setListCard] = useState<number[]>([]);
  const [check, setCheck] = useState<number[]>([]);
  const [confirm, setConfirm] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);
  const [final, setFinal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
      if (active) {
        if (confirm.length === 6) {
          setActive(false);
          setFinal(true);
        }
        setTime(time + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [active, time]);

  const handleReset = () => {
    setConfirm([]);
    setTime(0);
    setActive(false);
    setCount(0);
  };

  const handleFinal = () => {
    handleReset();
    setFinal(false);
  };

  const handleActiveCard = (cardId: number, id: number) => {
    if (active) {
      if (listCard.length < 2) {
        setListCard([...listCard, cardId]);
        if (listCard.includes(cardId)) {
          setCheck([]);
          alert("mesmo card");
        } else {
          if (check.includes(id)) {
            setCheck([]);
            setConfirm([...confirm, id]);
          } else if (check.length === 1) {
            setCheck([]);
          } else {
            setCheck([...check, id]);
          }
        }
      }

      console.log(listCard.length);

      if (listCard.length === 1) {
        setTimeout(() => {
          setListCard([]);
          setCount(count + 1);
        }, 1000);
      }
    } else {
      alert("tem iniciar antes");
    }
  };

  return (
    <div className="w-sreen h-screen bg-slated-100 flex flex-col justify-center items-center lg:flex-row">
      <div className="flex flex-col justify-between lg:mr-10">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-3xl text-fuchsia-500 font-bold">DevMomory</h1>
          <div className="text-sm text-sky-400 border-fuchsia-500 border-l-2 pl-3 pb-2">
            <p>made by @JoãoNaif</p>
            <p>powered by B7web</p>
          </div>
        </div>
        <div className="flex justify-between items-center lg:flex-col lg:items-start">
          <div className="flex flex-col my-6">
            <span className="text-sm text-sky-400">Tempo</span>
            <div className="text-3xl font-bold text-fuchsia-500">
              <p>{time} Seg</p>
            </div>
          </div>
          <div className="text-right lg:text-left">
            <span className="text-sm text-sky-400">Movimento</span>
            <div className="text-3xl font-bold text-fuchsia-500">{count}</div>
          </div>
        </div>
        <div className="flex lg:flex-col items-center lg:items-start gap-4">
          <button
            className="font-bold bg-gradient-to-tl to-fuchsia-500 via-purple-800 from-sky-400 text-white p-2 w-full rounded-md hover:from-indigo-900 hover:via-blue-600 hover:to-sky-400 hover:text-fuchsia-300 hover:transition-colors hover:duration-300 hover:ease-in my-3"
            onClick={() => setActive(true)}
          >
            Iniciar
          </button>
          <button
            onClick={handleReset}
            className="font-bold bg-gradient-to-tr to-fuchsia-500 via-purple-800 from-sky-400 text-white p-2 w-full rounded-md hover:from-indigo-900 hover:via-blue-600 hover:to-sky-400 hover:text-fuchsia-300 hover:transition-colors hover:duration-300 hover:ease-in"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-4 grid-rows-3 gap-2 ">
        {memory.map((item) => (
          <li
            key={item.cardId}
            onClick={() => handleActiveCard(item.cardId, item.id)}
            className={`lg:w-32 lg:h-32 md:w-24 md:h-24 w-16 h-16  rounded-lg flex justify-center items-center cursor-pointer  ${
              confirm.includes(item.id) === true
                ? "bg-gradient-to-tr to-fuchsia-500 via-purple-800 from-sky-400"
                : "bg-zinc-500 hover:border-indigo-700 hover:border-4"
            }`}
          >
            {listCard.includes(item.cardId) || confirm.includes(item.id) ? (
              <li>
                <IconsItems id={item.id} />
              </li>
            ) : (
              <BiSolidMemoryCard className={`text-4xl text-zinc-300`} />
            )}
          </li>
        ))}
      </ul>
      {final && (
        <div
          className="absolute w-screen h-screen lg:bg-black lg:bg-opacity-80 flex justify-center items-center
        bg-fuchsia-500
        "
        >
          <div className="lg:h-[500px] lg:w-[500px] p-2 lg:bg-gradient-to-tr lg:to-fuchsia-500 lg:via-purple-800 lg:from-sky-400 rounded-md">
            <h1 className="text-white text-2xl text-center mb-5 font-bold">
              Parabéns! <br /> Você conseguiu finalizar o desafio!
            </h1>
            <div className="flex">
              <div className="flex-1 text-white text-center">
                <h1 className="text-xl ">Seu tempo:</h1>
                <p className="text-5xl my-10">
                  {Math.floor(time / 60) >= 10
                    ? Math.floor(time / 60)
                    : `0${Math.floor(time / 60)}`}
                  :{time % 60 >= 10 ? time % 60 : `0${time % 60}`}
                </p>
                <p>
                  Data:{" "}
                  {date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear()}
                </p>
              </div>
              <div className="flex-1 text-white text-center">
                <h1 className="text-xl">Conseguiu em:</h1>
                <p className="text-5xl my-10">{count}</p>
                <p>mínimo de tentativa 6</p>
              </div>
            </div>
            <div className="text-center text-white mt-7">
              <h1 className="text-xl">Me segue na redes sociais</h1>
              <ul className="flex justify-center gap-4 text-4xl mt-3">
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/joaonaif/?hl=pt-br"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://github.com/JoaoNaif">
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/joaonaif/"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>
            <button
              className="bg-white text-fuchsia-600 border lg:text-white lg:bg-transparent w-full mt-10 py-3 text-3xl rounded-md  hover:bg-white hover:text-fuchsia-500 font-bold hover:transition-colors hover:duration-300 hover:ease-out "
              onClick={handleFinal}
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
