import React from "react";

const Socket = ({ current, voltage, power, energy, name }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-md text-slate-200">
      <div>
        <p className="w-full text-center mb-2 text-slate-500">{name}</p>
        <div className="grid grid-col-2 grid-flow-col gap-2 w-full mb-4">
          <div className="w-full text-center  border-r-2 border-slate-500">
            <p className="text-slate-500">Voltage (v)</p>
            <p className="text-2xl font-bold">{voltage}</p>
          </div>
          <div className="w-full text-center ">
            <p className="text-slate-500">Power (KW)</p>
            <p className="text-2xl font-bold">{power}</p>
          </div>
        </div>
        <div className="grid grid-col-2 grid-flow-col gap-2 w-full">
          <div className="w-full text-center  border-r-2 border-slate-500 pr-2">
            <p className="text-slate-500">current (A)</p>
            <p className="text-2xl font-bold">{current}</p>
          </div>
          <div className="w-full text-center">
            <p className="text-slate-500">Energy(KWh)</p>
            <p className="text-2xl font-bold">{energy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socket;
