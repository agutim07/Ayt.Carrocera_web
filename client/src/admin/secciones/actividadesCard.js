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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import BungalowIcon from '@mui/icons-material/Bungalow';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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

const ActividadesCard = ({onChange, card}) => {
    const [details, setDetails] = useState({price:card.price, exclusive:card.exclusive, open1:parseInt(card.open.substring(0,2)), open2:parseInt(card.open.substring(3,5)), close1:parseInt(card.close.substring(0,2)), close2:parseInt(card.close.substring(3,5)), habilitada:card.habilitada});

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        details.price=card.price; details.exclusive=card.exclusive; details.open1=parseInt(card.open.substring(0,2)); details.open2=parseInt(card.open.substring(3,5)); details.close1=parseInt(card.close.substring(0,2)); details.close2=parseInt(card.close.substring(3,5)); details.habilitada=card.habilitada;
        setOpen(false);
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState("");

    const changeTime = (tipo,value) => {
        switch(tipo){
            case 1:
                if(value>24 || value<0 || (value==24 && details.open2!=0)){
                    break; 
                }else{
                    setDetails({ ...details, open1: value });
                }
                break; 

            case 2:
                if(value>59 || value<0 || (value>0 && details.open1==24)){
                    break; 
                }else{
                    setDetails({ ...details, open2: value });
                }
                break; 

            case 3:
                if(value>24 || value<0 || (value==24 && details.close2!=0)){
                    break; 
                }else{
                    setDetails({ ...details, close1: value });
                }
                break; 

            case 4:
                if(value>59 || value<0 || (value>0 && details.close1==24)){
                    break; 
                }else{
                    setDetails({ ...details, close2: value });
                }   
                break; 

            default:
                break;             
        }
    }

    function getDate(l1,l2){
        let out = "";

        if(l1<10){out+=0;}
        out+=l1+":";

        if(l2<10){out+=0;}
        out+=l2;

        return out;
    }

    const handleSubmit = () => {
        if (details.price === "" || details.open1 === "" || details.open2 === "" || details.close1 === "" || details.close2 === "") {
            setError("No puede dejar ningún campo vacio");
            setOpenAlert(true); 
            details.price=card.price; details.exclusive=card.exclusive; details.open1=parseInt(card.open.substring(0,2)); details.open2=parseInt(card.open.substring(3,5)); details.close1=parseInt(card.close.substring(0,2)); details.close2=parseInt(card.close.substring(3,5)); details.habilitada=card.habilitada;
            setOpen(false);
        }else if(details.price<0){
            setError("El precio debe ser mayor o igual a 0");
            setOpenAlert(true); 
            details.price=card.price; details.exclusive=card.exclusive; details.open1=parseInt(card.open.substring(0,2)); details.open2=parseInt(card.open.substring(3,5)); details.close1=parseInt(card.close.substring(0,2)); details.close2=parseInt(card.close.substring(3,5)); details.habilitada=card.habilitada;
            setOpen(false);
        }else{
            setOpen(false);
            Axios.put("/activities/"+card._id, 
            {price:details.price, exclusive:details.exclusive, open:getDate(details.open1,details.open2), close:getDate(details.close1,details.close2), habilitada:details.habilitada})
            .then((response) => {
                if(!response.data){
                    setError("No se ha podido modificar la actividad");
                    details.price=card.price; details.exclusive=card.exclusive; details.open1=parseInt(card.open.substring(0,2)); details.open2=parseInt(card.open.substring(3,5)); details.close1=parseInt(card.close.substring(0,2)); details.close2=parseInt(card.close.substring(3,5)); details.habilitada=card.habilitada;
                    setOpenAlert(true);
                }else{
                    onChange("editar");
                }
            });
        }
        
    }

    return(
        <div>
            <Card elevation={12} sx={{minWidth:500}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: orange[500] }} variant="rounded">
                            <LocationOnIcon />
                        </Avatar>
                    }
                    subheader={card.addr+", "+card.loc}
                />
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                    {card.name}
                    </Typography>
                    <Grid container direction="row">
                        <Chip icon={<AccessTimeIcon />} sx={{mr:0.5}} label={"Desde "+card.open} />
                        <Chip icon={<AccessTimeIcon />} sx={{ml:0.5}} label={"Hasta "+card.close} />
                    </Grid>
                    {(!card.habilitada) ? (
                    <Chip sx={{backgroundColor:'#f44336', mt:1}} label="Actividad deshabilitada" />
                    ) : ""}
                </CardContent>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CardActions>
                        <Button variant="contained" onClick={handleClickOpen} startIcon={<EditIcon />}>Editar</Button>
                    </CardActions>
                </div>
            </Card>

            <Box sx={{position: "absolute", bottom: 20, right: 20}} >
                <Dialog fullWidth="300px" sx={{width:"50"}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Editar Contenido</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                        <br></br>
                        <TextField defaultValue={card.price} autoFocusmargin="dense" id="precio" label="Precio/hora (€)" type="number" fullWidth onChange={e => setDetails({ ...details, price: e.target.value })}/>
                        <br></br>
                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <Typography sx={{mr:1}}>Apertura</Typography>
                            <TextField value={details.open1} id="apertura1" size="small" type="number" sx={{width:'15%'}} onChange={e => changeTime(1, e.target.value)}/>
                            <Typography sx={{mx:0.5}}>:</Typography>
                            <TextField value={details.open2} id="apertura2" size="small" type="number" sx={{width:'15%'}} onChange={e => changeTime(2, e.target.value)}/>
                        </Grid>
                        <br></br>
                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <Typography sx={{mr:1}}>Cierre</Typography>
                            <TextField value={details.close1} id="cierre1" size="small" type="number" sx={{width:'15%'}} onChange={e => changeTime(3, e.target.value)}/>
                            <Typography sx={{mx:0.5}}>:</Typography>
                            <TextField value={details.close2} id="cierre2" size="small" type="number" sx={{width:'15%'}} onChange={e => changeTime(4, e.target.value)}/>
                        </Grid>
                        <br></br>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={details.exclusive} onChange={e => setDetails({ ...details, exclusive: !details.exclusive })}/>} label="Exclusiva a empadronados" />
                        </FormGroup>
                        <br></br>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={details.habilitada} onChange={e => setDetails({ ...details, habilitada: !details.habilitada })}/>} label="Actividad habilitada" />
                        </FormGroup>
                        <br></br>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit}> Editar </Button>
                        <Button onClick={handleClose}> Cancelar </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box sx={{ position: "absolute", bottom: "50%", right: "35%" }}>
            <Collapse in={openAlert}>
                <Alert severity="warning" variant="filled"
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenAlert(false) }} >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                <AlertTitle>No se ha podido editar el contenido</AlertTitle>
                <strong>{error}</strong>
                </Alert>
            </Collapse>
            </Box>
        </div>
    );
}

export default ActividadesCard;