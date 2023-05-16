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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import BungalowIcon from '@mui/icons-material/Bungalow';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleIcon from '@mui/icons-material/Article';
import {Link} from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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

const LibrosCard = ({onChange, card}) => {
    const [details, setDetails] = useState({titulo: card.titulo, autor: card.autor, disponibilidad:card.disponibilidad, ISBN:card.ISBN, fecha:card.fecha});

    const [date, setDate] = React.useState(dayjs(new Date(card.fecha) - 1));
    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        details.titulo=card.titulo; details.autor = card.autor; details.disponibilidad = card.disponibilidad; details.ISBN = card.ISBN; details.fecha = card.fecha;
        setDate(dayjs(new Date(card.fecha) - 1));
        setOpen(false);
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        /* var dateS = new Date(dayjs(date).toDate());
        dateS.setDate(dateS.getDate() + 1);
        let fecha = dateS.getFullYear() + "-" + (dateS.getMonth() + 1) + "-" + dateS.getDate();

        if(details.username==="" || details.pass==="" || details.dni ==="" || details.apellidos==="" || details.nombre===""){
            setError("Rellene todos los campos");
            setOpenAlert(true); 
            details.username=card.username; details.pass=card.pass; details.nombre=card.nombre; details.apellidos=card.apellidos; details.dni=card.dni; details.fechaNac=card.fechaNac; details.sexo=card.sexo; details.rol=card.rol;
            setDate(dayjs(new Date(card.fechaNac) - 1));
            setOpen(false);
        }else if(specialChars.test(details.username) || specialChars.test(details.pass)){
            setError("No se permiten caracteres especiales");
            setOpenAlert(true); 
            details.username=card.username; details.pass=card.pass; details.nombre=card.nombre; details.apellidos=card.apellidos; details.dni=card.dni; details.fechaNac=card.fechaNac; details.sexo=card.sexo; details.rol=card.rol;
            setDate(dayjs(new Date(card.fechaNac) - 1));
            setOpen(false);
        }else if(!validateDNI(details.dni)){
            setError("DNI no válido");
            setOpenAlert(true); 
            details.username=card.username; details.pass=card.pass; details.nombre=card.nombre; details.apellidos=card.apellidos; details.dni=card.dni; details.fechaNac=card.fechaNac; details.sexo=card.sexo; details.rol=card.rol;
            setDate(dayjs(new Date(card.fechaNac) - 1));
            setOpen(false);
        }else{

            Axios.put("/users/"+card._id, {usuario:details.username, contrasena:details.pass, rol:details.rol,
                 nombre: details.nombre, apellidos:details.apellidos,dni:details.dni, fecha:fecha,sexo:details.sexo})
            .then((response) => {
                if(!response.data){
                    setError("Registro inválido: el DNI y el username deben ser únicos");
                    setOpenAlert(true); 
                    details.username=card.username; details.pass=card.pass; details.nombre=card.nombre; details.apellidos=card.apellidos; details.dni=card.dni; details.fechaNac=card.fechaNac; details.sexo=card.sexo; details.rol=card.rol;
                    setDate(dayjs(new Date(card.fechaNac) - 1));
                    setOpen(false);
                }else{
                    onChange("editar");
                }
            }).catch((error) => {
                if(error.response){
                    setError("Error al intentar conectar con la base de datos");
                    setOpenAlert(true); 
                    details.username=card.username; details.pass=card.pass; details.nombre=card.nombre; details.apellidos=card.apellidos; details.dni=card.dni; details.fechaNac=card.fechaNac; details.sexo=card.sexo; details.rol=card.rol;
                    setDate(dayjs(new Date(card.fechaNac) - 1));
                    setOpen(false);
                }
            });
        } */
    }

    const [openBorrar, setOpenBorrar] = useState(false);
    const handleCloseBorrar = () => {
        setOpenBorrar(false);
    };
    const handleSubmitBorrar = () => {
        /* Axios.delete("/users/"+card._id).then(() => {
            setOpenBorrar(false);
            onChange("borrar");
        }); */
    };

    return(
        <div>
            <Card elevation={12} sx={{minWidth:500}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "#9c27b0" }} variant="rounded">
                            <SentimentSatisfiedIcon />
                        </Avatar>
                    }
                    subheader={card.autor}
                />
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                    {card.titulo}
                    </Typography>
                    {(!card.disponibilidad) ? (
                    <Chip sx={{backgroundColor:'#f44336', mt:1}} label="Libro reservado" />
                    ) : ""}
                </CardContent>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CardActions>
                        <Button variant="contained" onClick={() => setOpenBorrar(true)} startIcon={<DeleteIcon />}>Borrar</Button>
                        <Button variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />}>Editar</Button>
                    </CardActions>
                </div>
            </Card>

            <Box sx={{ position: "absolute", bottom: 20, right: 20 }} >
            <Dialog fullWidth="300px" sx={{ width: "50" }} open={openBorrar} onClose={handleCloseBorrar} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title"> ¿Estás seguro? </DialogTitle>
                <DialogContent>
                    Esta acción no tiene marcha atrás.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitBorrar}> <strong>SI</strong> </Button>
                    <Button onClick={handleCloseBorrar}> NO </Button>
                </DialogActions>
            </Dialog>
            </Box>

            <Box sx={{position: "absolute", bottom: 20, right: 20}} >
                {/* <Dialog fullWidth="300px" sx={{width:"50"}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Editar Contenido</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                        <br></br>
                        <TextField defaultValue={card.dni} autoFocusmargin="dense" id="dni" label="DNI" type="text" fullWidth onChange={e => setDetails({ ...details, dni: e.target.value })}/>
                        <br></br>
                        <TextField defaultValue={card.nombre} autoFocusmargin="dense" id="nombre" label="Nombre" type="text" fullWidth onChange={e => setDetails({ ...details, nombre: e.target.value })}/>
                        <br></br>
                        <TextField defaultValue={card.apellidos} autoFocusmargin="dense" id="apellidos" label="Apellidos" type="text" fullWidth onChange={e => setDetails({ ...details, apellidos: e.target.value })}/>
                        <br></br>
                        <TextField defaultValue={card.username} autoFocusmargin="dense" id="username" label="Nombre de usuario" type="text" fullWidth onChange={e => setDetails({ ...details, username: e.target.value })}/>
                        <br></br>
                        <TextField defaultValue={card.pass} autoFocusmargin="dense" id="pass" label="Contraseña" type="text" fullWidth onChange={e => setDetails({ ...details, pass: e.target.value })}/>
                        <br></br>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                label="Fecha de nacimiento"
                                inputFormat="DD/MM/YYYY"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <br></br>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={details.sexo}
                            label="Sexo"
                            onChange={e => setDetails({ ...details, sexo: e.target.value })}
                            >
                                <MenuItem value={"Hombre"}>Hombre</MenuItem>
                                <MenuItem value={"Mujer"}>Mujer</MenuItem>
                            </Select>
                        </FormControl>
                        <br></br>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={details.rol}
                            label="Tipo de usuario"
                            onChange={e => setDetails({ ...details, rol: e.target.value })}
                            >
                                <MenuItem value={"normal"}>Normal</MenuItem>
                                <MenuItem value={"empadronado"}>Empadronado</MenuItem>
                            </Select>
                        </FormControl>
                        <br></br>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit}> Editar </Button>
                        <Button onClick={handleClose}> Cancelar </Button>
                    </DialogActions>
                </Dialog> */}
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
                <AlertTitle>No se ha podido editar el contenido</AlertTitle>
                <strong>{error}</strong>
                </Alert>
            </Collapse>
            </Box>
        </div>
    );
}

export default LibrosCard;