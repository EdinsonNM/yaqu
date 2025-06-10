import { RouteObject } from "react-router-dom";
import WaterUsers from "./water-users";
import WaterUsersList from "./list/water-users-list";

export const waterUsersRoutes: RouteObject[] = [
  {
    path: "water-users",
    element: <WaterUsers />,
    children: [
      {
        path: "",
        element: <WaterUsersList />,
      },
    ],
  },
];
