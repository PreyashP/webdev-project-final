import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  const handleSignOut = () => {
    dispatch(setUser(null));

    if (window.location.pathname === "/profile") {
      const displayName = user.displayName.replace(/\s/g, "%20");
      window.location.href = `/profile/${displayName}`;
    } else {
      window.location.reload();
    }
  };

  return (
      <>
        {user && (
            <>
              <Typography
                  variant="h6"
                  sx={{ cursor: "pointer", userSelect: "none" }}
                  onClick={toggleMenu}
              >
                {user.displayName}
              </Typography>
              <Menu
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{ sx: { padding: 0 } }}
              >
                {menuConfigs.user.map((item, index) => {
                  // Check if user has admin role
                  if (item.display === "Admin Reviews" && user.role !== "admin") {
                    return null;
                  }
                  return (
                      <ListItemButton
                          component={Link}
                          to={item.path}
                          key={index}
                          onClick={() => setAnchorEl(null)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText disableTypography primary={
                          <Typography textTransform="uppercase">{item.display}</Typography>
                        } />
                      </ListItemButton>
                  )
                })}
                <ListItemButton
                    sx={{ borderRadius: "10px" }}
                    onClick={handleSignOut}
                >
                  <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                  <ListItemText disableTypography primary={
                    <Typography textTransform="uppercase">sign out</Typography>
                  } />
                </ListItemButton>
              </Menu>
            </>
        )}
      </>
  );
};

export default UserMenu;
