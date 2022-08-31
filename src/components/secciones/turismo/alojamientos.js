import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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

import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alojamientos = () => {
    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonProps = {
        size: mobileScreen ? "normal" : "large",
    };
    const buttonProps2 = {
        orientation: mobileScreen ? "vertical" : "horizontal",
    };

    const items = [
        {id:0, title: 'El Nido Azul', tipo: 'Casa Rural', loc: 'Benllera', telf: '622617021', web: 'https://www.elnidoazul.com/'},
        {id:1, title: 'Entre Valles', tipo: 'Casa Rural', loc: 'Benllera', telf: '639546562', web: 'https://entrevalles.info/'},
        {id:2, title: 'La Oca', tipo: 'Casa Rural', loc: 'Carrocera', telf: '609221179', web: ''},
        {id:3, title: 'Encuevas', tipo: 'Casa Rural', loc: 'Cuevas', telf: '626721040', web: 'http://www.encuevas.com/'},
        {id:4, title: 'Santa Lucia', tipo: 'Hotel', loc: 'Otero', telf: '630079737', web: 'http://www.hotelsantalucia.es/'},
        {id:5, title: 'El Crucero', tipo: 'Hostal', loc: 'Otero', telf: '987581024', web: ''},
        {id:6, title: 'Los Calderones', tipo: 'Casa Rural', loc: 'Piedrasecha', telf: '666334078', web: 'http://www.loscalderones.com/'},
        {id:7, title: 'La Parra', tipo: 'Casa Rural', loc: 'Piedrasecha', telf: '646218776', web: ''},
        {id:8, title: 'Castillo de Piedrasecha', tipo: 'Hotel', loc: 'Piedrasecha', telf: '630079737', web: 'http://www.hotelsantalucia.es/castillo-piedrasecha/'}
    ]

    const [alj, setAlj] = React.useState(items);

    const [pueblo, setPueblo] = React.useState("Municipio");
    const handleChange = (event, newAlignment) => {
        setPueblo(newAlignment);
        if(newAlignment==="Municipio"){
            setAlj(items);
        }else{
            setAlj(items.filter((item) => item.loc === newAlignment));
        }
    };

    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenAlert(false);
    };
    const handleClick = (phone) => {
        navigator.clipboard.writeText(phone);
        setOpenAlert(true);
    };

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Grid container direction="column"justifyContent="center" alignItems="center" sx={{mt:1}}>
            <ToggleButtonGroup {...buttonProps2} sx={{mb:2}} color="primary" value={pueblo} exclusive onChange={handleChange} >
                <ToggleButton size="small" sx={{fontWeight:'bold'}} value="Municipio">Municipio</ToggleButton>
                <ToggleButton size="small" value="Benllera">Benllera</ToggleButton>
                <ToggleButton size="small" value="Carrocera">Carrocera</ToggleButton>
                <ToggleButton size="small" value="Cuevas">Cuevas de Viñayo</ToggleButton>
                <ToggleButton size="small" value="Otero">Otero de las Dueñas</ToggleButton>
                <ToggleButton size="small" value="Piedrasecha">Piedrasecha</ToggleButton>
            </ToggleButtonGroup>
            <Grid container rowSpacing={2} columnSpacing={2} padding={1} direction="row" alignItems="center">
            {alj.map((card) => (
                <Grid item key={card.id} xs={6}>
                    <Card sx={{ display: 'flex', border:1, borderColor: 'black', borderRadius: '9px' }}> 
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>  
                        <Typography gutterBottom variant="h5" sx={{fontWeight:'bold'}} component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <Chip icon={<BungalowIcon />} sx={{mr:{xs:0, sm:1}, mb:{xs:1, sm:0}}} {...buttonProps} label={card.tipo} variant="outlined" />
                            <Chip icon={<LocationCityIcon />} sx={{mr:{xs:0, sm:1}, mb:{xs:1, sm:0}}} {...buttonProps} label={card.loc} variant="outlined"/>
                            <Chip icon={<PhoneIcon />} onClick={() => handleClick(card.telf)} {...buttonProps} label={card.telf} variant="outlined" />
                            {(card.web !== '') ? (
                            <Chip icon={<LanguageIcon />} sx={{ml:{xs:0, sm:1}, mt:{xs:1, sm:0}}} {...buttonProps} onClick={() => window.open(card.web, '_blank', 'noopener,noreferrer')} label='Web' variant="outlined"/>) : ""}
                        </Typography>
                       </Box> 
                    </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid>
            </Grid>

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Teléfono de contacto copiado al portapapeles
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Alojamientos;