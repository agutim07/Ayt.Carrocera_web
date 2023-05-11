import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import Collapse from '@mui/material/Collapse';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import {alpha,styled} from '@mui/material/styles';
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

const InicioSesion = () => {

    const [details, setDetails] = useState({ user: '', pass: '' });
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [logged, setLog] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();

        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (details.user === "" || details.pass === "") {
            setError("Rellene todos los campos");
            setOpen(true);
        } else if (specialChars.test(details.user) || specialChars.test(details.pass)) {
            setError("No se permiten caracteres especiales");
            setOpen(true);
        } else {
            setLoading(true);

            Axios.post("/login/user", { username: details.user, pass: details.pass })
                .then((response) => {
                    if (!response.data) {
                        setError("Datos incorrectos");
                        setOpen(true);
                    } else {
                        setLog(true);
                        setOpenSnackbar(true);
                    }
                    setLoading(false);
                }).catch((error) => {
                    if (error.response) {
                        setError("Error al intentar conectar con la base de datos");
                        setOpen(true);
                    }
                    setLoading(false);
                });
        }
    };

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
        <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3}}>
            <Typography align="center" display="inline"><Box sx={{ mt:2, fontSize:20, fontWeight: 'bold', color:'white'}}>INICIO DE SESIÓN</Box></Typography>
            <Paper elevation={12} sx={{ backgroundColor: "ffffff", color:"darkred", width: { xs: "85%", md:"60%" }, margin:1, 
            padding:1, my: 0.5, border: "1px solid black", boxShadow: "3px 3px 3px black" }}>
                <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
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
                            sx={{ mb: 2 }}>
                            <AlertTitle>Inicio de sesión incorrecto</AlertTitle>
                            <strong>{error}</strong>
                        </Alert>
                    </Collapse>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 0.5, mr: 3 }}>
                        <Grid item>
                            <CustomTextField margin="normal" required fullWidthtype="text"
                            sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}}
                            id="user" label="Usuario" name="user" variant="outlined"
                            onChange={e => setDetails({ ...details, user: e.target.value })} value={details.user} />
                        </Grid>
                        <Grid item>
                                <CustomTextField margin="normal" required fullWidthtype="text"
                                sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}}
                                id="password" label="Contraseña" name="password" variant="outlined" type="password"
                                onChange={e => setDetails({ ...details, pass: e.target.value })} value={details.pass} />
                        </Grid>
                        {(loading) ? (
                            <Box sx={{ display: 'flex', my:1 }}>
                                <CircularProgress />
                            </Box>) : ""}
                        <Grid item>
                            <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ bgcolor:"#e53935", mt: 3, mb: 1, '&:hover': {backgroundColor: '#e53935', }}}>Iniciar sesion</Button>
                        </Grid>
                    </Box>
                </Grid>
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

export default InicioSesion;