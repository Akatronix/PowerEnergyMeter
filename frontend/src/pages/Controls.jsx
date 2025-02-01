import SocketControl from "@/components/ui/SocketControl";
import React, { useEffect, useState } from "react";

const Controls = () => {
  const [data, setData] = useState([
    {
      _id: "67506a4928183e6cc7c87043",
      socketName: "socket one",
      socketData: "ON",
      timestamp: "2024-12-04T14:42:17.347Z",
      __v: 0,
    },
    {
      _id: "67506a6128183e6cc7c87045",
      socketName: "socket two",
      socketData: "OFF",
      timestamp: "2024-12-04T14:42:41.560Z",
      __v: 0,
    },
    {
      _id: "67506a6e28183e6cc7c87047",
      socketName: "socket three",
      socketData: "OFF",
      timestamp: "2024-12-04T14:42:54.356Z",
      __v: 0,
    },
    {
      _id: "67506a7328183e6cc7c87049",
      socketName: "socket four",
      socketData: "ON",
      timestamp: "2024-12-04T14:42:59.656Z",
      __v: 0,
    },
    {
      _id: "67506a7c28183e6cc7c8704b",
      socketName: "socket five",
      socketData: "OFF",
      timestamp: "2024-12-04T14:43:08.396Z",
      __v: 0,
    },
  ]);
  const [error, setError] = useState("");

  // const values = Object.values(data[0]);
  const names = [
    "socket one",
    "socket two",
    "socket three",
    "socket four",
    "socket five",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://power-energy-meter.vercel.app/data/state");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="lg:mt-20 mt-5 w-full container mx-auto lg:px-[200px] p-3  text-center md:text-start">
      <p className="lg:text-3xl text-base font-bold mb-6">Control the Socket</p>
      <div>
        {data.map((value, index) => (
          <SocketControl
            value={value.socketData}
            key={index}
            name={names[index]}
            id={value._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Controls;
