import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { NotificationProvider } from "./Notification/NotificationProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider>
      <PersistGate persistor={persistor}>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </PersistGate>
    </MantineProvider>
  );
};
export default App;
