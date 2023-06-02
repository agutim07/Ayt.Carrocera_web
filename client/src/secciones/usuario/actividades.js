import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import { alpha, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EuroIcon from '@mui/icons-material/Euro';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Chip from '@mui/material/Chip';
import { Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'red',
        },
    },
    '& .MuiOutlinedInput-root:hover': {
        '& fieldset': {
            borderColor: "red",
        }
    },
});

const Actividades = () => {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const [empadronado, setEmpadronado] = useState(false);
    const [activities, setActivities] = useState([]);
    const [selected, setSelected] = useState();
    const [times, setTimes] = useState();
    const [durations, setDurations] = useState(getDurations(1));
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        Axios.get('/login').then((response) => {
            setLogged(response.data);
            if(response.data){
                if(response.data=="empadronado"){setEmpadronado(true);}
                Axios.get('/activities').then((response) => {
                    setActivities(response.data);
                    setSelected(response.data[0]);
                    setTimes(generateTimes(response.data[0]));
                    Axios.get('/activities/reservas').then((response) => {
                        setReservas(response.data);
                        setLoading(false);
                    });
                });  
            }else{
                setLoading(false);
            }
        }).catch((error) => {
            setError("Error al intentar conectar con la base de datos");
            setOpen(true);
            setLoading(false);
        });
    }, []);

    const changeSelected = (event, newValue) => {
        setOpenInfo(false);
        setOpen(false);
        setSelected(newValue);
        setTimes(generateTimes(newValue));
        setDurations(getDurations(1));
    }

    const [snackMsg, setSnackMsg] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar(false);
    };

    function handleSubmitReserva(){
        var dateS = new Date(dayjs(date).toDate());
        var minDate = new Date(dayjs());
        if(dateS<=minDate){
            setError("No se pueden efectuar reservas previas a mañana (incluido)");
            setOpen(true);
            return;
        }
        if(!checkAvaliability()){
            setError("En el rango elegido ya existe una reserva");
            setOpen(true);
            return;
        }

        dateS.setDate(dateS.getDate());

        let inicio = dateS.getFullYear() + "/" + (dateS.getMonth() + 1) + "/" + dateS.getDate()+" "+getDate(details.hora);
        let fin = dateS.getFullYear() + "/" + (dateS.getMonth() + 1) + "/" + dateS.getDate()+" "+getDate(details.hora+details.duracion);

        setLoading(true);
        Axios.post("/activities/reserva/"+selected._id, 
        {precio:(selected.price*details.duracion), horas:details.duracion, inicio:inicio, fin:fin})
        .then((response) => {
            if(!response.data){
                setError("No se ha podido efectuar la reserva");
                setOpen(true);
                setLoading(false);
            }else{
                setSnackMsg("Reserva efectuada con éxito");
                setOpenSnackbar(true);
                Axios.get('/activities/reservas').then((response) => {
                    setReservas(response.data);
                    setLoading(false);
                });
            }
        });
    }

    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    function generateTimes(ev){
        var t = [];
        for(let i=ev.open; i<ev.close; i++){
            var label = "";
            if(i<10){label+="0";}
            label+=i+":00";

            var temp = {label:label,value:i};
            t.push(temp);
        }
        setDetails({ ...details, hora: ev.open});
        return t;
    }

    function changeHour(h){
        let dur = details.duracion;

        if((selected.close-h)==2 ||  (selected.close-h)==1){
            console.log("entro");
            if((selected.close-h)==2){setDurations(getDurations(2));}
            if((selected.close-h)==1){setDurations(getDurations(3));}
            dur = 0.5;
        }else{
            setDurations(getDurations(1));
        }

        setDetails({ ...details, hora: h, duracion: dur });
    }

    function getDurations(tipo){
        var t = [];
        t.push({label:"30min",value:0.5});  t.push({label:"1h",value:1});
        if(tipo<=2){t.push({label:"1h 30min",value:1.5});  t.push({label:"2h",value:2});}
        if(tipo<=1){t.push({label:"2h 30min",value:2.5});  t.push({label:"3h",value:3});}
        return t;
    }

    function getDate(l){
        let out = "";
        let time = l%1;
        let min = l-time;

        if(min<10){out+=0;}
        out+=min+":";

        time = time*60;
        if(time<10){out+=0;}
        out+=time;

        return out;
    }

    const [details, setDetails] = useState({hora:14, duracion:0.5});
    const [date, setDate] = React.useState(dayjs().add(1, 'day'));
    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const [openInfo, setOpenInfo] = useState(false);
    const [info, setInfo] = useState([]);
    const openInf = () => {
        setInfo(getInfoForDate());
        setOpenInfo(true);
    }

    function dateToLabel(date){
        date = new Date(date);
        const currentMonth = date.getMonth()+1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${dateString}`;
    }

    function getInfoForDate(){
        var inf = [];

        for(let i=0; i<reservas.length; i++){
            if(reservas[i].idActividad==selected._id){
                let inicio = dayjs(new Date(reservas[i].fechaInicio));
                let actual = new Date(dayjs(date).toDate());
                if(inicio.isSame(actual,'day')){
                    let fin = dayjs(new Date(reservas[i].fechaFin));
                    inf.push({id:reservas[i]._id,inicio:getHour(inicio),fin:getHour(fin),mine:reservas[i].mine});
                }
            }
        }

        return inf;
    }
    
    function getHour(sub){
        let out = "";
        let h = sub.get('hour');    if(h<10){out+="0";}     out+=h+":";
        let m = sub.get('minute');    if(m<10){out+="0";}     out+=m;
        return out;
    }

    function checkAvaliability(){
        const info = getInfoForDate();
        console.log(info);
        const ini = details.hora;
        const fn = details.hora+details.duracion;

        for(let i=0; i<info.length; i++){
            var ini2 = parseInt(info[i].inicio.substring(0,2));
            var fn2 = parseInt(info[i].fin.substring(0,2)) + (parseInt(info[i].fin.substring(3))/60);
            console.log(ini + " "+ini2+" , "+fn+" "+fn2);
            if((ini>ini2 && ini<fn2) || (fn>ini2 && fn<fn2) || (ini<=ini2 && fn>=fn2)){
                return false;
            }
        }
        return true;
    }

    function deleteReserva(id){
        setLoading(true);
        setOpenInfo(false);
        Axios.delete("/activities/reserva/"+id).then((response) => {
            if(response.data){
                setSnackMsg("Reserva eliminada con éxito");
                setOpenSnackbar(true);
                Axios.get('/activities/reservas').then((response) => {
                    setReservas(response.data);
                    setLoading(false);
                });
            }else{
                setError("No se ha podido eliminar la reserva");
                setOpen(true);
                setLoading(false);
            }
        })
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Typography align="center" display="inline"><Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>RESERVA DE ACTIVIDADES</Box></Typography>
                <Paper elevation={12} sx={{
                    backgroundColor: "ffffff", color: "darkred", width: {md: "95%"}, margin: 1,
                    padding: 1, my: 0.5, border: "1px solid black", boxShadow: "3px 3px 3px black"
                }}>
                    {(loading) ? (
                        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" sx={{ my: 1 }}>
                            <CircularProgress />
                        </Grid>) : ""}
                    {(!logged && !loading) ? (
                        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" sx={{ my: 1 }}>
                            <Typography align="center" display="inline">
                                <Box sx={{ mt: 2, fontSize: 14, fontWeight: 'bold', color: 'white' }}>No puede acceder a esta sección sin haber iniciado sesión</Box>
                            </Typography>
                        </Grid>) : ""}
                    {(logged && !loading) ? (
                        <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item xs={4}>
                                <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Tabs
                                    orientation="vertical"
                                    value={selected}
                                    onChange={changeSelected}
                                    sx={{ borderRight: 1, borderColor: 'divider' }}
                                >
                                    {activities.map((act) => (
                                        <Tab label={act.name} value={act} />
                                    ))}
                                </Tabs>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container direction="column" alignItems="center" justifyContent="center">
                                <Collapse in={open}>
                                    <Alert severity="error"
                                    action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                        >
                                        <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{mb: 1}}
                                    >
                                    <strong>{error}</strong>
                                    </Alert>
                                </Collapse>
                                <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                    <Box display="flex" justifyContent="center" alignItems="center" sx={{mb:1}}>
                                        <Chip icon={<LocationOnIcon />} label={selected.loc} sx={{backgroundColor:'green'}}/>
                                    </Box>
                                    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{mb:2}}>
                                        <Chip icon={<AccessTimeIcon />} sx={{mr:0.5}} label={"Desde "+getDate(selected.open)} />
                                        <Chip icon={<AccessTimeIcon />} sx={{ml:0.5}} label={"Hasta "+getDate(selected.close)} />
                                    </Grid>
                                    <Grid container direction="row" alignItems="center" justifyContent="center">
                                    <Grid item xs={7} sx={{mt:0.5}}>
                                    <FormControl fullWidth>
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
                                    </Grid>
                                    <Grid item xs={3} sx={{ml:1}}>
                                    <Button onClick={() => openInf()} sx={{borderColor:'red', color:'red'}} variant="outlined" size="small" startIcon={<InfoIcon />}>
                                        Reservas
                                    </Button>
                                    </Grid>
                                    </Grid>
                                    <Grid container direction="row" alignItems="center" justifyContent="center">
                                    <FormControl margin="normal" name="filtro" label="Hora" type="text" sx={{ mr:1, input: { color: 'white' } }}>
                                        <InputLabel>Hora</InputLabel>
                                        <Select
                                            sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                            value={details.hora}
                                            label="Hora"
                                            onChange={e => changeHour(e.target.value)}>
                                            {times.map((t) => (
                                                <MenuItem value={t.value}>{t.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl margin="normal" name="filtro" label="Duración" type="text" sx={{ mx:1, input: { color: 'white' }, minWidth:80 }}>
                                        <InputLabel>Duración</InputLabel>
                                        <Select
                                            sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                            value={details.duracion}
                                            label="Duración"
                                            onChange={e => setDetails({ ...details, duracion: e.target.value })}>
                                            {durations.map((t) => (
                                                <MenuItem value={t.value}>{t.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Chip sx={{ml:1}} icon={<EuroIcon />} label={selected.price*details.duracion} />
                                    </Grid>
                                    <Button onClick={handleSubmitReserva} fullWidth variant="contained" sx={{ bgcolor:"#e53935", mt: 2, mb: 1, '&:hover': {backgroundColor: 'red', }}}>
                                    Reservar
                                    </Button>
                                    <Collapse in={openInfo}>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{mt:1.5}}>
                                            <IconButton onClick={() => setOpenInfo(false)}>
                                                <CloseIcon sx={{color:'red'}}/>
                                            </IconButton>
                                            {(info.length==0) ? (
                                                <Typography sx={{color:'white'}}>
                                                No hay reservas el {dateToLabel(date)}
                                                </Typography>
                                            ) : (
                                            <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 200 }} aria-label="simple table" size="small">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell><b>Desde</b></TableCell>
                                                    <TableCell align="right"><b>Hasta</b></TableCell>
                                                    <TableCell align="right"><b>Eliminar</b></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {info.map((res) => (
                                                    <TableRow
                                                    key={res.inicio}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                    <TableCell component="th" scope="row">{res.inicio}</TableCell>
                                                    <TableCell align="right">{res.fin}</TableCell>
                                                    <TableCell align="right">
                                                        {(res.mine) ? (
                                                            <Chip label={"Eliminar"} onClick={() => deleteReserva(res.id)} size="small" sx={{border:1,borderColor:'white',backgroundColor:"red",color:'white'}} />
                                                        ) : (
                                                            <Chip label={"No es suya"} size="small" sx={{border:1,borderColor:'white',backgroundColor:"white",color:'black'}} />
                                                        )}
                                                        
                                                    </TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                            </TableContainer>
                                            )}
                                        </Box>
                                    </Collapse>
                                </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : ""}
                </Paper>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

export default Actividades;