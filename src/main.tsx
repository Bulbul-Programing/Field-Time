import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store.ts";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
