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

import HandymanIcon from '@mui/icons-material/Handyman';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';

import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChipBlack = styled(Chip)({
    borderColor: 'black',
    "& .MuiChip-icon": {
      color: 'black'
    },
    "& .MuiChip-iconSmall": {
        color: 'black'
    }
});

const Artesania = () => {
    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const buttonProps = {
        size: mobileScreen ? "normal" : "large",
    };

    const sant = mobileScreen ? "Santiago" : "Santiago de las Villas";
    const ot = mobileScreen ? "Otero" : "Otero de las Dueñas";

    const items = [
        {id:0, title: 'Domingo Pino Álvarez', tipo: 'Cerámica', loc: 'Benllera', telf: '987685195', ub:''},
        {id:1, title: 'Consuelo Concha Reguera Ramos', tipo: 'Vidrio', loc: 'Benllera', telf: '616009372', ub:''},
        {id:2, title: 'Diny', tipo: 'Textil', loc: ot, telf:'670580680', ub: ''},
        {id:3, title: 'Nieves Serrano Carpintero', tipo: 'Cerámica', loc: 'Piedrasecha', telf: '987581429', ub:''},
        {id:4, title: 'Taller Escuela El Manadero', tipo: 'Cerámica', loc: 'Piedrasecha', telf: '646218776', ub:''},
        {id:5, title: 'Indalecio Pahino Fernández', tipo: 'Vidrio', loc: sant, ub: 'C/ Arriba, 29', telf:''}
    ]

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
            <Grid container sx={{mt:1, mb:2}} rowSpacing={2} columnSpacing={2} padding={1} direction="row" alignItems="center">
            {items.map((card) => (
                <Grid item key={card.id} xs={6}>
                    <Card sx={{ display: 'flex', backgroundImage: "linear-gradient(180deg, rgba(156,76,10,1) 17%, rgba(200,118,51,0.5998774509803921) 56%)", border:1, borderColor: 'black', borderRadius: '9px' }}> 
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>  
                        <Typography gutterBottom variant="h6" sx={{fontWeight:'bold'}} component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<HandymanIcon />} {...buttonProps} label={card.tipo} variant="outlined" />
                            <ChipBlack icon={<LocationCityIcon />} sx={{margin:{xs:0, sm:0.5}, my:{xs:0.5, sm:0}}} {...buttonProps} label={card.loc} variant="outlined"/>
                            {(card.telf !== '') ? (
                            <ChipBlack icon={<PhoneIcon />} sx={{margin:{xs:0, sm:0.5}}} onClick={() => handleClick(card.telf)} {...buttonProps} label={card.telf} variant="outlined" />) : ""}
                            {(card.ub !== '') ? (
                            <ChipBlack icon={<PlaceIcon />} sx={{margin:{xs:0, sm:0.5}}} {...buttonProps} onClick={() => window.open("https://goo.gl/maps/8Ydwx3cPWF5c7h3E9", '_blank', 'noopener,noreferrer')} label={card.ub} variant="outlined"/>) : ""}
                        </Typography>
                       </Box> 
                    </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid>

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Teléfono de contacto copiado al portapapeles
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Artesania;