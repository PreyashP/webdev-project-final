import { useSelector } from "react-redux";
import { Paper, Box, CircularProgress, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import LogoLoading from "./Logo-Loading";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);


  return (
      <>
        <Paper sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
          backgroundColor: "#392B44"
        }}>
          <Toolbar />
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
            <LogoLoading />
            <CircularProgress size="15rem" sx={{ marginTop: "16px", marginLeft:"40px"}} />
          </Box>
        </Paper>
      </>

  );
};

export default GlobalLoading;