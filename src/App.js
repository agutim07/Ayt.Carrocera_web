import './App.css';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";

import Header from './components/header.js';
import Sidenav from './components/sidenav.js';
import Inicio from './components/secciones/inicio.js';
import Contacto from './components/secciones/contacto';
import Telefonos from './components/secciones/ayt/telefonos';
import Corporacion from './components/secciones/ayt/corporacion';
import Localizacion from './components/secciones/localizacion';
import Urbanistica from './components/secciones/ayt/normativa/urbanistica';
import Datosmun from './components/secciones/municipio/datosmun';
import Estadisticas from './components/secciones/municipio/estats';
import Historia from './components/secciones/municipio/historia';
import Emblemas from './components/secciones/municipio/emblemas';
import Benllera from './components/secciones/pueblos/benllera';
import Carrocera from './components/secciones/pueblos/carrocera';
import Cuevas from './components/secciones/pueblos/cuevas';
import Otero from './components/secciones/pueblos/otero';
import Piedrasecha from './components/secciones/pueblos/piedrasecha';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";




const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
    ].join(','),
  },});

function App() {
  const [page, setPage] = useState("inicio");

  const pageChange = newPage => {
    setPage(newPage);
  }

  const images = [
    "http://www.aytocarrocera.es/export/sites/aytocarrocera/galerias/imagenes/plantilla/cabecera.jpg",
    "http://www.aytocarrocera.es/export/sites/aytocarrocera/galerias/imagenes/plantilla/cabecera1.png",
    "http://www.aytocarrocera.es/export/sites/aytocarrocera/galerias/imagenes/plantilla/cabecera2.png",
    "http://www.aytocarrocera.es/export/sites/aytocarrocera/galerias/imagenes/espacios-naturales/Collage_panorxmicaTODAS.jpg"
  ]
  const [img, setImg] = useState(images[0]);
  const [change, setChange] = React.useState(true);
  let pos = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      pos++;
      if(pos===4){pos=0;}
      changeFunc(pos);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const changeFunc = (i) => {
    setChange(false);
    setImg(images[pos]);
    delay(400).then( () => {
      setChange(true);
    })
  }

  return (
    <Router>
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: "7.5%"}}> 
        <Header pageChange={pageChange}/>
        <Grid container spacing={0.5} direction="row" alignItems="up" justifyContent="center" sx={{mb:2}}>
          <Grid item xs={12} sm={10} md={9} align="left">
            <Grid container spacing={0.5} direction="column" alignItems="center" justifyContent="center">
              <Grid item sx={{my: 2, ml:1, height: {xs: 70, sm:120, md: 180}, width: "100%"}}>
                <Slide direction="right" mountOnEnter unmountOnExit in={change}>
                  <Box
                    component="img"
                    sx={{ objectFit: 'cover', backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                      backgroundSize: 'cover', backgroundPosition: 'center', maxHeight:180, minWidth:"99%", maxWidth:"99%", 
                      borderRadius: '16px'}}
                    alt="Galería."
                    src={img}
                  />
                  </Slide>
                </Grid>
              </Grid>
              <Grid item>
              <Routes>
                <Route path="/" exact element={<Inicio/>} />
                <Route path="/contacto" element={<Contacto/>} />
                <Route path="/ayt/telefonos" element={<Telefonos/>} />
                <Route path="/ayt/corporacion" element={<Corporacion/>} />
                <Route path="/localizacion" element={<Localizacion/>} />
                <Route path="/ayt/normativa/urbanistica" element={<Urbanistica/>} />
                <Route path="/municipio/datos" element={<Datosmun/>} />
                <Route path="/municipio/estadisticas" element={<Estadisticas/>} />
                <Route path="/municipio/historia" element={<Historia/>} />
                <Route path="/municipio/emblemas" element={<Emblemas/>} />
                <Route path="/pueblos/benllera" element={<Benllera/>} />
                <Route path="/pueblos/carrocera" element={<Carrocera/>} />
                <Route path="/pueblos/cuevas" element={<Cuevas/>} />
                <Route path="/pueblos/otero" element={<Otero/>} />
                <Route path="/pueblos/piedrasecha" element={<Piedrasecha/>} />
              </Routes>
              </Grid>
          </Grid>

          <Grid item xs={false} sm={2} md={3} align="right" sx={{display: { xs: 'none', md: 'block' }}}>
            <Sidenav pageChange={pageChange}/>
          </Grid>
        </Grid>

        <Box component="footer" sx={{ mt:2, mb:3, py: 3, px: 2,  mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800], }}
        >
          <Container maxWidth="sm">
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <Grid item>
              <Box component="img" sx={{ mr:2, height: 80*1.094, width: 80}}
              alt="Escudo de Carrocera." src="/escudo.png" />
            </Grid>
            <Grid item align="left">
              <Typography variant="body1">
                <Box sx={{ fontWeight: 'bold'}}>Ayuntamiento de Carrocera</Box>
              </Typography>
              <Typography variant="body1" sx={{fontSize: {xs:12, sm:16, md:"body1"}}}>
                Plaza Mayor, 1 - C.P.: 24123 - Carrocera (León - España)
                <br />
                Teléfono: 987 592 071
                <br />
                e-mail: info@aytocarrocera.es
              </Typography>
            </Grid>
          </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </Router>
  );
}

export default App;
