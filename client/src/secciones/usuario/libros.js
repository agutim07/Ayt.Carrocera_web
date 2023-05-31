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


import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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

const Libros = ({ msg, completed }) => {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);

    //const [details, setDetails] = useState({ titulo: completed.titulo, autor: completed.autor, disponibilidad: completed.disponibilidad, ISBN: completed.ISBN, fecha: completed.fecha });


    useEffect(() => {
        Axios.get('/login').then((response) => {
            setLogged(response.data);
            setLoading(false);
            if (msg) {
                setOpenSnackbar(true);
                completed();
            }
        });
    }, []);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Typography align="center" display="inline"><Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>ALQUILER DE LIBROS</Box></Typography>
                <Paper elevation={12} sx={{
                    backgroundColor: "ffffff", color: "darkred", width: { xs: "85%", md: "60%" }, margin: 1,
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
                            <Typography align="center" display="inline">
                                <Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Filtrar por:
                                </Box>
                            </Typography>
                            <Grid container direction="row" alignItems="center" justifyContent="center">
                                <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                    <FormControl fullWidth margin="normal" name="biblioteca" label="Biblioteca" type="text"
                                        sx={{ input: { color: 'white' }, width: '150px' }} InputLabelProps={{ sx: { color: 'white' } }} id="bibliotecaFC">
                                        <InputLabel id="bibliotecaIL">Bibliotecas</InputLabel>
                                        <Select
                                            labelId="bibliotecaIL"
                                            id="biblioteca"
                                            label="Biblioteca">
                                            <MenuItem value={"Otero"}>Otero</MenuItem>
                                            <MenuItem value={"Benllera"}>Benllera</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                    <CustomTextField fullWidth margin="normal" name="name" label="Nombre" type="text"
                                        sx={{ input: { color: 'white' }, width: '200px' }} InputLabelProps={{ sx: { color: 'white' } }} id="name"
                                    />
                                </Box>
                                <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                    <Button fullWidth variant="contained" sx={{ bgcolor: "#FFFFFF", '&:hover': { backgroundColor: "#008000", } }}>
                                        Filtrar
                                    </Button>
                                </Box>
                            </Grid>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                            </Box>
                            
                            {/*<Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <Card elevation={12} sx={{ minWidth: 500 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: "#9c27b0" }} variant="rounded">
                                                <SentimentSatisfiedIcon />
                                            </Avatar>
                                        }
                                        subheader={completed.autor}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: 15, sm: 18 } }} component="div">
                                            {completed.titulo}
                                        </Typography>
                                        {(!completed.disponibilidad) ? (
                                            <Chip sx={{ backgroundColor: '#f44336', mt: 1 }} label={"Libro reservado por " + completed.user} />
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
                            </Box>*/}
                        </Grid>
                    ) : ""}
                </Paper>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Inicio de sesión correcto
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

export default Libros;