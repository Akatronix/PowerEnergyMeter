import { Button } from "@/components/ui/button";
import { TbCurrencyNaira } from "react-icons/tb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useEffect, useState } from "react";
import { IoFlash } from "react-icons/io5";

const Expenses = () => {
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

  const [Amout, SetAmount] = useState("");
  const [totalCost, setTotalCost] = useState("0");

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

  function CaculateCost(e) {
    e.preventDefault();
    const amount = Number(Amout);
    const energy = Number(totalEnergy[0].totalEnergy);

    const cost = amount * energy;
    setTotalCost(cost);
    SetAmount("");
  }

  return (
    <div className="mt-10 w-full container mx-auto lg:px-[200px] px-3 pb-10 lg:pb-0">
      <p className="lg:text-3xl text-xl font-bold mb-4">Expenses</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Sockets</TableHead>
            <TableHead>Voltage (V)</TableHead>
            <TableHead>Current (A)</TableHead>
            <TableHead>Power (KW)</TableHead>
            <TableHead className="text-right">Energy (KWh)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allValue.map((items, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{names[index]}</TableCell>
              <TableCell>{items.voltage}</TableCell>
              <TableCell>{items.current}</TableCell>
              <TableCell>{items.power}</TableCell>
              <TableCell className="text-right">{items.energy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-10">
        <p className="text-slate-500">
          <IoFlash />
          Total Forwarded Energy:
        </p>
        <p>
          <span className="text-2xl font-bold">
            {totalEnergy[0].totalEnergy}{" "}
          </span>
          <span className="text-slate-500"> kwh</span>
        </p>
      </div>
      <div className="mt-3">
        <p className="flex items-center justify-start gap-4 flex-nowrap text-xl">
          cost:
          <span className="text-2xl flex items-center justify-center flex-nowrap">
            <TbCurrencyNaira className="text-slate-500 text-base font-normal" />{" "}
            {totalCost.toLocaleString()}
          </span>
        </p>
        <p className="mt-3">
          Enter the Amout of 1 kwh in your Area to caculate the cost
        </p>
        <form className="mt-3">
          <div>
            <input
              type="text"
              placeholder="₦100"
              value={Amout}
              onChange={(e) => SetAmount(e.target.value)}
              className="lg:w-1/5 flex-1 mr-4 py-2 px-4 bg-slate-800 rounded-md"
            />
            <Button
              className="bg-blue-500 py-2 px-4 text-white lg:w-[200px] w-[80px] hover:bg-blue-600 m-2 ml-0"
              onClick={(e) => {
                CaculateCost(e);
              }}
            >
              Caculate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Expenses;
