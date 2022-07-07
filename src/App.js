import './App.css';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';

import Header from './components/header.js';
import Sidenav from './components/sidenav.js';

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
        <Grid container spacing={0} direction="row" alignItems="up" justifyContent="center">
          <Grid item xs={9} align="left">
            <Slide direction="right" mountOnEnter unmountOnExit in={change}>
              <Box
                component="img"
                sx={{backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover', backgroundPosition: 'center', my: 2, ml:1,
                  height: 180, width: 950, maxHeight: { xs: 230, md: 180 }, maxWidth: { xs: 1000, md: 950 },
                  borderRadius: '16px'}}
                alt="Galería."
                src={img}
              />
              </Slide>
          </Grid>

          <Grid item xs={3} align="right">
            <Sidenav />
          </Grid>
        </Grid>
        </Box>
    </ThemeProvider>
  );
}

export default App;
