import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import postData from "@/hooks/PostRequest";
import LoadingModal from "./Loading";

const SetSchedule = ({ value, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState("");
  const [action, setAction] = useState("");

  function validateTime(mytime) {
    const regex = /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]\s?(AM|PM|am|pm)$/;
    return regex.test(mytime);
  }

  function schedulTime() {
    console.log(action);
    console.log(time);
    if (validateTime(time)) {
      if (action || action == "ON") {
        setIsLoading(true);
        postData("https://power-energy-meter.vercel.app/data/update/timer", {
          socketName: name,
          time: time,
          action: action,
        })
          .then((result) => {
            setTimeout(() => {
              setIsLoading(false);
              toast("Timer set Successfully");
              setTime(" ");
            }, 1000);
          })
          .catch((error) => {
            console.error("Error:", error);
            setIsLoading(false);
            toast("Something Went Wrong!");
          });
      } else {
        toast(
          "You cant set a timer without an action, make sure you are selecting and action (ON or OFF)!"
        );
      }
    } else {
      toast(
        "Invalid time format! Please use HH:mm:ss AM or PM. and make sure you are enter the correct time format!"
      );
    }
  }
  return (
    <div className="flex items-center justify-between lg:mb-10 flex-wrap border-b-2 pb-3 md:border-none mb-10 mx-2 md:mx-0">
      <div className="flex items-center justify-start gap-10">
        <p className="text-slate-500 m-3 md:m-0">{name}</p>
        <p>
          <span className="text-slate-500">state:</span> {value}
        </p>
        <div></div>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2 flex-wrap m-4 md:m-0">
          <Label>Time</Label>
          <Input
            type="email"
            id="email"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            placeholder="02:00:10 PM"
            className="md:w-full w-[80%] ml-9 md:flex-1 mr-4 py-2 px-4 bg-slate-800 rounded-md "
          />
          <Select
            className="md:flex-1 w-[70%]"
            onValueChange={(e) => setAction(e)}
          >
            <SelectTrigger className="lg:flex-1 w-[80%]  py-2   lg:px-4  bg-slate-800 rounded-md ml-4">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ON">ON</SelectItem>
              <SelectItem value="OFF">OFF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full md:w-0">
        <Button
          className="bg-blue-500 py-2 px-4 text-white w-[100px]  mt-4 md:mt-0 ml-4 hover:bg-blue-600"
          onClick={() => {
            schedulTime();
          }}
        >
          Schedule
        </Button>
      </div>
      <LoadingModal isLoading={isLoading} />
    </div>
  );
};

export default SetSchedule;
