import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TheatersIcon from '@mui/icons-material/Theaters';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import MovieIcon from '@mui/icons-material/Movie';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {DialogActions, DialogContent} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';

import AdminHeadbar from './adminHeadbar';
import NoticiasAdmin from './secciones/noticiasAdmin';
import EventosAdmin from './secciones/eventosAdmin';

import Axios from 'axios';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import {useNavigate} from 'react-router-dom';


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
        borderColor: 'blue',
      },
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

function Admin() {
    const [logged, setLog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const onLogOut = () => {
        setLog(false);
        navigate('/', {replace: true});
    }

    const [details, setDetails] = useState({user:"",password:""});
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
        if(details.user==="" || details.password===""){
            setError("Rellene todos los campos");
            setOpen(true);
        }else if(specialChars.test(details.user) || specialChars.test(details.password)){
            setError("No se permiten caracteres especiales");
            setOpen(true);
        }else{
            setLoading(true);

            Axios.post('http://localhost:3001/api/login', {username:details.user, pass:details.password})
            .then((response) => {
                if(!response.data){
                    setError("Datos incorrectos");
                    setOpen(true);
                }else{
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
    
      const [showPassword, setShowPass] = useState(false);
      function handlePassVisibleChange(e) {
        const value = e.target.checked;
        if(value){
          setShowPass(true);
        }else{
          setShowPass(false);
        }
      }

        const [cat, setCat] = React.useState();
        const handleChange = (event, newAlignment) => {
            setCat(newAlignment);
            if(newAlignment==="Noticias"){navigate('/admin/noticias', {replace: true});}
            if(newAlignment==="Eventos"){navigate('/admin/eventos', {replace: true});}
        };

    return (
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', backgroundColor:'#121212'}}>
            {(logged) ? (
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                    <Grid item>
                    <AdminHeadbar onLogOut={onLogOut} />
                    </Grid>
                    <Grid item sx={{my:2}}>
                    <ToggleButtonGroup sx={{mb:1,mt:8}} color="primary" value={cat} exclusive onChange={handleChange} >
                        <ToggleButton size="small" value="Noticias">Noticias</ToggleButton>
                        <ToggleButton size="small" value="Eventos">Eventos</ToggleButton>
                    </ToggleButtonGroup>
                    </Grid>
                    <Grid item>
                    <Routes>
                        <Route path="/noticias" element={<NoticiasAdmin />} />
                        <Route path="/eventos" element={<EventosAdmin />} />
                    </Routes>
                    </Grid>
                </Grid>
            ) : (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh'}}>
                <Avatar variant="rounded" sx={{ m: 1, width: 110, height: 130 }} src="/images/escudo.png" />
                <Typography component="h1" variant="h5">
                Iniciar sesión
                </Typography>
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
                    sx={{ mb: 2 }}
                    >
                    <AlertTitle>Inicio de sesión incorrecto</AlertTitle>
                    <strong>{error}</strong>
                    </MuiAlert>
                </Collapse>

                {(loading) ? (
                <Box sx={{ display: 'flex', my:1 }}>
                    <CircularProgress />
                </Box>) : ""}
            
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <CustomTextField margin="normal" required fullWidth id="user" label="Usuario" name="user" autoComplete="user"  InputLabelProps={{sx:{ color: 'white' }}} 
                        onChange={e => setDetails({...details, user: e.target.value})} value={details.user}  autoFocus variant="outlined"
                    />
                    <CustomTextField
                        margin="normal" required fullWidth name="password" label="Contraseña" type={showPassword ? "text" : "password"}
                        id="password" autoComplete="current-password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} InputLabelProps={{sx:{ color: 'white' }}} 
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" style ={{color: "#ffffff",}} onChange={(e) => handlePassVisibleChange(e)} />}
                        label="Mostrar contraseña"
                    />
                    <Button2 fullWidth type="submit" variant="contained" sx={{mt: 3, mb: 1 }}>
                        Iniciar Sesión
                    </Button2>
                    <Button2 fullWidth onClick={() => onLogOut()} variant="contained" sx={{ mt: 1, mb: 2, backgroundColor:'green' }}>
                        Volver
                    </Button2>
                </Box>
            </Grid>
            )}
            
        </Box>
        </ThemeProvider>
    );
}

export default Admin