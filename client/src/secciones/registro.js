import {condLegales} from '../data.js';
import {backend} from '../config/variables'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import React, {useState, useRef} from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';
import {alpha,styled} from '@mui/material/styles';
import { red} from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import Axios from 'axios';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const ToggleButton = styled(MuiToggleButton)({
    color: "white",
    borderColor: 'white',
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: 'blue'
    }
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

const Button2 = styled(Button)({
    fontWeight: 'bold',
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black'
    },
    fontFamily: [
        'BlinkMacSystemFont',
    ].join(','),
});

const RedSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-track': {
        backgroundColor:'white'
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: red[600],
        '&:hover': {
        backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: red[600],
    },
}));

const MobileSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 1.5,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: red[600],
        '& + .MuiSwitch-track': {
          backgroundColor: red[600],
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 16,
      height: 16,
    },
    '& .MuiSwitch-track': {
      borderRadius: 20 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

function Registro() {
    const [logged, setLog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    /*const onLogOut = () => {
        setLog(false);
        navigate('/', {replace: true});
    }*/

    const [details, setDetails] = useState({usuario:"", pass:"", nombre:"", apellidos:"", dni:"", sexo:"Hombre"});
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    // Politica y privacidad
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {setOpenDialog(true);};
    const handleCloseDialog = (status) => {
        setOpenDialog(false);
        if(status) setChecked(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        var dateS = new Date(dayjs(date).toDate());
        dateS.setDate(dateS.getDate() + 1);
        let fecha = dateS.getFullYear() + "-" + (dateS.getMonth() + 1) + "-" + dateS.getDate();

        if(!checked){
            setError("Debe aceptar la política de privacidad");
            setOpen(true);
        }else if(details.usuario==="" || details.pass==="" || details.dni ==="" || details.apellidos==="" || details.nombre===""){
            setError("Rellene todos los campos");
            setOpen(true);
        }else if(specialChars.test(details.usuario) || specialChars.test(details.pass)){
            setError("No se permiten caracteres especiales");
            setOpen(true);
        }else if(!validateDNI(details.dni)){
            setError("DNI no válido");
            setOpen(true);
        }else{
            setLoading(true);

            Axios.post("/register", {usuario:details.usuario, contrasena:details.pass,
                 nombre: details.nombre, apellidos:details.apellidos,dni:details.dni, fecha:fecha,sexo:details.sexo})
            .then((response) => {
                if(!response.data){
                    setError("Registro inválido: el DNI y el username deben ser únicos");
                    setOpen(true);
                }else{
                    setOpenSnackbar(true);
                    setLog(true);
                }
                setLoading(false);
            }).catch((error) => {
                if(error.response){
                    setError("Error al intentar conectar con la base de datos");
                    setOpen(true);
                }
                setLoading(false);
            });
        }
       };

    const handleCancel = () => {
    
    }

    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    
    const [showPassword, setShowPass] = useState(false);
    function handlePassVisibleChange(e) {
    const value = e.target.checked;
        if(value){
            setShowPass(true);
        } else {
            setShowPass(false);
        }
    }

    const [date, setDate] = React.useState(dayjs());
    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const extractFecha = (date) => {
        let dia;
        if(date.slice(8,9)==='0'){
            dia = date.slice(9,10);
        }else{
            dia = date.slice(8,10);
        }
        let fecha = dia + ' de '  + getMes(date.slice(5,7)) + ', ' + date.slice(0,4);
        return fecha;
    }

    const getMes = (mes) => {
        switch (mes){
            case '01': return "Enero";
            case '02': return "Febrero";
            case '03': return "Marzo";
            case '04': return "Abril";
            case '05': return "Mayo";
            case '06': return "Junio";
            case '07': return "Julio";
            case '08': return "Agosto";
            case '09': return "Septiembre";
            case '10': return "Octubre";
            case '11': return "Noviembre";
            case '12': return "Diciembre";
            default : return "";
        }
    }

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenSnackbar(false);
    };

    function validateDNI(dni) {
        var numero, lett, letra;
        var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;
    
        dni = dni.toUpperCase();
    
        if(expresion_regular_dni.test(dni) === true){
            numero = dni.substr(0,dni.length-1);
            numero = numero.replace('X', 0);
            numero = numero.replace('Y', 1);
            numero = numero.replace('Z', 2);
            lett = dni.substr(dni.length-1, 1);
            numero = numero % 23;
            letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letra = letra.substring(numero, numero+1);
            if (letra != lett) {
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3}}>
                <Typography align="center" display="inline"><Box sx={{ mt:2, fontSize:20, fontWeight: 'bold', color:'white'}}>REGISTRO</Box></Typography>

                <Paper elevation={12} sx={{ backgroundColor: "ffffff", color:"darkred", width: { xs: "85%", md:"60%" }, margin:1, 
                padding:1, my: 0.5, border: "1px solid black", boxShadow: "3px 3px 3px black" }}>
                    <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
                    <Box component="form" sx={{ m: 0.5, mr: 3 }}>
                        <CustomTextField margin="normal" required fullWidth name="name" label="Nombre" type="text"
                        sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} id="name"
                        onChange={e => setDetails({...details, nombre: e.target.value})} value={details.nombre} 
                        />
                        <CustomTextField margin="normal" required fullWidth name="apellidos" label="Apellidos" type="text"
                        sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} id="apellidos"
                        onChange={e => setDetails({...details, apellidos: e.target.value})} value={details.apellidos} 
                        />
                        <CustomTextField margin="normal" required fullWidth name="dni" label="DNI" type="text"
                        sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} id="dni"
                        onChange={e => setDetails({...details, dni: e.target.value})} value={details.dni} 
                        />
                        <CustomTextField margin="normal" required fullWidth name="usuario" label="Usuario" type="text"
                        sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} id="user"
                        onChange={e => setDetails({...details, usuario: e.target.value})} value={details.usuario} 
                        />
                        <CustomTextField margin="normal" required fullWidth name="pass" label="Contraseña"  type={showPassword ? "text" : "password"}
                        sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} id="pass"
                        onChange={e => setDetails({...details, pass: e.target.value})} value={details.pass} 
                        />
                        <FormControlLabel sx={{color:'red'}}
                        control={<Checkbox color="primary" style ={{color: "#ffffff",}} onChange={(e) => handlePassVisibleChange(e)} />}
                        label="Mostrar contraseña"
                        />
                        <br/><br/>
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
                        <br/><br/>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={details.sexo}
                                label="Sexo"
                                onChange={e => setDetails({ ...details, sexo: e.target.value })}
                            >
                                <MenuItem value={"Hombre"}>Hombre</MenuItem>
                                <MenuItem value={"Mujer"}>Mujer</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <Grid container direction="row" alignItems="center" justifyContent="left">
                            <Typography sx={{fontSize:{xs:10, sm:""}, color:"red"}}>He leido y acepto la<Button sx={{fontSize:{xs:10, sm:""}, color:"red"}} onClick={() => handleOpenDialog()}>
                            Política de Privacidad</Button></Typography> 
                            <Box sx={{ display: { xs: 'block', sm: 'none' }}}>
                            <MobileSwitch size="small" checked={checked} onChange={handleChange} color="primary" />
                            </Box>
                            <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
                            <RedSwitch checked={checked} onChange={handleChange} color="primary" />
                            </Box>
                        </Grid>
                        <Box sx={{ fontStyle: 'italic' , color:"red"}}>(*): estos campos son obligatorios</Box>
                        <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ bgcolor:"#e53935", mt: 3, mb: 1, '&:hover': {backgroundColor: '#e53935', }}}>
                            Registrarse
                        </Button>
                    </Box>
                    {(loading) ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>) : ""}
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
                        sx={{mb: 3 }}
                        >
                        <AlertTitle>No se ha podido enviar la consulta</AlertTitle>
                        <strong>{error}</strong>
                        </Alert>
                    </Collapse>
                    </Grid>
                </Paper>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Registro correcto
                </Alert>
            </Snackbar>
            

            <Box sx={{position: "absolute", bottom: 20, right: 20}}>
                <Dialog maxWidth="sm" fullWidth={true} open={openDialog} onClose={() => handleCloseDialog(false)} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title"><strong>CONDICIONES LEGALES</strong></DialogTitle>
                    <DialogContent>
                        <Typography paragraph variant="subtitle2">
                            {condLegales}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseDialog(true)} color="primary"> Aceptar </Button>
                        <Button onClick={() => handleCloseDialog(false)} color="primary"> Cerrar </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}

export default Registro;