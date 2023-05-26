import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import Collapse from '@mui/material/Collapse';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import { alpha, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

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

const Perfil = ({ msg, completed }) => {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        Axios.get('/login').then((response) => {
            setLogged(response.data);
            setLoading(false);
            setUsuario(response.data);
            if (msg) {
                setOpenSnackbar(true);
                completed();
            }

            if (response.data) {
                Axios.get('/users/one').then((response) => {
                    setUsuario(response.data);
                });
                console.log(usuario);
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
                <Typography align="center" display="inline"><Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>DATOS PERSONALES</Box></Typography>
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
                        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" sx={{ my: 1 }}>
                            <Typography align="center" display="inline">
                                <Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Editar Usuario {usuario.nombre}
                                    <TextField defaultValue={usuario.nombre} id="nombre" label="Nombre" type="text" fullWidth/>
                                </Box>
                            </Typography>
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

export default Perfil;