import React, {useState, useRef} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {alpha,styled} from '@mui/material/styles';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import { red} from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogActions, DialogContent} from '@mui/material';
import {condLegales} from '../../data.js';
import emailjs from '@emailjs/browser';

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

const Contacto = ({pageChange}) => {
    const handleLocationClick = () => {
        window.open("https://goo.gl/maps/Bwou32hWBzDq7ib9A", '_blank', 'noopener,noreferrer');
    };

    const [details, setDetails] = useState({nombre:"",correo:"",consulta:""});

    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {setOpenDialog(true);};
    const handleCloseDialog = (status) => {
        setOpenDialog(false);
        if(status) setChecked(true);
    };

    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpenError(false);

        if(details.nombre==="" || details.correo==="" || details.consulta===""){
            setError("Debe rellenar todos los campos");
            setOpenError(true);
        }else if(!validateEmail(details.correo)){
            setError("Correo electrónico inválido");
            setOpenError(true);
        }else if(details.consulta.length>1000){
            setError("La consulta no puede superar los 1000 caracteres");
            setOpenError(true);
        }else if(!checked){
            setError("Debe aceptar la política de privacidad");
            setOpenError(true);
        }else if(emailSent){
            setAlertStatus(false);
            setOpenAlert(true);
        }else{
            setLoading(true);
            sendEmail();
        }
    };

    const sendEmail = () => {
        emailjs.send('gmail', 'template_prowsw9', details, 'oFb4x6CDmB1dwKhV_')
          .then((result) => {
              console.log(result.text);
              setAlertStatus(true);
              setEmailSent(true);
              setOpenAlert(true);
              setLoading(false);
          }, (error) => {
              console.log(error.text);
              setAlertStatus(false);
              setOpenAlert(true);
              setLoading(false);
          });
      };

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertStatus, setAlertStatus] = React.useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenAlert(false);
    };


    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{width:"100%", maxHeight: 3, mb:2}}><Grid container spacing={0} direction="row">
                <Typography component="h2" variant="body2" >
                <Link color="#4a4948" href="#" onClick={() => pageChange("inicio")} underline="none">
                    Inicio / 
                </Link>
                </Typography>
                <Typography component="h2" variant="body2" sx={{ml:0.5}}>Atención a la ciudadania</Typography>
            </Grid></Box>

            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3, mt:1.5}}>
                <Typography align="center" display="inline"><Box sx={{ mt:2, fontSize:20, fontWeight: 'bold'}}>INFORMACIÓN DE CONTACTO</Box></Typography>
                <Divider sx={{ width:'40%', bgcolor: "#424242", my:0.5 }} variant="middle"/>
                <Typography display="inline" align="center" sx={{ml:2}}>Puede dirigirse al ayuntamiento mediante los siguientes métodos de contacto:</Typography>
                <Paper elevation={12} sx={{ backgroundColor: "#ffffff", color:"darkred", width: { xs: "85%", md:"60%" }, margin:1, 
                padding:1, my: 0.5, border: "1px solid black", boxShadow: "3px 3px 3px black" }}>
                    <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" sx={{mr:1}}>Dirección</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Box sx={{ display: { xs: 'block', md: 'none' }}}>
                            <Chip onClick={handleLocationClick} icon={<PlaceIcon />} 
                            label="Plaza Mayor, 1. Carrocera" variant="outlined" />
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'block' }}}>
                            <Chip onClick={handleLocationClick} icon={<PlaceIcon />} 
                            label="Plaza Mayor, 1. Carrocera - León (España). C.P.: 24123" variant="outlined" />
                            </Box>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{my:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" sx={{mr:1}}>Teléfono</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip icon={<PhoneIcon />} label="987 592 071" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="center" sx={{mb:1}}>
                            <Grid item xs={0.5}></Grid>
                            <Grid item xs={3.5} align="left">
                            <Typography display="inline" >Correo electrónico</Typography>
                            </Grid>
                            <Grid item xs={8} align="left">
                            <Chip icon={<EmailIcon />} label="info@aytocarrocera.es" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3}}>
                <Typography display="inline"><Box sx={{ color:"#e53935", mt:2, fontSize:20, fontWeight: 'bold'}}>CONSULTA DIRECTA</Box></Typography>
                <Divider sx={{ width:'40%', bgcolor: "#424242", my:0.5 }} variant="middle"/>
                <Typography display="inline" align="center" sx={{width: { xs: "85%", md:"60%" }}}>Para cualquier consulta puede ponerse en contacto mediante el siguiente formulario indicándonos una dirección de correo electrónico a la que poder responderle.</Typography>
                <Paper elevation={12} sx={{ backgroundColor: "black", color:"white", width: { xs: "85%", md:"60%" }, margin:1, 
                padding:1, my: 0.5, border: "1px solid #e53935", boxShadow: "3px 3px 3px #e53935" }}>
                    <Grid container direction="column" spacing={1} margin={0.5} justifyContent="center" alignItems="center">
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 0.5, mr: 3 }}>
                        <CustomTextField margin="normal" required fullWidth id="email" label="Correo Electrónico" name="email" 
                        autoComplete="email"  sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} 
                        onChange={e => setDetails({...details, correo: e.target.value})} value={details.correo} variant="outlined"
                        />
                        <CustomTextField margin="normal" required fullWidth name="name" label="Nombre y Apellidos" type="text"
                        sx={{input:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} id="name"
                        onChange={e => setDetails({...details, nombre: e.target.value})} value={details.nombre} 
                        />
                        <CustomTextField margin="normal" required fullWidth name="consulta" label="Consulta" type="text" 
                        multiline rows={6} sx={{textarea:{color:'white'}}} InputLabelProps={{sx:{color:'white'}}} id="consulta" 
                        onChange={e => setDetails({...details, consulta: e.target.value})} value={details.consulta} 
                        />
                        <Grid container direction="row" alignItems="center" justifyContent="left">
                            <Typography sx={{fontSize:{xs:10, sm:""}}}>He leido y acepto la<Button sx={{fontSize:{xs:10, sm:""}, color:"red"}} onClick={() => handleOpenDialog()}>
                            Política de Privacidad</Button></Typography> 
                            <Box sx={{ display: { xs: 'block', sm: 'none' }}}>
                            <MobileSwitch size="small" checked={checked} onChange={handleChange} color="primary" />
                            </Box>
                            <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
                            <RedSwitch checked={checked} onChange={handleChange} color="primary" />
                            </Box>
                        </Grid>
                        <Box sx={{ fontStyle: 'italic' }}>(*): estos campos son obligatorios</Box>
                        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor:"#e53935", mt: 3, mb: 1, '&:hover': {backgroundColor: '#e53935', }}}>
                            Enviar consulta
                        </Button>
                    </Box>
                    <Collapse in={openError}>
                        <MuiAlert severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenError(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ width: { xs: "80%", md:"100%" }, mb: 3 }}
                        >
                        <AlertTitle>No se ha podido enviar la consulta</AlertTitle>
                        <strong>{error}</strong>
                        </MuiAlert>
                    </Collapse>
                    {(loading) ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>) : ""}
                    </Grid>
                </Paper>
            </Grid>

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertStatus ? "success" : (emailSent ? "warning" : "error")} sx={{ width: '100%' }}>
                    {alertStatus ? "Consulta enviada correctamente" : (emailSent ? "Ya ha enviado una consulta en esta sesión, vuelva a intentarlo más tarde" : 
                    "Error: fallo al enviar. Consulte con el ayuntamiento por las otras vías disponibles")}
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
        </Box>
    );
}

export default Contacto;