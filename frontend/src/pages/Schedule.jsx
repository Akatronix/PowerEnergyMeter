import SetSchedule from "@/components/ui/SetSchedule";
import { useEffect, useState } from "react";

const Schedule = () => {
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

  const names = [
    "Socket one",
    "Socket two",
    "Socket three",
    "Socket four",
    "Socket five",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data/state");
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
  });

  return (
    <div className="lg:mt-20 mt-4 w-full container mx-auto lg:px-[200px]">
      <p className="lg:text-3xl text-xl ml-3 md:ml-0 font-bold mb-6">
        Schedule
      </p>
      {data.map((value, index) => (
        <SetSchedule value={value.socketData} key={index} name={names[index]} />
      ))}
    </div>
  );
};

export default Schedule;
