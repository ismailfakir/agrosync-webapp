import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, type AlertColor, Stack } from "@mui/material";

/**
 * Alert model
 */
export interface GlobalAlert {
  id: string;
  severity: AlertColor;
  message: string;
  autoHideDuration?: number;
}

interface GlobalAlertContextValue {
  showAlert: (alert: Omit<GlobalAlert, "id">) => void;
}

const GlobalAlertContext = createContext<GlobalAlertContextValue | undefined>(
  undefined,
);

export const useGlobalAlert = () => {
  const ctx = useContext(GlobalAlertContext);
  if (!ctx) {
    throw new Error("useGlobalAlert must be used within GlobalAlertProvider");
  }
  return ctx;
};

export const GlobalAlertProvider: React.FC<{
  children: React.ReactNode;
  stackDirection?: "down" | "up";
}> = ({ children, stackDirection = "down" }) => {
  const [alerts, setAlerts] = useState<GlobalAlert[]>([]);

  const showAlert = useCallback((alert: Omit<GlobalAlert, "id">) => {
    setAlerts((prev) => [...prev, { id: crypto.randomUUID(), ...alert }]);
  }, []);

  const handleClose = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <GlobalAlertContext.Provider value={{ showAlert }}>
      {children}
      <Stack
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: stackDirection === "up" ? "column-reverse" : "column",
        }}
      >
        {alerts.map((alert) => (
          <Snackbar
            key={alert.id}
            open
            autoHideDuration={alert.autoHideDuration ?? 4000}
            onClose={() => handleClose(alert.id)}
          >
            <Alert
              severity={alert.severity}
              onClose={() => handleClose(alert.id)}
              variant="filled"
            >
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
      </Stack>
    </GlobalAlertContext.Provider>
  );
};
