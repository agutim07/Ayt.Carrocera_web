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
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import CloseIcon from '@mui/icons-material/Close';

import {subsecciones,secciones} from '../data.js';

import {useNavigate} from 'react-router-dom';

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

  const navigate = useNavigate();
  
  const newPage = page => {

    if(page==="INICIO"){
      navigate('/', {replace: true});
    }
    if(page==="Teléfonos de Interés"){
      navigate('/ayt/telefonos', {replace: true});
    }
    if(page==="Corporación Municipal"){
      navigate('/ayt/corporacion', {replace: true});
    }
    if(page==="Trámites y Solicitudes"){
      window.open("https://aytocarrocera.sedelectronica.es/dossier.0", '_blank', 'noopener,noreferrer');
    }
    if(page==="Tablón de Anuncios"){
      window.open("https://aytocarrocera.sedelectronica.es/board", '_blank', 'noopener,noreferrer');
    }
    if(page==="LOCALIZACIÓN"){
      navigate('/localizacion', {replace: true});
    }
    if(page==="Normativa urbanística"){
      navigate('/ayt/normativa/urbanistica', {replace: true});
    }
    if(page==="Datos del Municipio"){
      navigate('/municipio/datos', {replace: true});
    }
    if(page==="Estadísticas"){
      navigate('/municipio/estadisticas', {replace: true});
    }
    if(page==="Introducción Histórica"){
      navigate('/municipio/historia', {replace: true});
    }
    if(page==="Escudo y Bandera"){
      navigate('/municipio/emblemas', {replace: true});
    }
    if(page==="El Tiempo"){
      window.open("https://www.eltiempo.es/carrocera.html", '_blank', 'noopener,noreferrer');
    }
    if(page==="Benllera"){
      navigate('/pueblos/benllera', {replace: true});
    }
    if(page==="Carrocera"){
      navigate('/pueblos/carrocera', {replace: true});
    }
    if(page==="Cuevas de Viñayo"){
      navigate('/pueblos/cuevas', {replace: true});
    }
    if(page==="Otero de las Dueñas"){
      navigate('/pueblos/otero', {replace: true});
    }
    if(page==="Piedrasecha"){
      navigate('/pueblos/piedrasecha', {replace: true});
    }
    if(page==="Santiago de las Villas"){
      navigate('/pueblos/santiago', {replace: true});
    }
    if(page==="Viñayo"){
      navigate('/pueblos/vinayo', {replace: true});
    }
    if(page==="SEDE ELECTRÓNICA"){
      window.open("https://aytocarrocera.sedelectronica.es/", '_blank', 'noopener,noreferrer');
    }
    if(page==="Ordenanzas y reglamentos"){
      window.open("https://aytocarrocera.sedelectronica.es/board/97521486-f59b-11de-b600-00237da12c6a/", '_blank', 'noopener,noreferrer');
    }
    if(page==="Alojamientos"){
      navigate('/turismo/alojamientos', {replace: true});
    }
    if(page==="Bares y Restaurantes"){
      navigate('/turismo/restaurantes', {replace: true});
    }
    if(page==="Artesanía"){
      navigate('/turismo/artesania', {replace: true});
    }
    if(page==="Espacios Naturales y Patrimonio"){
      navigate('/turismo/naturaleza', {replace: true});
    }
    if(page==="Fiestas"){
      navigate('/turismo/fiestas', {replace: true});
    }
    if(page==="Productos Agroalimentarios"){
      navigate('/turismo/agroalimentarios', {replace: true});
    }
    if(page==="mapaweb"){
      navigate('/mapaweb', {replace: true});
    }
    if(page==="Noticias"){
      navigate('/ayt/noticias', {replace: true});
    }
    if(page==="Eventos"){
      navigate('/ayt/eventos', {replace: true});
    }

    if(page==="contacto"){navigate('/contacto', {replace: true});}

    handleDrawerClose();
  }

  return (
    <div>
      <Toolbar sx={{borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
        <Grid mb={1.5} container alignItems="center">
          <Grid item xs={1} sm={3} align="left">
            <Grid container direction="row" alignItems="center">
              <IconButton
                  onClick={handleDrawerOpen} onMouseOver={handleDrawerOpen} edge="start"
                  sx={{ mr: 2 , ...(openDR && { display: 'none' })}}
              >
                  <MenuIcon sx={{color:"white"}}/>
              </IconButton>
              <Box sx={{ display: { xs: 'none', sm: 'block' }}}> 
              <Typography variant="h6" noWrap color="white" component="div" display="inline" align="center">
                  Información
              </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={3} sm={2} align="right">
            <IconButton disableElevation disableRipple size="small" onClick={() => newPage("INICIO")}
              sx={{ ml: 1, "&.MuiButtonBase-root:hover": {bgcolor: "transparent"}}}
            >
            <Box component="img" sx={{ height: logoWidth*1.094, width: logoWidth}}
            alt="Escudo de Carrocera." src="/images/escudo.png" />
            </IconButton>
          </Grid>
          <Grid item xs={7} sm={4} align="left">
            <Typography component="h2" variant="h6" color="#e53935" align="center" noWrap >
              Ayuntamiento de <Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize' }}>Carrocera</Box>
            </Typography>
          </Grid>
          <Grid item xs={false} sm={1} align="right"/>
          <Grid item sx={{ display: { xs: 'none', sm: 'block' }}} xs={1} align="right">
            <Grid container direction="row" alignItems="center">
              <Typography variant="h6" noWrap color="white" component="div" display="inline" align="right">
                  Menú
              </Typography>
              <IconButton onMouseOver={handleClickExMenu} onClick={handleClickExMenu} aria-controls={Boolean(extraMenu) ? 'account-menu' : undefined} 
              aria-haspopup="true" aria-expanded={Boolean(extraMenu) ? 'true' : undefined}>
                <ExpandCircle sx={{ color:"white", fontSize: "30px" }}/>
              </IconButton>
              <Menu anchorEl={extraMenu} open={Boolean(extraMenu)} onClose={handleCloseExMenu}
              MenuListProps={{ onMouseLeave: handleCloseExMenu }}>
                <MenuItem sx={{color:"blue", fontSize: 15}} onClick={() => newPage("INICIO")}>
                  <ListItemIcon><HomeIcon fontSize="small"/></ListItemIcon>
                  INICIO
                </MenuItem>
                <MenuItem sx={{color:"blue", fontSize: 15}} onClick={() => newPage("mapaweb")}>
                  <ListItemIcon><MapIcon fontSize="small"/></ListItemIcon>
                  MAPA WEB
                </MenuItem>
                <MenuItem sx={{color:"blue", fontSize: 15}} onClick={() => newPage("contacto")}>
                  <ListItemIcon><ContactSupportIcon fontSize="small"/></ListItemIcon>
                  CONTACTO
                </MenuItem>
                <MenuItem sx={{color:"blue", fontSize: 15}} onClick={() => navigate('/admin', {replace: true})}>
                  <ListItemIcon><AdminPanelSettingsIcon fontSize="small"/></ListItemIcon>
                  ADMIN
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid item xs={1} align="right">
          </Grid>
        </Grid>
      </Toolbar>

      <Drawer
        sx={{ width: drawerWidth, flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth,boxSizing: 'border-box',}, bgcolor: 'paper' }}
        PaperProps={{ sx: { backgroundColor: "#3a41af",} }}
        variant="persistent" anchor="left"open={openDR} onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader sx={{  justifyContent:'center', backgroundColor: "white"}}>
            <Grid container direction="row" alignItems="center">
              <Grid item sx={{ display: { xs: 'block', md: 'none' }}} xs={1}>
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon /> 
              </IconButton>
              </Grid>
              <Grid item xs={11}>
              <Typography component="h2" variant="h6" color="#e53935" align="center" noWrap >
                <Box sx={{fontWeight: 'bold', fontSize: 'h5.fontSize' }}>Información</Box>
              </Typography>
              </Grid>
           </Grid> 
        </DrawerHeader>
        <Divider />
        <List component="nav" >
          {secciones.map((seccion) => 
            <div>
            {(seccion.content.length===0) ? (
              <ListItemButton onClick={() => newPage(seccion.title)}>
                <ListItemText sx={{color: 'white'}} primary={seccion.title} />
                {(seccion.title=="INICIO") ? (<HomeIcon sx={{color: 'white'}}/>) : ""}
                {(seccion.title=="LOCALIZACIÓN") ? (<MapIcon sx={{color: 'white'}}/>) : ""}
                {(seccion.title=="SEDE ELECTRÓNICA") ? (<PublicIcon sx={{color: 'white'}}/>) : ""}
              </ListItemButton>
            ) :  (
              <div>
              <ListItemButton onClick={() => handleClickMenu(seccion.id)}>
                <ListItemText primary={seccion.title} sx={{color: 'white'}} />
                {openMenu[seccion.id] ? <ExpandLess sx={{color: 'white'}}/> : <ExpandMore sx={{color: 'white'}}/>}
              </ListItemButton>
              <Collapse in={openMenu[seccion.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {secciones[seccion.id].content.map((subseccion) => 
                  <div>
                  {(checkSubSeccion(subseccion)===-1) ? (
                    <ListItemButton onClick={() => newPage(subseccion)} sx={{ pl: 4 }}>
                      <ListItemText primary={subseccion} sx={{color: 'white'}} />
                    </ListItemButton>
                  ) : (
                    <div>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickSubMenu(checkSubSeccion(subseccion))}>
                      <ListItemText primary={subseccion} sx={{color: 'white'}}/>
                      {openSubMenu[checkSubSeccion(subseccion)] ? <ExpandLess sx={{color: 'white'}} /> : <ExpandMore sx={{color: 'white'}} />}
                    </ListItemButton>
                    <Collapse in={openSubMenu[checkSubSeccion(subseccion)]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      {subsecciones[checkSubSeccion(subseccion)].content.map((sub2seccion) => 
                        <ListItemButton onClick={() => newPage(sub2seccion)} sx={{ pl: 8 }}>
                          <ListItemText primary={sub2seccion} sx={{color: 'white'}} />
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
        <Grid container direction="row" justifyContent="center" alignItems="center">
        <Box component="img" sx={{ mt:2, height: logoWidth*1.094, width: logoWidth}} alt="Escudo de Carrocera." 
        src="/images/escudo.png" />
        </Grid>
      </Drawer>
    </div>
  );
}

export default Header;