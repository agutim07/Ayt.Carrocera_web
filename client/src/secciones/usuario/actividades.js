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
    const [durations, setDuration] = useState(getDurations());

    useEffect(() => {
        Axios.get('/login').then((response) => {
            setLogged(response.data);
            if(response.data){
                if(response.data=="empadronado"){setEmpadronado(true);}
                Axios.get('/activities').then((response) => {
                    setActivities(response.data);
                    setSelected(response.data[0]);
                    setTimes(generateTimes(response.data[0]));
                    setLoading(false);
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
        setSelected(newValue);
        setTimes(generateTimes(newValue));
    }

    const [date, setDate] = React.useState(dayjs());
    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const [snackState, setSnackState] = React.useState("success");
    const [snackMsg, setSnackMsg] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar(false);
    };

    function dateToLabel(date){
        date = new Date(date);
        const currentMonth = date.getMonth()+1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${dateString}`;
    }

    function handleSubmitReserva(b,devolucion){
        /* if(!b.disponibilidad && !devolucion){
            setSnackMsg("Este libro ya está reservado"); setSnackState("warning"); setOpenSnackbar(true); 
            return;
        }

        setLoading(true);
        Axios.put("/books/reserva/"+b._id).then((response) => {
            if(response.data){
                Axios.get('/books/all').then((response) => {
                    setBooks(response.data);
                    setBooks2(response.data);
                    setFiltro("todas");
                    setBibs(getBibs(response.data));
                    setLoading(false);
                    if(devolucion){
                        setSnackMsg("Libro devuelto correctamente"); 
                    }else{
                        setSnackMsg("Libro reservado correctamente"); 
                    }
                    setSnackState("success"); setOpenSnackbar(true);
                })
            }else{
                setError("Solo puede tener un libro reservado en "+b.biblioteca);
                setOpen(true);
                setLoading(false);
            }
        }).catch((error) => {
            setError("Error al intentar conectar con la base de datos");
            setOpen(true);
            setLoading(false);
        }); */
    };

    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    function generateTimes(ev){
        var t = [];
        for(let i=ev.open; i<=ev.close; i++){
            var label = "";
            if(i<10){label+="0";}
            label+=i+":00";

            var temp = {label:label,value:i};
            t.push(temp);
        }
        setDetails({ ...details, hora: ev.open});
        return t;
    }

    function getDurations(){
        var t = [];
        t.push({label:"30min",value:0.5});  t.push({label:"1h",value:1});
        t.push({label:"1h 30min",value:1.5});  t.push({label:"2h",value:2});
        t.push({label:"2h 30min",value:2.5});  t.push({label:"3h",value:3});
        return t;
    }

    function getDate(l){
        let out = "";

        if(l<10){out+=0;}
        out+=l+":00";

        return out;
    }

    const [details, setDetails] = useState({price:0, hora:14, duracion:0.5});

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
                                <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                    <Box display="flex" justifyContent="center" alignItems="center" sx={{mb:1}}>
                                        <Chip icon={<LocationOnIcon />} label={selected.loc} sx={{backgroundColor:'green'}}/>
                                    </Box>
                                    <Grid container direction="row" sx={{mb:2}}>
                                        <Chip icon={<AccessTimeIcon />} sx={{mr:0.5}} label={"Desde "+getDate(selected.open)} />
                                        <Chip icon={<AccessTimeIcon />} sx={{ml:0.5}} label={"Hasta "+getDate(selected.close)} />
                                    </Grid>
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
                                    <Grid container direction="row" alignItems="center" justifyContent="center">
                                    <FormControl margin="normal" name="filtro" label="Hora" type="text" sx={{ mr:1, input: { color: 'white' } }}>
                                        <InputLabel>Hora</InputLabel>
                                        <Select
                                            sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                                            value={details.hora}
                                            label="Hora"
                                            onChange={e => setDetails({ ...details, hora: e.target.value })}>
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
                                </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : ""}
                </Paper>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackState} sx={{ width: '100%' }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

export default Actividades;