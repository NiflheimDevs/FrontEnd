import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes"; // Import the router
import { NotificationProvider } from "./Notification/NotificationProvider"; // Import the provider

const App = () => {
  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  );
};
export default App;
