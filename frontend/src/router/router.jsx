import App from "@/App";
import Controls from "@/pages/Controls";
import HomePage from "@/pages/HomePage";
import Expense from "@/pages/Expense";
import { createBrowserRouter } from "react-router-dom";
import Schedule from "@/pages/Schedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/controls",
        element: <Controls />,
      },
      {
        path: "/expense",
        element: <Expense />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
    ],
  },
]);

export default router;
