import { Button } from "./button";
import postData from "@/hooks/PostRequest";
import LoadingModal from "./Loading";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const SocketControl = ({ name, value, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap">
      <div className="flex items-center justify-start gap-10">
        <p className="text-slate-500">{name}</p>
        <p>
          <span className="text-slate-500">state:</span> {value}
        </p>
      </div>
      <div className="flex m-4 md:m-0 ml-0 w-full items-center lg:w-0 justify-center md:w-0 md:items-start md:justify-start lg:pr-[110px]">
        <Button
          className="bg-blue-500 py-2 px-4 rounded-md text-white lg:w-[100px] flex-1 mr-3 hover:bg-blue-600"
          onClick={() => {
            setIsLoading(true);
            postData("http://localhost:8000/data/update/controls", {
              id,
              socketData: "ON",
            })
              .then((result) => {
                setTimeout(() => {
                  setIsLoading(false);
                  toast("Turned  ON Successfully...");
                }, 1000);
              })
              .catch((error) => {
                console.error("Error:", error);
                setIsLoading(false);
                toast("Something Went Wrong!");
              });
          }}
        >
          ON
        </Button>
        <Button
          className="bg-blue-500 py-2 px-4 text-white  rounded-md lg:w-[100px] flex-1 hover:bg-blue-600"
          onClick={() => {
            setIsLoading(true);
            postData("http://localhost:8000/data/update/controls", {
              id,
              socketData: "OFF",
            })
              .then((result) => {
                setTimeout(() => {
                  setIsLoading(false);
                  toast("Turned  OFF Successfully...");
                }, 1000);
              })
              .catch((error) => {
                console.error("Error:", error);
                setIsLoading(false);
                toast("Something Went Wrong!");
              });
          }}
        >
          OFF
        </Button>
      </div>
      <LoadingModal isLoading={isLoading} />
    </div>
  );
};

export default SocketControl;
