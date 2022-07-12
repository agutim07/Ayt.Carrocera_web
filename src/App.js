import './App.css';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Header from './components/header.js';
import Sidenav from './components/sidenav.js';
import Inicio from './components/secciones/inicio.js';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
    ].join(','),
},});

function App() {
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
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: 15, mt: 2 }}> 
        <Header />
        <Grid container spacing={0.5} direction="row" alignItems="up" justifyContent="center" sx={{mb:2}}>
          <Grid item xs={9} align="left">
            <Grid container spacing={0.5} direction="column" alignItems="center" justifyContent="center">
              <Grid item sx={{my: 2, ml:1, height: 180, width: 930}}>
                <Slide direction="right" mountOnEnter unmountOnExit in={change}>
                  <Box
                    component="img"
                    sx={{backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                      backgroundSize: 'cover', backgroundPosition: 'center', maxHeight:180, minWidth:930, maxWidth:930, 
                      borderRadius: '16px'}}
                    alt="Galería."
                    src={img}
                  />
                  </Slide>
                </Grid>
              </Grid>
              <Grid item>
                <Inicio />
              </Grid>
          </Grid>

          <Grid item xs={3} align="right">
            <Sidenav />
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
              <Typography variant="body1">
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
  );
}

export default App;
