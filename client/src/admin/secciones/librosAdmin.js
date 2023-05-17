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
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import EventosCard from './eventosCard';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import LibrosCard from './librosCard';

import CircularProgress from '@mui/material/CircularProgress';
import Axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const LibrosAdmin = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertText, setAlertText] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState("");

    const [biblioteca, setBiblioteca] = useState("");

    useEffect(() => {
        getBiblioteca();
    }, []);

    function getBiblioteca(){
        Axios.get('/books/library').then((response) => {
          setBiblioteca(response.data);
          if(response.data!="false" && response.data!=false){
            getLibros();
          }else{
            setLoading(false);
          }
        });
    }

    function getLibros(){
        Axios.get('/books').then((response) => {
          setLibros(response.data);
          setLoading(false);
        });
    }

    function onChange(tipo){
        setLibros([]);
        if(tipo==="editar"){ setLoading(true); setAlertText("Libro editado correctamente");}
        if(tipo==="añadir"){ setLoading(true); setAlertText("Libro añadido correctamente");}
        if(tipo==="reserva"){ setLoading(true); setAlertText("Reserva de libro modificada");}

        delay(1000).then( () => {
            Axios.get('/books').then((response) => {
                setLibros(response.data);
                setLoading(false);
                setOpenSnackbar(true);
        });
        })
    }

    function delay(time) { return new Promise(resolve => setTimeout(resolve, time));}

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenSnackbar(false);
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [details, setDetails] = useState({titulo:"", ISBN:0, autor:""});
    const [date, setDate] = React.useState(dayjs());

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        var dateS = new Date(dayjs(date).toDate());
        dateS.setDate(dateS.getDate() + 1);
        let fecha = dateS.getFullYear() + "-" + (dateS.getMonth() + 1) + "-" + dateS.getDate();
    
        if(details.titulo==="" || details.autor==="" || details.ISBN<=0){
            setError("Rellene todos los campos");
            setOpen(false);
            setOpenAlert(true);
        }else if(specialChars.test(details.titulo) || specialChars.test(details.ISBN)){
            setError("No se permiten caracteres especiales");
            setOpen(false);
            setOpenAlert(true);
        }else{
            setLoading(true);

            Axios.post("/books", {titulo:details.titulo, ISBN:details.ISBN, autor:details.autor, fecha:fecha})
            .then((response) => {
                if(!response.data){
                    setError("Datos incorrectos");
                    setOpen(false);
                    setOpenAlert(true);
                    setLoading(false);
                }else{
                    setOpen(false);
                    onChange("añadir");
                }
            }).catch((error) => {
                if(error.response){
                    setError("Error al intentar conectar con la base de datos");
                    setOpen(false);
                    setOpenAlert(true);
                }
                setLoading(false);
            });
        }
    };

    return(
        <Box sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
        {(loading) ? (
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" sx={{my:1}}>
            <CircularProgress />
        </Grid>
        ) : (
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
            {(biblioteca=="") ? (
            <div>
                <Typography align="center" display="inline"><Box sx={{fontSize:20, fontWeight: 'bold'}}>No tiene ninguna biblioteca que administrar</Box></Typography>
            </div>
            ) : (
            <div>
                <Typography display="inline" sx={{fontSize:16}}>Está usted a cargo de </Typography>
                <Typography display="inline" sx={{fontSize:20, fontWeight: 'bold', textDecoration: 'underline'}}>{biblioteca}</Typography>
            </div>
            )}
        </Grid>
        )}

        {(biblioteca!="") ? (
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" sx={{mt:2}}>
            <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={handleClickOpen} sx={{minWidth:"15%"}}>
                <AddIcon sx={{ mr: 1 }} />
                Añadir Libro
            </Fab>
        </Grid>
        ) : ""}

        <Grid container rowSpacing={2} columnSpacing={2} padding={1} direction="row" sx={{mt:0.5, mb:2}} alignItems="center">
        {libros.map((card) => (
            <Grid item key={card.id} xs={12} sm={6}>
                <LibrosCard onChange={onChange} card={card} />
            </Grid>
        ))}
        </Grid>

        <Box sx={{position: "absolute", bottom: 20, right: 20}} >
            <Dialog fullWidth="300px" sx={{width:"50"}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Añadir Contenido</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                    <br></br>
                    <TextField autoFocusmargin="dense" id="titulo" label="Título" type="text" fullWidth onChange={e => setDetails({ ...details, titulo: e.target.value })}/>
                    <br></br>
                    <TextField autoFocusmargin="dense" label="Autor" id="autor" type="text" fullWidth onChange={e => setDetails({ ...details, autor: e.target.value })}/>
                    <br></br>
                    <TextField autoFocusmargin="dense" label="ISBN" id="doc" type="number" fullWidth onChange={e => setDetails({ ...details, ISBN: e.target.value })}/>
                    <br></br>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                        label="Fecha publicación"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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

        <Box sx={{ position: "absolute", bottom: "50%", right: "35%" }}>
          <Collapse in={openAlert}>
            <Alert severity="warning" variant="filled"
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenAlert(false) }} >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>No se ha podido agregar el contenido</AlertTitle>
              <strong>{error}</strong>
            </Alert>
          </Collapse>
        </Box>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {alertText}
            </Alert>
        </Snackbar>

        </Box>
    );
}

export default LibrosAdmin;