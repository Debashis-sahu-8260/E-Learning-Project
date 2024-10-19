import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { BarChart, People, ExitToApp, Dashboard as DashboardIcon } from '@mui/icons-material';
import DashboardPage from './DashboardPage';
import UsersPage from './UsersPage';
import OrdersPage from './CreateCourses';
import ReportsPage from './ReportsPage';
import style from './admin.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { auth } from "../../Redux/login/action";
import EditNoteIcon from '@mui/icons-material/EditNote';


const Admin = () => {
  // State to manage which page to display
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedOut, setIsLoggedOut] = useState(false); 
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(auth(null));
    setIsLoggedOut(true); 
    navigate('/');
    window.location.reload(); 
  };

  // Function to render selected page
  const renderPage = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'Create-Course':
        return <OrdersPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={style.adminContainer}>
      <Drawer variant="permanent" anchor="left" className={style.drawer}>
        <List className={style.drawerList}>
          <ListItem>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('dashboard')}>
            <ListItemIcon>
              <DashboardIcon className={style.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('users')}>
            <ListItemIcon>
              <People className={style.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('Create-Course')}>
            <ListItemIcon>
              <AddCircleIcon className={style.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Create Course" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('reports')}>
            <ListItemIcon>
              <EditNoteIcon className={style.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Manage Courses" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main className={style.mainContent}>
        {/* Top Header */}
        <AppBar position="fixed" className={style.appBar} style={{ background: "#1410df" }}>
          <Toolbar>
            <Typography variant="h6" noWrap className={style.title}>
              Dashboard Overview
            </Typography>
            <Typography variant="h6" noWrap className={style.title1}>
              ADMIN
            </Typography>
            <IconButton onClick={handleMenuClick}>
              <Avatar alt="Admin Avatar" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-512.png" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              <MenuItem onClick={handleLogout}>
                <ExitToApp className={style.logoutIcon} />
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Toolbar /> {/* Spacer for fixed AppBar */}

        {/* Dynamic Content Area */}
        <div className={style.pageContent}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
