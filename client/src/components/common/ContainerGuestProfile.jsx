import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const ContainerGuestProfile = ({ header, children }) => {
    return (
        <Box sx={{
            marginTop: "0rem",
            marginX: "auto",
            color: "text.primary"
        }}>
            <Stack spacing={4}>
                {header && (
                    <Box sx={{
                        position: "relative",
                        paddingX: { xs: "20px", md: 0 },
                        maxWidth: "1366px",
                        marginX: "auto",
                        width: "100%",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            left: { xs: "20px", md: "0" },
                            top: "100%",
                            height: "10px",
                            width: "175px",
                            backgroundColor: "magenta"
                        }
                    }}>
                        <Typography variant="h5" fontWeight="700" textTransform="uppercase">
                            {header}
                        </Typography>
                    </Box>
                )}
                {children}
            </Stack>
        </Box>
    );
};

export default ContainerGuestProfile;