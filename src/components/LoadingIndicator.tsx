import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

// Reusable loading component
export type LoadingIndicatorProps = {
  message?: string;
  size?: number;
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Loading…",
  size = 48,
}) => {
  useEffect(() => {
    const delay = async () => {
      // Simulate backend latency
      await new Promise((resolve) => setTimeout(resolve, 6000));
    };

    delay();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={200}
      gap={2}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

// Example component simulating a backend request
/* export const DataFetchingExample: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setData(null);

    // Simulate backend latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setData("✅ Data loaded from backend");
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h6" mb={2}>
        Data Fetching Example
      </Typography>

      {loading && <LoadingIndicator message="Fetching data from server…" />}

      {!loading && data && (
        <Typography variant="body1" mb={2}>
          {data}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={fetchData}
        disabled={loading}
      >
        Refetch Data
      </Button>
    </Paper>
  );
};

// Default export for quick testing
export default DataFetchingExample;
 */
