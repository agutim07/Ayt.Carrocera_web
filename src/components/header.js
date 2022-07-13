import React, {useState, useEffect} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PolicyIcon from '@mui/icons-material/Policy';
import ExpandCircle from '@mui/icons-material/ExpandCircleDown';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import {subsecciones,secciones} from '../data.js';

const theme = createTheme({
    typography: {
      fontFamily: [
        'Work Sans',
      ].join(','),
},});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


function Header({pageChange}){
  let logoWidth = 80;
  const drawerWidth = 300;

  const [openDR, setOpenDR] = React.useState(false);
  const handleDrawerOpen = () => { setOpenDR(true); };
  const handleDrawerClose = () => { setOpenDR(false); };

  const [openMenu, setOpenMenu] = React.useState([]);
  for(let i=0; i<secciones.length && openMenu.length<secciones.length; i++){
    openMenu.push(false);
  }
  const [openSubMenu, setOpenSubMenu] = React.useState([]);
  for(let i=0; i<subsecciones.length && openSubMenu.length<subsecciones.length; i++){
    openSubMenu.push(false);
  }

  function handleClickMenu(num){ 
    let newMenu = openMenu;
    if(!newMenu[num]){
      newMenu[num] = true;
    }else{
      newMenu[num] = false;
    }
    setOpenMenu([...newMenu]);
  }

  function handleClickSubMenu(num){ 
    let newMenu = openSubMenu;
    if(!newMenu[num]){
      newMenu[num] = true;
    }else{
      newMenu[num] = false;
    }
    setOpenSubMenu([...newMenu]);
  }

  function checkSubSeccion(title){
    for(let i=0; i<subsecciones.length; i++){
      if(subsecciones[i].parent===title){
        return subsecciones[i].id;
      }
    }
    return -1;
  }

  const [extraMenu, setExtraMenu] = React.useState(null);
  const handleClickExMenu = (event) => {
    if(event.currentTarget !== extraMenu){
      setExtraMenu(event.currentTarget); 
  }};
  const handleCloseExMenu = () => { setExtraMenu(null); };

  return (
    <div>
      <Toolbar sx={{borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
        <Grid mb={1.5} container alignItems="center">
          <Grid item xs={3} align="left">
            <Grid container direction="row" alignItems="center">
              <IconButton
                  color="inherit" onClick={handleDrawerOpen} onMouseOver={handleDrawerOpen} edge="start"
                  sx={{ mr: 2 , ...(openDR && { display: 'none' })}}
              >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" display="inline" align="center">
                  Información
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2} align="right">
            <Box component="img" sx={{ height: logoWidth*1.094, width: logoWidth}}
            alt="Escudo de Carrocera." src="/escudo.png"/>
          </Grid>
          <Grid item xs={4} align="left">
            <Typography component="h2" variant="h6" color="darkred" align="center" noWrap >
              Ayuntamiento de <Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>Carrocera</Box>
            </Typography>
          </Grid>
          <Grid item xs={1} align="right"></Grid>
          <Grid item xs={1} align="right">
            <Grid container direction="row" alignItems="center">
              <Typography variant="h6" noWrap component="div" display="inline" align="right">
                  Menú
              </Typography>
              <IconButton onMouseOver={handleClickExMenu} onClick={handleClickExMenu} aria-controls={Boolean(extraMenu) ? 'account-menu' : undefined} 
              aria-haspopup="true" aria-expanded={Boolean(extraMenu) ? 'true' : undefined}>
                <ExpandCircle sx={{ fontSize: "30px" }}/>
              </IconButton>
              <Menu anchorEl={extraMenu} open={Boolean(extraMenu)} onClose={handleCloseExMenu}
              MenuListProps={{ onMouseLeave: handleCloseExMenu }}>
                <MenuItem sx={{color:"blue", fontSize: 15}} onClick={pageChange("inicio")}> 
                  <ListItemIcon><HomeIcon fontSize="small"/></ListItemIcon>
                  INICIO
                </MenuItem>
                <MenuItem sx={{color:"blue", fontSize: 15}}>
                  <ListItemIcon><MapIcon fontSize="small"/></ListItemIcon>
                  MAPA WEB
                </MenuItem>
                <MenuItem sx={{color:"blue", fontSize: 15}}>
                  <ListItemIcon><ContactSupportIcon fontSize="small"/></ListItemIcon>
                  CONTACTO
                </MenuItem>
                <MenuItem sx={{color:"blue", fontSize: 15}}>
                  <ListItemIcon><PolicyIcon fontSize="small"/></ListItemIcon>
                  AVISO LEGAL
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid item xs={1} align="right">
            <IconButton>
              <SearchIcon sx={{ fontSize: "30px" }}/>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>

      <Drawer
        sx={{ width: drawerWidth, flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth,boxSizing: 'border-box',}, bgcolor: 'paper' }}
        PaperProps={{ sx: { backgroundColor: "#03a9f4",} }}
        variant="persistent" anchor="left"open={openDR} onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon sx={{ fontSize: "30px" }}/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav" subheader={
        <ListSubheader component="div" id="nested-list-subheader">
            <Box sx={{ fontWeight: 'bold', fontSize: 'h6.fontSize', textAlign: 'center'}}>INFO</Box>
        </ListSubheader>
        }>
          {secciones.map((seccion) => 
            <div>
            {(seccion.content.length===0) ? (
              <ListItemButton>
                <ListItemText primary={seccion.title} />
                {(seccion.title=="INICIO") ? (
                  <HomeIcon/>
                ) : ""}
              </ListItemButton>
            ) :  (
              <div>
              <ListItemButton onClick={() => handleClickMenu(seccion.id)}>
                <ListItemText primary={seccion.title} />
                {openMenu[seccion.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openMenu[seccion.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {secciones[seccion.id].content.map((subseccion) => 
                  <div>
                  {(checkSubSeccion(subseccion)===-1) ? (
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={subseccion} />
                    </ListItemButton>
                  ) : (
                    <div>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickSubMenu(checkSubSeccion(subseccion))}>
                      <ListItemText primary={subseccion} />
                      {openSubMenu[checkSubSeccion(subseccion)] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubMenu[checkSubSeccion(subseccion)]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      {subsecciones[checkSubSeccion(subseccion)].content.map((sub2seccion) => 
                        <ListItemButton sx={{ pl: 8 }}>
                          <ListItemText primary={sub2seccion} />
                        </ListItemButton>
                      )}
                      </List>
                    </Collapse>
                    </div>
                  )}
                  </div>
                )}
                </List>
              </Collapse>
              </div>
            )}
            </div>
          )}
        </List>
      </Drawer>
    </div>
  );
}

export default Header;