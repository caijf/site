import { createContext } from "react";

// {
//   menuData: array,
//   routeData: array,
//   title: string,
//   collapsed: boolean,
//   routeProps: {
//     location,
//     history,
//     match
//   }
// }
const routeContext = createContext({});

export default routeContext;
