import { Typography, useTheme } from '@mui/material';

const LogoLoading = () => {
    const theme = useTheme();

    return (
        <Typography fontWeight="700" fontSize="4.7rem">
            Taco<span style={{ color: theme.palette.secondary.main }}>Media</span>
        </Typography>
    );
};

export default LogoLoading;