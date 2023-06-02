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

const Libros = () => {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const [books, setBooks] = useState([]);
    const [books2, setBooks2] = useState([]);
    const [filtro, setFiltro] = useState("todas");
    const [bibs, setBibs] = useState([]);

    const [blockAccess, setBlock] = useState("No puede acceder a esta sección sin haber iniciado sesión");

    useEffect(() => {
        Axios.get('/login').then((response) => {
            setLogged(response.data);
            if(response.data){
                if(response.data!="empadronado"){
                    setBlock("Sección exclusiva a usuarios empadronados");
                    setLogged(false);
                    setLoading(false);
                }else{
                    Axios.get('/books/all').then((response) => {
                        setBooks(response.data);
                        setBooks2(response.data);
                        setBibs(getBibs(response.data));
                        setLoading(false);
                    });
                }   
            } else {
                setLoading(false);
            }
        }).catch((error) => {
            setError("Error al intentar conectar con la base de datos");
            setOpen(true);
            setLoading(false);
        });
    }, []);

    function changeFiltro(fil){
        setFiltro(fil);
        if(fil=="todas"){
            setBooks2(books);
        }else{
            var temp = [];
            for(let i=0; i<books.length; i++){
                if(books[i].biblioteca==fil){
                    temp.push(books[i]);
                }
            }
            setBooks2(temp);
        }
    }

    const [snackState, setSnackState] = React.useState("success");
    const [snackMsg, setSnackMsg] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar(false);
    };

    function getBibs(data){
        let bibsAr = [];

        for(let i=0; i<data.length; i++){
            if(!bibsAr.includes(data[i].biblioteca)){
                bibsAr.push(data[i].biblioteca);
            }
        }

        return bibsAr;
    }

    function dateToLabel(date){
        date = new Date(date);
        const currentMonth = date.getMonth()+1;
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
        return `${date.getFullYear()}-${monthString}-${dateString}`;
    }

    function handleSubmitReserva(b,devolucion){
        if(!b.disponibilidad && !devolucion){
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
        });
    };

    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Typography align="center" display="inline"><Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>ALQUILER DE LIBROS</Box></Typography>
                {(logged && !loading) ? (
                <div>
                <Box display="flex" justifyContent="center" alignItems="center">
                <FormControl margin="normal" name="filtro" label="Biblioteca" type="text" sx={{ input: { color: 'white' } }}>
                    <InputLabel>Biblioteca</InputLabel>
                    <Select
                        sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                        id="filtro"
                        value={filtro}
                        label="Biblioteca"
                        onChange={e => changeFiltro(e.target.value)}>
                        <MenuItem value={"todas"}>Todas</MenuItem>
                        {bibs.map((bib) => (
                            <MenuItem value={bib}>{bib}</MenuItem>
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
                                <Box sx={{ mt: 2, fontSize: 14, fontWeight: 'bold', color: 'white' }}>{blockAccess}</Box>
                            </Typography>
                        </Grid>) : ""}
                    {(logged && !loading) ? (
                        <Grid container direction="column" alignItems="center" justifyContent="center">
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                                <TableHead>
                                <TableRow>
                                    <TableCell><b>Biblioteca</b></TableCell>
                                    <TableCell align="right"><b>Titulo</b></TableCell>
                                    <TableCell align="right"><b>Autor</b></TableCell>
                                    <TableCell align="right"><b>Lanzamiento</b></TableCell>
                                    <TableCell align="right"><b>ISBN</b></TableCell>
                                    <TableCell align="right"><b>Estado</b></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {books2.map((book) => (
                                    <TableRow
                                    key={book.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">{book.biblioteca}</TableCell>
                                    <TableCell align="right">{book.titulo}</TableCell>
                                    <TableCell align="right">{book.autor}</TableCell>
                                    <TableCell align="right">{dateToLabel(book.fecha)}</TableCell>
                                    <TableCell align="right">{book.ISBN}</TableCell>
                                    {(book.mio) ? (
                                        <TableCell align="right">
                                            <Chip label={"Devolver"} onClick={() => handleSubmitReserva(book,true)} size="small" sx={{border:1,borderColor:'white',backgroundColor:"orange",color:'black'}} />
                                        </TableCell>
                                    ) : (
                                        <TableCell align="right">
                                            <Chip onClick={() => handleSubmitReserva(book,false)} label={book.disponibilidad ? "Reservar" : "Reservado"} size="small" sx={{backgroundColor:book.disponibilidad ? "green" : "red"}} />
                                        </TableCell>
                                    )}
                                    
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
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

export default Libros;