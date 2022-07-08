import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import AttachmentIcon from '@mui/icons-material/Attachment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

import { Typography } from '@mui/material';

const Sidenav = () => {
    return(
        <Box sx={{backgroundColor: "#222222", color:"#ffffff", backgroundSize: 'cover', backgroundPosition: 'center', 
            my: 2, ml:1, width: 290, maxWidth: { xs: 350, md: 300 }, borderRadius: '9px'}}>
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
                <Link rel="noopener noreferrer" target="_blank" href="https://google.es/" underline="none">
                <Paper elevation={12} sx={{backgroundSize: "cover", backgroundImage: `url(${"/contacto.jpg"})`, 
                '&:hover': { opacity: [0.9, 0.9, 0.9], }, color:"darkred", width: 290*0.75, height:115, margin:1, padding:1, 
                my: 1.5, ml:1, border: "1px solid white"}}>
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Typography display="inline"><Box sx={{ color:"red", fontWeight: 'bold'}}>ATENCIÓN AL CIUDADANO</Box></Typography>
                    </Grid>
                </Paper>
                </Link>
                <Link rel="noopener noreferrer" target="_blank" href="https://google.es/" underline="none">
                <Paper elevation={12} sx={{backgroundSize: "cover", backgroundImage: `url(${"/anuncio.jpg"})`, 
                '&:hover': { opacity: [0.9, 0.9, 0.9], }, color:"darkred", width: 290*0.75, height:100, margin:1, padding:1, 
                my: 1.5, ml:1, border: "1px solid white"}}>
                    <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Typography display="inline"><Box sx={{ color:"white", fontWeight: 'bold'}}>BANDOS Y ANUNCIOS</Box></Typography>
                    </Grid>
                </Paper>
                </Link>
            </Grid>
        </Box>
    );
}

export default Sidenav;