import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useNavigate} from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { orange,green } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

import BungalowIcon from '@mui/icons-material/Bungalow';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Divider from '@mui/material/Divider';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

import { pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NoticiasCard from './noticiasCard';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const Button2 = styled(Button)({
    backgroundColor: '#e53935',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    fontFamily: [
        'BlinkMacSystemFont',
    ].join(','),
});

const NoticiasAdmin = () => {
    const news = [
        {id:0, title: 'AYUDAS PARA LA ADQUISICIÓN DE LIBROS DE TEXTO, MATERIAL ESCOLAR Y TRANSPORTE ESCOLAR CURSO 2022/2023', fecha:'9 de Septiembre, 2022', image: '', doc:'/Publicación_Bando_BANDO SUBVENCIÓN MATERIAL ESCOLAR 2022_2023.pdf', content: `Esta ayuda está sujeta a los criterios establecidos en la Ordenanza reguladora de la subvención (BOLETÍN OFICIAL DE LA PROVINCIA n.º 112 de fecha 13 de junio de 2018 , con su modificación en el n.º 134 de fecha de 17 de julio de 2019 y modificación en el n.º 154 de fecha 19 de agosto de 2020)
        Podrá solicitar esta subvención el alumnado del municipio de Carrocera matriculado en determinados centros educativos y que cumpla los requisitos establecidos.
        Plazo de presentación de solicitudes.
        Hasta el 27 de septiembre de 2022
        Las solicitudes se formularán en el modelo que figura como Anexo I de la convocatoria, dirigidas al Alcalde y se presentarán en el Registro de entrada del Ayuntamiento o por cualquiera de los medios señalados en el artículo 16.4 de la Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas,
        Al modelo Anexo I se adjuntarán la documentación citada en el mismo y que es la que establece en el artículo 6 de la Ordenanza.`},
        {id:1, title: 'Noticia de prueba', image: '', doc:'/Publicación_Bando_BANDO SUBVENCIÓN MATERIAL ESCOLAR 2022_2023.pdf', fecha:'2 de Septiembre, 2022', content: ''},
    ]

    const [details, setDetails] = useState();

    const handleSubmit = () => {
        if (details.title === "" || details.precio === "") {
        } else {
        }
        setOpen(false);
    }
    
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Box sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
        <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={handleClickOpen} sx={{maxWidth:"15%"}}>
            <AddIcon sx={{ mr: 1 }} />
            Añadir Noticia
        </Fab>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={2} padding={1} direction="row" sx={{mt:1, mb:2}} alignItems="center">
        {news.map((card) => (
            <Grid item key={card.id} xs={12} sm={6}>
                <NoticiasCard card={card} />
            </Grid>
        ))}
        </Grid>
        <Box sx={{position: "absolute", bottom: 20, right: 20}} >
            <Dialog fullWidth="300px" sx={{width:"50"}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Añadir Contenido</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                    <br></br>
                    <TextField autoFocusmargin="dense" id="titulo" label="Título" type="text" fullWidth />
                    <br></br>
                    <TextField multiline rows={2} autoFocusmargin="dense" id="portada" label="Portada" type="text" fullWidth  />
                    <br></br>
                    </FormControl>
                    <br></br>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}> Añadir </Button>
                    <Button onClick={handleClose}> Cancelar </Button>
                </DialogActions>
            </Dialog>
        </Box>
        </Box>
    );
}

export default NoticiasAdmin;