import React, {useState, useEffect} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandCircle from '@mui/icons-material/ExpandCircleDown';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import {secciones} from '../data.js';

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

const Header = () => {
  let logoWidth = 80;
  const drawerWidth = 300;

  const [openDR, setOpenDR] = React.useState(false);
  const handleDrawerOpen = () => { setOpenDR(true); };
  const handleDrawerClose = () => { setOpenDR(false); };

  const [openMenu, setOpenMenu] = React.useState([]);
  for(let i=0; i<secciones.length && openMenu.length<secciones.length; i++){
    openMenu.push(false);
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

  return (
    <div>
      <Toolbar sx={{borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
        <Grid mb={1.5} container alignItems="center">
          <Grid item xs={3} align="left">
            <IconButton
                color="inherit" onClick={handleDrawerOpen} edge="start"
                sx={{ mr: 2 , ...(openDR && { display: 'none' })}}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" display="inline">
                Secciones
            </Typography>
          </Grid>
          <Grid item xs={2} align="right">
            <Box component="img" sx={{ height: logoWidth*1.094, width: logoWidth}}
            alt="Escudo de Carrocera." src="/escudo.png" />
          </Grid>
          <Grid item xs={4} align="left">
            <Typography component="h2" variant="h6" color="darkred" align="center" noWrap >
              Ayuntamiento de <Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>Carrocera</Box>
            </Typography>
          </Grid>
          <Grid item xs={3} align="right">
            <IconButton>
              <ExpandCircle sx={{ fontSize: "30px" }}/>
            </ IconButton>
            <IconButton>
              <SearchIcon sx={{ fontSize: "30px" }}/>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>

      <Drawer
        sx={{
          width: drawerWidth, flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }, bgcolor: 'blue'
        }}
        variant="persistent" anchor="left"open={openDR}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon sx={{ fontSize: "30px" }}/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav" subheader={
        <ListSubheader component="div" id="nested-list-subheader">
            Secciones
        </ListSubheader>
        }>
          {secciones.map((seccion) => 
            <div>
            {(seccion.content.length===0) ? (
              <ListItemButton>
                <ListItemText primary={seccion.title} />
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
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={subseccion} />
                  </ListItemButton>
                )}
                </List>
              </Collapse>
              </div>
            )}
            </div>
          )}
        </List>
      </Drawer>

      <Toolbar sx={{justifyContent: 'space-between', mx: 40}}>
        <Button sx={{color:"blue"}} color="inherit"> Inicio </Button>
        <Button sx={{color:"blue"}} color="inherit"> Mapa Web </Button>
        <Button sx={{color:"blue"}} color="inherit"> Contacto </Button>
        <Button sx={{color:"blue"}} color="inherit"> Aviso legal </Button>
      </Toolbar>
    </div>
  );
}

export default Header;