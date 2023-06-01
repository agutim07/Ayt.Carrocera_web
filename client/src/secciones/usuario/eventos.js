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
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Chip from '@mui/material/Chip';
import { Checkbox, FormControlLabel, MenuItem } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';

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

const Eventos = () => {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const [events, setEvents] = useState([]);
    const [events2, setEvents2] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [pueblos, setPueblos] = useState([]);

    useEffect(() => {
        Axios.get('/login').then((response) => {
            setLogged(response.data);
            if(response.data){
                Axios.get('/events').then((response) => {
                    setEvents(response.data);
                    setEvents2(response.data);
                    setPueblos(getPueblos(response.data));
                    setLoading(false);
                });
            }  
        }).catch((error) => {
            setError("Error al intentar conectar con la base de datos");
            setOpen(true);
            setLoading(false);
        });
    }, []);

    function changeFiltro(fil){
        setFiltro(fil);
        if(fil=="todos"){
            setEvents2(events);
        }else{
            var temp = [];
            for(let i=0; i<events.length; i++){
                if(events[i].loc==fil){
                    temp.push(events[i]);
                }
            }
            setEvents2(temp);
        }
    }

    const [snackState, setSnackState] = React.useState("success");
    const [snackMsg, setSnackMsg] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar(false);
    };

    function getPueblos(data){
        let pubAr = [];

        for(let i=0; i<data.length; i++){
            if(!pubAr.includes(data[i].loc)){
                pubAr.push(data[i].loc);
            }
        }

        return pubAr;
    }

    function dateToLabel(date){
        date = new Date(date);
        const currentMonth = date.getMonth()+1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${dateString}`;
    }

    function handleSubmitEvento(e){
        if(e.itsIn){
            setSnackMsg("Se ha desapuntado de "+e.title);
        }else{
            setSnackMsg("Se ha apuntado a "+e.title);
        }

        setLoading(true);
        Axios.put("/events/apuntar/"+e._id).then((response) => {
            if(response.data){
                Axios.get('/events').then((response) => {
                    setEvents(response.data);
                    setEvents2(response.data);
                    setPueblos(getPueblos(response.data));
                    setFiltro("todos");
                    setLoading(false);
                    setSnackState("success"); setOpenSnackbar(true);
                })
            }else{
                setError("Error al intentar des/apuntarse al evento");
                setOpen(true);
                setLoading(false);
            }
        }).catch((error) => {
            setError("Error al intentar conectar con la base de datos");
            setOpen(true);
            setLoading(false);
        });
    };

    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const [openInfo, setOpenInfo] = useState(false);
    const [info, setInfo] = useState("");
    const openInf = (e) => {
        setInfo(e.content);
        setOpenInfo(true);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Typography align="center" display="inline"><Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>APUNTARSE A EVENTOS</Box></Typography>
                {(logged && !loading) ? (
                <div>
                <Box display="flex" justifyContent="center" alignItems="center">
                <FormControl margin="normal" name="filtro" label="Pueblos" type="text" sx={{ input: { color: 'white' } }}>
                    <InputLabel>Pueblos</InputLabel>
                    <Select
                        sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                        id="filtro"
                        value={filtro}
                        label="Pueblos"
                        onChange={e => changeFiltro(e.target.value)}>
                        <MenuItem value={"todos"}>Todas</MenuItem>
                        {pueblos.map((pub) => (
                            <MenuItem value={pub}>{pub}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Box>
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
                </div>
                ) : ""}
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
                        <Grid container direction="column" alignItems="center" justifyContent="center">
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                                <TableHead>
                                <TableRow>
                                    <TableCell><b>Pueblo</b></TableCell>
                                    <TableCell align="right"><b>Nombre</b></TableCell>
                                    <TableCell align="right"><b>Fecha</b></TableCell>
                                    <TableCell align="right"><b>Descripción</b></TableCell>
                                    <TableCell align="right"><b>Apuntarse</b></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {events2.map((event) => (
                                    <TableRow
                                    key={event.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">{event.loc}</TableCell>
                                    <TableCell align="right">{event.title}</TableCell>
                                    <TableCell align="right">{dateToLabel(event.fecha)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => openInf(event)}>
                                            <InfoIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        {(event.inscripcion) ? (
                                            <Chip label={event.itsIn ? "Desapuntarme" : "Apuntarme"} onClick={() => handleSubmitEvento(event)} size="small" sx={{border:1,borderColor:'white',backgroundColor:event.itsIn ? "red" : "green",color:'white'}} />
                                        ) : (
                                            <Chip label={"No necesario"} size="small" sx={{border:1,borderColor:'white',backgroundColor:"white",color:'black'}} />
                                        )}
                                        
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            <Collapse in={openInfo}>
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{mt:1.5}}>
                                    <IconButton onClick={() => setOpenInfo(false)}>
                                        <CloseIcon sx={{color:'red'}}/>
                                    </IconButton>
                                    <Typography sx={{color:'white'}}>
                                    {info}
                                    </Typography>
                                </Box>
                            </Collapse>
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

export default Eventos;