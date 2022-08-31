import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import AttachmentIcon from '@mui/icons-material/Attachment';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';

export const useScript = url => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      }
    }, [url]);
};

function Sidenav({pageChange}){
    const navigate = useNavigate();

    return(
        <Grid container direction="column">
        <Grid item>
        <Box sx={{backgroundColor: "#222222", color:"#ffffff", backgroundSize: 'cover', backgroundPosition: 'center', 
            my: 2, ml:1, borderRadius: '9px'}}>
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Avatar sx={{ my: 0.5, bgcolor: "#222222" }}><AttachmentIcon/></Avatar>
                <Typography display="inline">ACESSOS RÁPIDOS</Typography>
            </Grid>
            <Divider  sx={{ bgcolor: "#ffffff" }} variant="middle"/>

            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Paper elevation={12} sx={{ backgroundColor: "#ffffff", '&:hover': { opacity: [0.9, 0.9, 0.9], },
                color:"darkred", width: "75%", margin:1, padding:1, my: 1.5, ml:1, border: "1px solid black", boxShadow: "5px 5px 5px white"  }}>
                    <Link rel="noopener noreferrer" target="_blank" href="https://aytocarrocera.sedelectronica.es/" underline="none">
                        <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Typography display="inline"><Box sx={{ color:"red", fontSize:20, fontWeight: 'bold'}}>SEDE ELECTRÓNICA</Box></Typography>
                        <Box sx={{display: 'flex', mt:0.5, mb:0.5, color:"black", alignItems: 'center',  width: 'fit-content'}}>
                            <Divider orientation="vertical" flexItem sx={{ bgcolor: "darkblue" }} />
                            <Grid container sx={{ml:1}} direction="column" alignItems="center" justifyContent="center">
                                <Typography display="inline">Trámites online</Typography>
                                <Typography display="inline">Perfil del Contratante</Typography>
                                <Typography display="inline">Factura Electrónica</Typography>
                                <Typography display="inline">Tablón de Anuncios</Typography>
                                <Typography display="inline">Portal de Transparencia</Typography>
                                <Typography display="inline">....</Typography>
                            </Grid>
                        </Box>
                        </Grid>
                    </Link>
                </Paper>
                <Button onClick={() => navigate('/contacto', {replace: true})}>
                <Paper elevation={12} sx={{backgroundSize: "cover", backgroundImage: `url(${"/contacto.jpg"})`, 
                '&:hover': { opacity: [0.9, 0.9, 0.9], }, color:"darkred", width: "100%", height:115, margin:1, padding:1, 
                my: 1.5, ml:1, border: "1px solid white"}}>
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Typography display="inline"><Box sx={{ color:"red", fontWeight: 'bold'}}>ATENCIÓN AL CIUDADANO</Box></Typography>
                    </Grid>
                </Paper>
                </Button>
                <Link rel="noopener noreferrer" target="_blank" href="https://google.es/" underline="none">
                <Paper elevation={12} sx={{backgroundSize: "cover", backgroundImage: `url(${"/anuncio.jpg"})`, 
                '&:hover': { opacity: [0.9, 0.9, 0.9], }, color:"darkred", width: 290*0.75, height:100, margin:1, padding:1, 
                my: 1.5, ml:1, border: "1px solid white", backgroundPosition: 'center',}}>
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Typography display="inline"><Box sx={{ color:"white", fontWeight: 'bold'}}>NOTICIAS</Box></Typography>
                    </Grid>
                </Paper>
                </Link>
            </Grid>
        </Box>
        </Grid>

        <Grid item>
        <Box sx={{backgroundColor: "#b71c1c", color:"#000000", backgroundSize: 'cover', backgroundPosition: 'center', 
            my: 1, ml:1, borderRadius: '9px'}}>
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Avatar sx={{ my: 0.5, color:"#000000", bgcolor: "#b71c1c" }}><TravelExploreIcon/></Avatar>
                <Typography display="inline">PORTALES DE INTERÉS</Typography>
            </Grid>
            <Divider  sx={{ bgcolor: "#000000" }} variant="middle"/>

            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Link rel="noopener noreferrer" target="_blank" href="https://www.dipuleon.es/" underline="none">
                <Paper elevation={12} sx={{backgroundSize: "cover", backgroundImage: `url(${"/diputacion.jpg"})`, 
                '&:hover': { opacity: [0.9, 0.9, 0.9], }, color:"#000000", width: 290*0.75, height:70, margin:1, padding:1, 
                my: 1.5, ml:1, border: "1px solid black"}} />
                </Link>
                <Link rel="noopener noreferrer" target="_blank" href="https://www.jcyl.es/" underline="none">
                <Paper elevation={12} sx={{backgroundSize: "cover", backgroundImage: `url(${"/jcyl.jpg"})`, 
                '&:hover': { opacity: [0.9, 0.9, 0.9], }, color:"#000000", width: 290*0.75, height:65, margin:1, padding:1, 
                my: 1.5, ml:1, border: "1px solid black"}} />
                </Link>
                <Link rel="noopener noreferrer" target="_blank" href="http://www.cuatrovalles.es/" underline="none">
                <Paper elevation={12} sx={{backgroundSize: "cover", backgroundImage: `url(${"/4valles.jpg"})`, 
                '&:hover': { opacity: [0.9, 0.9, 0.9], }, color:"#000000", width: 290*0.75, height:40, margin:1, padding:1, 
                my: 1.5, ml:1, border: "1px solid black"}} />
                </Link>
                <Paper sx={{margin:1,  my: 1.5, ml:1}}>
                    <div id="c_35d69abd4d2b56343d2b7080a525b502" class="normal"></div>
                    {useScript('https://www.eltiempo.es/widget/widget_loader/35d69abd4d2b56343d2b7080a525b502')}
                </Paper>
            </Grid>
        </Box>
        </Grid>
        </Grid>
    );
}

export default Sidenav;