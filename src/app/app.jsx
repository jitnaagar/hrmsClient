"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { ThemeSettings } from "../utils/theme/Theme";
import { useSelector } from 'react-redux';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "../utils/i18n";
import '../app/api/index'
import RTL from "./(DashboardLayout)/layout/shared/customizer/RTL";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ children, pageProps }) => {
    const theme = ThemeSettings();
    const customizer = useSelector((state) => state.customizer);

    return (
        <>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                    <RTL direction={customizer.activeDir}>
                        <SessionProvider session={pageProps?.session}>
        
                        <CssBaseline />
                        {children}
                        </SessionProvider>
                    </RTL>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </>
    );
};

export default MyApp;
