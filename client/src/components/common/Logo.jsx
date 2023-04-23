import { Typography, useTheme } from '@mui/material';

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Taco<span style={{ color: theme.palette.secondary.main }}>Media</span>
    </Typography>
  );
};

export default Logo;