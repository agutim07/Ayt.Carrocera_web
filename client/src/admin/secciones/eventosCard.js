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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close'

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

const EventosCard = ({onChange, card}) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [openBorrar, setOpenBorrar] = useState(false);
    const handleCloseBorrar = () => {
        setOpenBorrar(false);
    };
    const handleSubmitBorrar = () => {
        Axios.delete("https://ayuntamientocarrocera.herokuapp.com/api/events/"+card.id).then(() => {
            setOpenBorrar(false);
            onChange("borrar");
        });
    };

    const [details, setDetails] = useState({title:card.title, doc:card.doc, content:card.content, loc:card.loc});
    const [date, setDate] = React.useState(dayjs(card.fecha));
    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        details.title=card.title; details.doc=card.doc; details.content=card.content; details.loc=card.loc;
        setDate(dayjs(card.fecha));
        setOpen(false);
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        let fecha = date.$y + "-" + (date.$M+1) + "-" + date.$D;

        if (details.title === "") {
            setError("Rellene como mínimo el título");
            setOpenAlert(true); 
            details.title=card.title; details.doc=card.doc; details.content=card.content; details.loc=card.loc;
            setDate(dayjs(card.fecha));
            setOpen(false);
        }else{
            setOpen(false);
            Axios.put('https://ayuntamientocarrocera.herokuapp.com/api/events/'+card.id, 
            {title:details.title, doc:details.doc, fecha:fecha, content:details.content, loc:details.loc})
            .then((response) => {
                if(!response.data){
                    setError("No se ha podido añadir el evento");
                    details.title=card.title; details.doc=card.doc; details.content=card.content; details.loc=card.loc;
                    setDate(dayjs(card.fecha));
                    setOpenAlert(true);
                }else{
                    onChange("editar");
                }
            });
        }
        
    }

    const extractFecha = (date) => {
        let dia;
        if(date.slice(8,9)==='0'){
            dia = date.slice(9,10);
        }else{
            dia = date.slice(8,10);
        }
        let fecha = dia + ' de '  + getMes(date.slice(5,7)) + ', ' + date.slice(0,4);
        return fecha;
    }

    const getMes = (mes) => {
        switch (mes){
            case '01': return "Enero";
            case '02': return "Febrero";
            case '03': return "Marzo";
            case '04': return "Abril";
            case '05': return "Mayo";
            case '06': return "Junio";
            case '07': return "Julio";
            case '08': return "Agosto";
            case '09': return "Septiembre";
            case '10': return "Octubre";
            case '11': return "Noviembre";
            case '12': return "Diciembre";
            default : return "";
        }
    }

    return(
        <div>
        <Card elevation={12} sx={{minWidth:500}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                        <CalendarMonthIcon />
                    </Avatar>
                }
                subheader={extractFecha(card.fecha)}
            />
            {(card.loc !== '') ? (
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                        <LocationOnIcon />
                    </Avatar>
                }
                subheader={card.loc}
            />
            ) : ""}
            <CardContent>
                <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                {card.title}
                </Typography>
                {(card.doc !== '') ? (
                <Button2 sx={{mt:1}} onClick={() => window.open(card.doc, '_blank', 'noopener,noreferrer')} variant="contained" startIcon={<PictureAsPdfIcon />} endIcon={<DownloadForOfflineIcon />}>
                    Documento
                </Button2>
                ) : ""}
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardActions>
                    <Button variant="contained" onClick={() => setOpenBorrar(true)} startIcon={<DeleteIcon />}>Borrar</Button>
                    <Button variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />}>Editar</Button>
                </CardActions>
            </div>
            {(card.content !== '') ? (
                <div>
                <CardActions disableSpacing>
                <Grid container justifyContent="flex-end">
                <Button sx={{color:'white'}} onClick={() => handleExpandClick()} endIcon={expanded ? <ExpandLess sx={{color:'white'}} /> : <ExpandMore sx={{color:'white'}}/>} >
                    LEER MÁS
                </Button>
                </Grid>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography>
                        {card.content}
                    </Typography>
                    </CardContent>
                </Collapse>
                </div>
            ) : ""}
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
            <Dialog fullWidth="300px" sx={{width:"50"}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Editar Contenido</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                    <br></br>
                    <TextField defaultValue={card.title} autoFocusmargin="dense" id="titulo" label="Título [Único campo obligatorio]" type="text" fullWidth onChange={e => setDetails({ ...details, title: e.target.value })}/>
                    <br></br>
                    <TextField defaultValue={card.doc} autoFocusmargin="dense" label="Documento [DEBE SER UNA URL DE INTERNET: GOOGLE DRIVE]" id="doc" type="text" fullWidth onChange={e => setDetails({ ...details, doc: e.target.value })}/>
                    <br></br>
                    <TextField defaultValue={card.loc} autoFocusmargin="dense" id="loc" label="Localización" type="text" fullWidth onChange={e => setDetails({ ...details, loc: e.target.value })}/>
                    <br></br>
                    <TextField multiline rows={8} defaultValue={card.content} margin="dense" id="content" label="Contenido" type="text" fullWidth onChange={e => setDetails({ ...details, content: e.target.value })}/>
                    <br></br>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                        label="Fecha"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    </FormControl>
                    <br></br>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}> Editar </Button>
                    <Button onClick={handleClose}> Cancelar </Button>
                </DialogActions>
            </Dialog>
        </Box>

        <Box sx={{ position: "absolute", bottom: "50%", right: "40%" }}>
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

export default EventosCard;