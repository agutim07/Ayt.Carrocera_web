import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useNavigate} from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { orange,green } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

import BungalowIcon from '@mui/icons-material/Bungalow';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Divider from '@mui/material/Divider';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

import { pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import EventosCard from './eventosCard';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import UsuariosCard from './usuariosCard';

import CircularProgress from '@mui/material/CircularProgress';
import Axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Button2 = styled(Button)({
    backgroundColor: '#e53935',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    fontFamily: [
        'BlinkMacSystemFont',
    ].join(','),
});

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertText, setAlertText] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getUsuarios();
    }, []);

    function getUsuarios(){
        Axios.get('/users').then((response) => {
          setUsuarios(response.data);
          setLoading(false);
        });
    }

    function onChange(tipo){
        setUsuarios([]);
        if(tipo==="editar"){ setLoading(true); setAlertText("Usuario editado correctamente");}
        if(tipo==="borrar"){ setLoading(true); setAlertText("Usuario borrado correctamente");}

        delay(1000).then( () => {
            Axios.get('/users').then((response) => {
                setUsuarios(response.data);
                setLoading(false);
                setOpenSnackbar(true);
        });
        })
    }

    function delay(time) { return new Promise(resolve => setTimeout(resolve, time));}

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenSnackbar(false);
    };

    return(
        <Box sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
        <Grid container rowSpacing={2} columnSpacing={2} padding={1} direction="row" sx={{mt:1, mb:2}} alignItems="center">
        {(loading) ? (
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" sx={{my:1}}>
            <CircularProgress />
        </Grid>) : ""}
        
        {usuarios.map((card) => (
            <Grid item key={card.id} xs={12} sm={6}>
                <UsuariosCard onChange={onChange} card={card} />
            </Grid>
        ))}
        </Grid>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {alertText}
            </Alert>
        </Snackbar>

        </Box>
    );
}

export default UsuariosAdmin;