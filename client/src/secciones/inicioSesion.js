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


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
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

        if (details.user === "" || details.password === "") {
            setError("Rellene todos los campos");
            setOpen(true);
        } else if (specialChars.test(details.user) || specialChars.test(details.password)) {
            setError("No se permiten caracteres especiales");
            setOpen(true);
        } else {
            setLoading(true);


            Axios.post("/login/user", { username: details.user, pass: details.password })
                .then((response) => {
                    if (!response.data) {
                        setError("Datos incorrectos");
                        setOpen(true);
                    } else {
                        setLog(true);
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

    return (
        <Box sx={{
            border: 0.5, borderColor: "#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
            mt: 1, justifyContent: "center", flexDirection: 'column'
        }}>
            <ThemeProvider theme={darkTheme}>
                <Grid container direction="column" spacing={0} justifyContent="center" alignItems="center" sx={{ my: { xs: 0, sm: 2 } }}>
                    <Collapse in={open}>
                        <MuiAlert severity="error"
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
                        </MuiAlert>
                    </Collapse>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid item>
                            <TextField sx={{
                                border: 0.5, borderColor: "#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
                                mt: 1, justifyContent: "center", flexDirection: 'column'
                            }}
                                id="user" label="Usuario" name="user" variant="outlined"
                                onChange={e => setDetails({ ...details, user: e.target.value })} value={details.user} />
                        </Grid>
                        <Grid item>
                            <TextField sx={{
                                border: 0.5, borderColor: "#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
                                mt: 1, justifyContent: "center", flexDirection: 'column'
                            }}
                                id="password" label="Contraseña" name="password" variant="outlined" type="password"
                                onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        </Grid>
                        <Grid sx={{
                            border: 0.5, borderColor: "#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
                            mt: 1, justifyContent: "center", flexDirection: 'column'
                        }} item>
                            <Button variant="contained">Iniciar sesion</Button>
                        </Grid>
                    </Box>
                </Grid>
            </ThemeProvider>
        </Box>
    );
}

export default InicioSesion;