import './App.css';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Link2 from '@mui/material/Link';

import Header from './components/header.js';
import Sidenav from './components/sidenav.js';
import Inicio from './secciones/inicio.js';
import Contacto from './secciones/contacto';
import Telefonos from './secciones/ayt/telefonos';
import Corporacion from './secciones/ayt/corporacion';
import Localizacion from './secciones/localizacion';
import Urbanistica from './secciones/ayt/normativa/urbanistica';
import Datosmun from './secciones/municipio/datosmun';
import Estadisticas from './secciones/municipio/estats';
import Historia from './secciones/municipio/historia';
import Emblemas from './secciones/municipio/emblemas';
import Benllera from './secciones/pueblos/benllera';
import Carrocera from './secciones/pueblos/carrocera';
import Cuevas from './secciones/pueblos/cuevas';
import Otero from './secciones/pueblos/otero';
import Piedrasecha from './secciones/pueblos/piedrasecha';
import Santiago from './secciones/pueblos/santiago';
import Viñayo from './secciones/pueblos/viñayo';
import Pueblos from './secciones/pueblos';
import Alojamientos from './secciones/turismo/alojamientos';
import Bares from './secciones/turismo/bares';
import Artesania from './secciones/turismo/artesania';
import Naturaleza from './secciones/turismo/naturaleza';
import Fiestas from './secciones/turismo/fiestas';
import Agroalimentarios from './secciones/turismo/agroalimentarios';
import MapaWeb from './secciones/mapaweb';
import Noticias from './secciones/ayt/noticias';
import Eventos from './secciones/ayt/eventos';

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
  const news = [
    {id:0, title: 'AYUDAS PARA LA ADQUISICIÓN DE LIBROS DE TEXTO, MATERIAL ESCOLAR Y TRANSPORTE ESCOLAR CURSO 2022/2023', fecha:'9 de Septiembre, 2022', image: '', doc:'/Publicación_Bando_BANDO SUBVENCIÓN MATERIAL ESCOLAR 2022_2023.pdf', content: `Esta ayuda está sujeta a los criterios establecidos en la Ordenanza reguladora de la subvención (BOLETÍN OFICIAL DE LA PROVINCIA n.º 112 de fecha 13 de junio de 2018 , con su modificación en el n.º 134 de fecha de 17 de julio de 2019 y modificación en el n.º 154 de fecha 19 de agosto de 2020)
    Podrá solicitar esta subvención el alumnado del municipio de Carrocera matriculado en determinados centros educativos y que cumpla los requisitos establecidos.
    Plazo de presentación de solicitudes.
    Hasta el 27 de septiembre de 2022
    Las solicitudes se formularán en el modelo que figura como Anexo I de la convocatoria, dirigidas al Alcalde y se presentarán en el Registro de entrada del Ayuntamiento o por cualquiera de los medios señalados en el artículo 16.4 de la Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas,
    Al modelo Anexo I se adjuntarán la documentación citada en el mismo y que es la que establece en el artículo 6 de la Ordenanza.`},
    {id:1, title: 'Noticia de prueba', image: '', doc:'/Publicación_Bando_BANDO SUBVENCIÓN MATERIAL ESCOLAR 2022_2023.pdf', fecha:'2 de Septiembre, 2022', content: ''},
  ]

  const eventos = [
    {id:0, title: 'Comida de San Cipriano', loc:'Santiago de las Villas', fecha:'9 de Septiembre, 2022', image: '/santiago3.jpg', doc:'', content: `En honor al patrón del pueblo`},
    {id:1, title: 'Fiesta de Piedrasecha', loc:'', fecha:'16 de Septiembre, 2022', image: '', doc:'/Publicación_Bando_BANDO SUBVENCIÓN MATERIAL ESCOLAR 2022_2023.pdf', content: ``}
  ]

  const images = [
    "/back0.jpg",
    "/back1.png",
    "/back2.png",
    "/back3.jpg"
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

  const getNumPages = () => {
    let numPages = Math.floor((news.length) / 6);
    if((news.length) % 6 != 0){numPages++;}
    return numPages;
  }

  const getNewsPages = () => {
    let pages = [];
    let numPages = getNumPages();
    for (let i = 2; i <= numPages ; i++) {
      pages.push(<Route path={"/ayt/noticias/page"+i} element={<Noticias news={news} pages={numPages} page={i}/>} />);
    }
    return pages;
  };

  const getNumPagesEvents = () => {
    let numPages = Math.floor((eventos.length) / 6);
    if((eventos.length) % 6 != 0){numPages++;}
    return numPages;
  }

  const getEventsPages = () => {
    let pages = [];
    let numPages = getNumPagesEvents();
    for (let i = 2; i <= numPages ; i++) {
      pages.push(<Route path={"/ayt/eventos/page"+i} element={<Eventos events={eventos} pages={numPages} page={i}/>} />);
    }
    return pages;
  };

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
        <Header />
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
                <Route path="/" exact element={<Inicio noticia={news[0]} evento={eventos[0]}/>} />
                <Route path="/contacto" element={<Contacto/>} />
                <Route path="/mapaweb" element={<MapaWeb/>} />
                <Route path="/ayt/telefonos" element={<Telefonos/>} />
                <Route path="/ayt/corporacion" element={<Corporacion/>} />
                <Route path="/localizacion" element={<Localizacion/>} />
                <Route path="/ayt/normativa/urbanistica" element={<Urbanistica/>} />
                <Route path="/municipio/datos" element={<Datosmun/>} />
                <Route path="/municipio/estadisticas" element={<Estadisticas/>} />
                <Route path="/municipio/historia" element={<Historia/>} />
                <Route path="/municipio/emblemas" element={<Emblemas/>} />
                <Route path="/pueblos/benllera" element={<Benllera/>} />
                <Route path="/pueblos" element={<Pueblos/>} />
                <Route path="/pueblos/carrocera" element={<Carrocera/>} />
                <Route path="/pueblos/cuevas" element={<Cuevas/>} />
                <Route path="/pueblos/otero" element={<Otero/>} />
                <Route path="/pueblos/piedrasecha" element={<Piedrasecha/>} />
                <Route path="/pueblos/santiago" element={<Santiago/>} />
                <Route path="/pueblos/vinayo" element={<Viñayo/>} />
                <Route path="/turismo/alojamientos" element={<Alojamientos/>} />
                <Route path="/turismo/restaurantes" element={<Bares/>} />
                <Route path="/turismo/artesania" element={<Artesania/>} />
                <Route path="/turismo/naturaleza" element={<Naturaleza/>} />
                <Route path="/turismo/fiestas" element={<Fiestas/>} />
                <Route path="/turismo/agroalimentarios" element={<Agroalimentarios/>} />
                <Route path="/ayt/noticias" element={<Noticias news={news} pages={getNumPages()} page={1}/>} />
                {getNewsPages()}
                <Route path="/ayt/eventos" element={<Eventos events={eventos} pages={getNumPagesEvents()} page={1}/>} />
                {getEventsPages()}
              </Routes>
              </Grid>
          </Grid>

          <Grid item xs={false} sm={2} md={3} align="right" sx={{display: { xs: 'none', md: 'block' }}}>
            <Sidenav/>
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
                e-mail: info@ayuntamientocarrocera.com	
                <br />
                <Link2 rel="noopener noreferrer" target="_blank" href="http://www.aytocarrocera.es/" underline="none">
                  Web de la Diputación
                </Link2>
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
