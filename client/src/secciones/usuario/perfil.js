import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { alpha, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { Checkbox, FormControlLabel, MenuItem } from '@mui/material';
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

const Perfil = ({ msg, completed }) => {
    const [fullName, setName] = useState("");
    const [date, setDate] = React.useState(dayjs());
    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        Axios.get('/login').then((response) => {
            setLogged(response.data);
            setUsuario(response.data);
            if (msg) {
                setOpenSnackbar(true);
                completed();
            }

            if(response.data){
                Axios.get('/users/one').then((response) => {
                    setUsuario(response.data);
                    setName(response.data.nombre+" "+response.data.apellidos);
                    setDate(dayjs(new Date(response.data.fechaNac) - 1))
                    setLoading(false);
                });
            }else{
                setLoading(false);
            }
        });
    }, []);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar(false);
    };

    const [openSnackbar2, setOpenSnackbar2] = React.useState(false);
    const handleCloseSnackbar2 = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpenSnackbar2(false);
    };

    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        var dateS = new Date(dayjs(date).toDate());
        dateS.setDate(dateS.getDate() + 1);
        let fecha = dateS.getFullYear() + "-" + (dateS.getMonth() + 1) + "-" + dateS.getDate();

        if (usuario.nombre === "" || usuario.apellidos === "" || usuario.dni === "" || usuario.username === "" || usuario.pass === "") {
            setError("Rellene todos los campos");
            setOpen(true);
        } else if (specialChars.test(usuario.pass)) {
            setError("No se permiten caracteres especiales");
            setOpen(true);
        }else{
            setLoading(true);
            Axios.put("/users/"+usuario._id, {nombre:usuario.nombre, apellidos: usuario.apellidos, pass: usuario.pass, fecha: fecha, sexo: usuario.sexo})
                .then((response) => {
                    if (!response.data) {
                        setError("Error al actualizar los cambios");
                        setOpen(true);
                    } else {
                        setOpenSnackbar2(true);
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
                        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" sx={{ display: 'grid' }}>
                            <Typography align="center" display="inline">
                                <Box sx={{ mt: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Editar {fullName}
                                </Box>
                            </Typography>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <CustomTextField margin="normal" required fullWidth name="name" label="Nombre" type="text"
                                    sx={{ input: { color: 'white' } }} id="name"
                                    onChange={e => setUsuario({ ...usuario, nombre: e.target.value })} value={usuario.nombre}
                                />
                            </Box>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <CustomTextField margin="normal" required fullWidth name="surname" label="Apellidos" type="text"
                                    sx={{ input: { color: 'white' } }} id="surname"
                                    onChange={e => setUsuario({ ...usuario, apellidos: e.target.value })} value={usuario.apellidos}
                                />
                            </Box>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <FormControl margin="normal" required fullWidth name="fechaNac" label="Fecha de nacimiento"
                                    sx={{ input: { color: 'white' } }} id="fechaNac">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Fecha de nacimiento"
                                            inputFormat="DD/MM/YYYY"
                                            value={date}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Box>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <CustomTextField margin="normal" disabled fullWidth name="dni" label="DNI" type="text"
                                    sx={{ input: { color: 'white' } }} id="dni"
                                    onChange={e => setUsuario({ ...usuario, dni: e.target.value })} value={usuario.dni}
                                />
                            </Box>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <CustomTextField margin="normal" disabled fullWidth name="username" label="Nombre de usuario" type="text"
                                    sx={{ input: { color: 'white' } }} id="username"
                                    onChange={e => setUsuario({ ...usuario, username: e.target.value })} value={usuario.username}
                                />
                            </Box>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <CustomTextField margin="normal" required fullWidth name="password" label="Contraseña" type="text"
                                    sx={{ input: { color: 'white' } }} id="password"
                                    onChange={e => setUsuario({ ...usuario, pass: e.target.value })} value={usuario.pass}
                                />
                            </Box>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <FormControl fullWidth margin="normal" required name="sexo" label="Sexo" type="text"
                                    sx={{ input: { color: 'white' } }} id="sexoFC">
                                    <InputLabel id="sexoIL">Sexo</InputLabel>
                                    <Select
                                        sx={{color: "white",'.MuiOutlinedInput-notchedOutline': {borderColor: 'white',},'&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'red',},}}
                                        labelId="sexoIL"
                                        id="sexo"
                                        value={usuario.sexo}
                                        label="Sexo"
                                        onChange={e => setUsuario({ ...usuario, sexo: e.target.value })}>
                                        <MenuItem value={"Hombre"}>Hombre</MenuItem>
                                        <MenuItem value={"Mujer"}>Mujer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                                <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ bgcolor: "#FFFFFF", mt: 3, mb: 1, '&:hover': { backgroundColor: "red", } }}>
                                    Realizar cambios
                                </Button>
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
                                sx={{mb: 3, m: 0.5, mr: 3}}
                                >
                                <AlertTitle>No se ha podido enviar la consulta</AlertTitle>
                                <strong>{error}</strong>
                                </Alert>
                            </Collapse>
                        </Grid>
                    ) : ""}
                </Paper>
            </Grid >
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Inicio de sesión correcto
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackbar2} autoHideDuration={3000} onClose={handleCloseSnackbar2}>
                <Alert onClose={handleCloseSnackbar2} severity="success" sx={{ width: '100%' }}>
                    Usuario actualizado correctamente
                </Alert>
            </Snackbar>
        </ThemeProvider >
    );
}

export default Perfil;