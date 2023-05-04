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
import InicioSesion from './secciones/inicioSesion';
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
import Naturaleza from './secciones/turismo/naturaleza';
import Fiestas from './secciones/turismo/fiestas';
import MapaWeb from './secciones/mapaweb';
import Noticias from './secciones/ayt/noticias';
import Eventos from './secciones/ayt/eventos';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
    ].join(','),
  },});

function App() {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const [eventos, setEventos] = useState([]);
  const [proximoEvento, setProximoEvento] = useState();
  const [loadingEventos, setLoadingEventos] = useState(true);

  const images = [
    "/images/back0.jpg",
    "/images/back1.png",
    "/images/back2.png",
    "/images/back3.jpg"
  ]
  const [img, setImg] = useState(images[0]);
  const [change, setChange] = React.useState(true);
  let pos = 0;

  useEffect(() => {
    getNews();
    getEvents();
    const interval = setInterval(() => {
      pos++;
      if(pos===4){pos=0;}
      changeFunc(pos);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function getNews(){
    Axios.get('/news').then((response) => {
      setNews(response.data);
      setLoadingNews(false);
    });
  }

  function getEvents(){
    Axios.get('/events').then((response) => {
      getProximoEvento(response.data);
    });
  }

  function getProximoEvento(data){
    const CurrentDate = new Date();
    let evento = data[0];
    for(let i=1; i<data.length; i++){
        if(CurrentDate <= new Date(data[i].fecha) && new Date(data[i].fecha) < new Date(evento.fecha)){
          evento = data[i];
        }
    }

    setEventos(data);
    setProximoEvento(evento);
    setLoadingEventos(false);
  }

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
                <Route path="/" exact element={<Inicio loadingNews={loadingNews} noticia={news[0]} loadingEventos={loadingEventos} evento={proximoEvento}/>} />
                <Route path="/inicioSesion" element={<InicioSesion/>} />
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
                <Route path="/turismo/naturaleza" element={<Naturaleza/>} />
                <Route path="/turismo/fiestas" element={<Fiestas/>} />
                <Route path="/ayt/noticias" element={<Noticias news={news} pages={getNumPages()} page={1}/>} />
                {getNewsPages()}
                <Route path="/ayt/eventos" element={<Eventos events={eventos} pages={getNumPagesEvents()} page={1}/>} />
                {getEventsPages()}
                <Route path="/*" element={<p>No hay nada aquí: 404!</p>} />
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
              alt="Escudo de Carrocera." src="/images/escudo.png" />
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
  );
}

export default App;
