import { useEffect, useState } from "react";
import Socket from "@/components/ui/Socket";
import { IoFlash } from "react-icons/io5";

const HomePage = () => {
  const [error, setError] = useState("");
  const [allValue, setAllValue] = useState([
    {
      name: "socket One",
      current: "0",
      voltage: "0",
      power: "0",
      energy: "0",
    },
    {
      name: "socket two",
      current: "0",
      voltage: "0",
      power: "0",
      energy: "0",
    },
    {
      name: "socket three",
      current: "0",
      voltage: "0",
      power: "0",
      energy: "0",
    },
    {
      name: "socket four",
      current: "0",
      voltage: "0",
      power: "0",
      energy: "0",
    },
    {
      name: "socket five",
      current: "0",
      voltage: "0",
      power: "0",
      energy: "0",
    },
  ]);
  const [totalEnergy, setTotalEnergy] = useState([{ totalEnergy: "0" }]);

  const names = [
    "Socket One",
    "Socket Two",
    "Socket Three",
    "Socket Four",
    "Socket Five",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://power-energy-meter.vercel.app/data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setAllValue(result["data"]);
        setTotalEnergy(result["totalEnergy"]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="lg:mt-20 mt-5 w-full container mx-auto lg:px-[150px] p-3 pb-20 md:pb-0">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-4 gap-2">
        <div className="lg:col-span-3 md:col-span-2">
          <div className="bg-slate-800 w-full p-12 rounded-md">
            <p>
              <IoFlash />
              Total Forwarded Energy
            </p>
            <p className="text-5xl font-bold">
              {totalEnergy[0].totalEnergy==0?"0.00":totalEnergy[0].totalEnergy}{" "}
              <span className="text-base font-normal text-slate-500">KWh</span>
            </p>
          </div>
        </div>
        {/* Render Socket components */}
        {allValue.map((items, index) => (
          <Socket
            key={index}
            current={items.current}
            voltage={items.voltage}
            power={items.power}
            energy={items.energy}
            name={names[index]}
          />
        ))}
      </div>
      {error && <p className="text-red-500 mt-5">Error: {error}</p>}
    </div>
  );
};

export default HomePage;
