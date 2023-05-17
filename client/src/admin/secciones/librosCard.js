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
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
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

        var dateS = new Date(dayjs(date).toDate());
        dateS.setDate(dateS.getDate() + 1);
        let fecha = dateS.getFullYear() + "-" + (dateS.getMonth() + 1) + "-" + dateS.getDate();

        if(details.titulo==="" || details.autor==="" || details.ISBN<=0){
            setError("Rellene todos los campos");
            setOpenAlert(true); 
            details.titulo=card.titulo; details.autor = card.autor; details.disponibilidad = card.disponibilidad; details.ISBN = card.ISBN; details.fecha = card.fecha;
            setDate(dayjs(new Date(card.fecha) - 1));
            setOpen(false);
        }else if(specialChars.test(details.titulo) || specialChars.test(details.ISBN)){
            setError("No se permiten caracteres especiales");
            setOpenAlert(true); 
            details.titulo=card.titulo; details.autor = card.autor; details.disponibilidad = card.disponibilidad; details.ISBN = card.ISBN; details.fecha = card.fecha;
            setDate(dayjs(new Date(card.fecha) - 1));
            setOpen(false);
        }else if(!card.disponibilidad){
            setError("No se pueden editar libros reservados");
            setOpenAlert(true); 
            details.titulo=card.titulo; details.autor = card.autor; details.disponibilidad = card.disponibilidad; details.ISBN = card.ISBN; details.fecha = card.fecha;
            setDate(dayjs(new Date(card.fecha) - 1));
            setOpen(false);
        }else{
            Axios.put("/books/"+card._id, {titulo:details.titulo, ISBN:details.ISBN, autor:details.autor, fecha:fecha})
            .then((response) => {
                if(!response.data){
                    setError("Error al editar");
                    setOpenAlert(true); 
                    details.titulo=card.titulo; details.autor = card.autor; details.disponibilidad = card.disponibilidad; details.ISBN = card.ISBN; details.fecha = card.fecha;
                    setDate(dayjs(new Date(card.fecha) - 1));
                    setOpen(false);
                }else{
                    onChange("editar");
                }
            }).catch((error) => {
                if(error.response){
                    setError("Error al intentar conectar con la base de datos");
                    setOpenAlert(true); 
                    details.titulo=card.titulo; details.autor = card.autor; details.disponibilidad = card.disponibilidad; details.ISBN = card.ISBN; details.fecha = card.fecha;
                    setDate(dayjs(new Date(card.fecha) - 1));
                    setOpen(false);
                }
            });
        }
    }

    const [openBorrar, setOpenBorrar] = useState(false);
    const handleCloseBorrar = () => {
        setOpenBorrar(false);
    };
    const handleSubmitBorrar = () => {
        if(!card.disponibilidad){
            setError("No se pueden borrar libros reservados");
            setOpenAlert(true); 
            setOpenBorrar(false);
        }else{
            Axios.delete("/books/"+card._id).then(() => {
                setOpenBorrar(false);
                onChange("borrar");
            });
        }
    };

    const [openReserva, setOpenReserva] = useState(false);
    const handleCloseReserva = () => {
        setOpenReserva(false);
    };
    const handleSubmitReserva = () => {
        Axios.put("/books/reserva/"+card._id).then(() => {
            setOpenBorrar(false);
            onChange("reserva");
        });
    };
    const openReserva1 = () => {
        if(!card.disponibilidad){
            setOpenReserva(true);
        }else{
            handleSubmitReserva();
        }
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
                    <Chip sx={{backgroundColor:'#f44336', mt:1}} label={"Libro reservado por "+card.user} />
                    ) : ""}
                </CardContent>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CardActions>
                        <Button variant="contained" onClick={() => setOpenBorrar(true)} startIcon={<DeleteIcon />}>Borrar</Button>
                        <Button variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />}>Editar</Button>
                    </CardActions>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CardActions>
                        <Button variant="contained" size="small" onClick={() => openReserva1()} startIcon={<BookmarkBorderIcon />}>{card.disponibilidad ? "Marcar como reservado" : "Eliminar reserva"}</Button>
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

            <Box sx={{ position: "absolute", bottom: 20, right: 20 }} >
            <Dialog fullWidth="300px" sx={{ width: "50" }} open={openReserva} onClose={handleCloseReserva} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title"> ¿Estás seguro? </DialogTitle>
                <DialogContent>
                    {"Eliminarás la reserva de "+card.user}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitReserva}> <strong>SI</strong> </Button>
                    <Button onClick={handleCloseReserva}> NO </Button>
                </DialogActions>
            </Dialog>
            </Box>

            <Box sx={{position: "absolute", bottom: 20, right: 20}} >
                <Dialog fullWidth="300px" sx={{width:"50"}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Editar Contenido</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                        <br></br>
                        <TextField defaultValue={card.titulo} autoFocusmargin="dense" id="titulo" label="Título" type="text" fullWidth onChange={e => setDetails({ ...details, titulo: e.target.value })}/>
                        <br></br>
                        <TextField defaultValue={card.autor} autoFocusmargin="dense" label="Autor" id="autor" type="text" fullWidth onChange={e => setDetails({ ...details, autor: e.target.value })}/>
                        <br></br>
                        <TextField defaultValue={card.ISBN} autoFocusmargin="dense" label="ISBN" id="doc" type="number" fullWidth onChange={e => setDetails({ ...details, ISBN: e.target.value })}/>
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
                        <Button onClick={handleSubmit}> Editar </Button>
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
                <AlertTitle>No se ha podido editar el contenido</AlertTitle>
                <strong>{error}</strong>
                </Alert>
            </Collapse>
            </Box>
        </div>
    );
}

export default LibrosCard;