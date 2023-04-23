import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";
import GuestUserProfile from "./pages/Guest_User_Profile";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const App = () => {
    const { themeMode } = useSelector((state) => state.themeMode);

    return (
        // Toast Theme Settings for Sign In Box Successful Login
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
            {/* Config toastify */}
            <ToastContainer
                position="top-right"
                autoClose={10}
                hideProgressBar={true}
                newestOnTop={false}
                pauseOnFocusLoss
                pauseOnHover
                theme={themeMode}
            />
            {/* MUI reset CSS */}
            <CssBaseline />

            {/* App routes */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {routes.map((route, index) => (
                            route.index ? (
                                <Route
                                    index
                                    key={index}
                                    element={route.state ? (
                                        <PageWrapper state={route.state}>{route.element}</PageWrapper>
                                    ) : route.element}
                                />
                            ) : (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={route.state ? (
                                        <PageWrapper state={route.state}>{route.element}</PageWrapper>
                                    ) : route.element}
                                />
                            )
                        ))}
                        {/* Add route for guest user profile */}
                        <Route
                            path="/profile"
                            element={
                                <PageWrapper>
                                    <GuestUserProfile />
                                </PageWrapper>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
            {/* App routes */}
        </ThemeProvider>
    );
};

export default App;
