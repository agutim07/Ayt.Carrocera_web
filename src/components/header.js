import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from '@mui/material/Drawer';

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
  const drawerWidth = 240;

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => { setOpen(true); };

  const handleDrawerClose = () => { setOpen(false); };

  return (
    <div>
      <Toolbar sx={{borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
        <Grid container alignItems="center">
          <Grid item xs={3} align="left">
            <IconButton
                color="inherit" onClick={handleDrawerOpen} edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
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
              <SearchIcon />
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
          },
        }}
        variant="persistent" anchor="left"open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        </Drawer>

      <Toolbar sx={{justifyContent: 'space-between', mx: 40}}>
        <Button sx={{color:"blue"}} color="inherit" noWrap> Inicio </Button>
        <Button sx={{color:"blue"}} color="inherit" noWrap> Mapa Web </Button>
        <Button sx={{color:"blue"}} color="inherit" noWrap> Contacto </Button>
        <Button sx={{color:"blue"}} color="inherit" noWrap> Aviso legal </Button>
      </Toolbar>
    </div>
  );
}

export default Header;