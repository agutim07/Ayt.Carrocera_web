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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

const ActividadesCard = ({onChange, card, reservas}) => {
    const [details, setDetails] = useState({price:card.price, exclusive:card.exclusive, open:card.open, close:card.close, habilitada:card.habilitada});
    const [times, getTimes] = useState(generateTimes());

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        details.price=card.price; details.exclusive=card.exclusive; details.open=card.open; details.close=card.close; details.habilitada=card.habilitada;
        setOpen(false);
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState("");

    function getDate(l){
        let out = "";

        if(l<10){out+=0;}
        out+=l+":00";

        return out;
    }

    const handleSubmit = () => {
        if (details.price === "") {
            setError("No puede dejar ningún campo vacio");
            setOpenAlert(true); 
            details.price=card.price; details.exclusive=card.exclusive; details.open=card.open; details.close=card.close; details.habilitada=card.habilitada;
            setOpen(false);
        }else if(details.price<0 ||  typeof details.price != 'number'){
            setError("Precio érroneo: debe ser un número mayor o igual a 0");
            setOpenAlert(true); 
            details.price=card.price; details.exclusive=card.exclusive; details.open=card.open; details.close=card.close; details.habilitada=card.habilitada;
            setOpen(false);
        }else if(details.close<=details.open){
            setError("La hora de cierre debe ser mayor a la de apertura");
            setOpenAlert(true); 
            details.price=card.price; details.exclusive=card.exclusive; details.open=card.open; details.close=card.close; details.habilitada=card.habilitada;
            setOpen(false);
        }else{
            setOpen(false);
            Axios.put("/activities/"+card._id, 
            {price:details.price, exclusive:details.exclusive, open:details.open, close:details.close, habilitada:details.habilitada})
            .then((response) => {
                if(!response.data){
                    setError("No se ha podido modificar la actividad");
                    details.price=card.price; details.exclusive=card.exclusive; details.open=card.open; details.close=card.close; details.habilitada=card.habilitada;
                    setOpenAlert(true);
                }else{
                    onChange("editar");
                }
            });
        }
    }

    function generateTimes(){
        var t = [];
        for(let i=0; i<=24; i++){
            var label = "";
            if(i<10){label+="0";}
            label+=i+":00";

            var temp = {label:label,value:i};
            t.push(temp);
        }
        return t;
    }

    function getThisReservas(res){
        var out = [];
        for(let i=0; i<res.length; i++){
            if(res[i].idActividad==card._id){
                out.push(res[i]);
            }
        }
        console.log(out);
        return out;
    }

    const [openRes, setOpenRes] = useState(false);
    const handleClickOpenRes = () => {
        setOpenRes(true);
    };
    const handleCloseRes = () => {
        setOpenRes(false);
    };

    const deleteReserva = (id) => {
        Axios.delete("/activities/reserva/"+id).then(() => {
            handleCloseRes();
            onChange("reserva");
        });
    }

    function getHour(d){
        let sub = dayjs(new Date(d));

        let out = "";
        let h = sub.get('hour');    if(h<10){out+="0";}     out+=h+":";
        let m = sub.get('minute');    if(m<10){out+="0";}     out+=m;
        return out;
    }

    function dateToLabel(date){
        date = new Date(date);
        const currentMonth = date.getMonth()+1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${dateString}`;
    }

    return(
        <div>
            <Card elevation={12} sx={{minWidth:500}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: orange[500] }} variant="rounded">
                            <LocationOnIcon />
                        </Avatar>
                    }
                    subheader={card.addr+", "+card.loc}
                />
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                    {card.name}
                    </Typography>
                    <Grid container direction="row">
                        <Chip icon={<AccessTimeIcon />} sx={{mr:0.5}} label={"Desde "+getDate(card.open)} />
                        <Chip icon={<AccessTimeIcon />} sx={{ml:0.5}} label={"Hasta "+getDate(card.close)} />
                    </Grid>
                    {(!card.habilitada) ? (
                    <Chip sx={{backgroundColor:'#f44336', mt:1}} label="Actividad deshabilitada" />
                    ) : ""}
                </CardContent>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CardActions>
                        <Button variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />}>Editar</Button>
                        <Button variant="contained" onClick={handleClickOpenRes} startIcon={<PeopleOutlineIcon />}>Reservas</Button>
                    </CardActions>
                </div>
            </Card>

            <Box sx={{position: "absolute", bottom: 20, right: 20}} >
                <Dialog fullWidth="300px" sx={{width:"50"}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Editar Contenido</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                        <br></br>
                        <TextField defaultValue={card.price} autoFocusmargin="dense" id="precio" label="Precio/hora (€)" type="number" fullWidth onChange={e => setDetails({ ...details, price: e.target.value })}/>
                        <br></br>
                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <FormControl margin="normal" name="filtro" label="Apertura" type="text" sx={{ input: { color: 'white' } }}>
                                <InputLabel>Apertura</InputLabel>
                                <Select
                                    sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                    value={details.open}
                                    label="Apertura"
                                    onChange={e => setDetails({ ...details, open: e.target.value })}>
                                    {times.map((t) => (
                                        <MenuItem value={t.value}>{t.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <FormControl margin="normal" name="filtro" label="Cierre" type="text" sx={{ input: { color: 'white' } }}>
                                <InputLabel>Cierre</InputLabel>
                                <Select
                                    sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                    value={details.close}
                                    label="Cierre"
                                    onChange={e => setDetails({ ...details, close: e.target.value })}>
                                    {times.map((t) => (
                                        <MenuItem value={t.value}>{t.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={details.exclusive} onChange={e => setDetails({ ...details, exclusive: !details.exclusive })}/>} label="Exclusiva a empadronados" />
                        </FormGroup>
                        <br></br>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={details.habilitada} onChange={e => setDetails({ ...details, habilitada: !details.habilitada })}/>} label="Actividad habilitada" />
                        </FormGroup>
                        <br></br>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit}> Editar </Button>
                        <Button onClick={handleClose}> Cancelar </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box sx={{position: "absolute", bottom: 20, right: 20}} >
            <Dialog fullWidth="600px" sx={{width:"50"}} open={openRes} onClose={handleCloseRes} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Reservas</DialogTitle>
                <DialogContent>
                {(getThisReservas(reservas).length==0) ? (
                    <Typography sx={{color:'white'}}>
                    No hay reservas en esta actividad
                    </Typography>
                ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table" size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell><b>Nombre y apellidos</b></TableCell>
                            <TableCell align="right"><b>Dia</b></TableCell>
                            <TableCell align="right"><b>Desde</b></TableCell>
                            <TableCell align="right"><b>Hasta</b></TableCell>
                            <TableCell align="right"><b>Eliminar</b></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {getThisReservas(reservas).map((res) => (
                            <TableRow
                            key={res.fechaInicio}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">{res.nombre}</TableCell>
                            <TableCell component="th" scope="row">{dateToLabel(res.fechaInicio)}</TableCell>
                            <TableCell component="th" scope="row">{getHour(res.fechaInicio)}</TableCell>
                            <TableCell align="right">{getHour(res.fechaFin)}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => deleteReserva(res._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                )}
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleCloseRes}>
                        <CloseIcon sx={{color:'red'}}/>
                    </IconButton>
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

export default ActividadesCard;