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

import HiveIcon from '@mui/icons-material/Hive';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
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

const Agroalimentarios = () => {
    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const buttonProps = {
        size: mobileScreen ? "normal" : "large",
    };

    const items = [
        {id:0, title: 'Panaderia Luciano', tipo: 'Panaderia', loc: 'La Magdalena', telf: '987581014', ub:'Av Florentino Agustín Díez, 45', link:'https://goo.gl/maps/B4F8gPAdDbFQUbib8', ico: <BakeryDiningIcon />},
        {id:1, title: 'Panaderia Virgilio', tipo: 'Panaderia', loc: 'La Magdalena', telf: '987581073', ub:'Av. Florentino A. Diez, 36', link: 'https://goo.gl/maps/yQTQeANW9sgsN5H18', ico: <BakeryDiningIcon />},
        {id:2, title: 'Valle del Torre', tipo: 'Miel', loc: 'Santiago de las Villas', telf:'722231523', ub: '', link: '', ico: <HiveIcon />}
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
                <Grid item key={card.id} xs={12} sm={6}>
                    <Card sx={{ display: 'flex', backgroundImage: "linear-gradient(180deg, rgba(236,226,8,1) 13%, rgba(229,241,79,0.5522584033613445) 43%)", border:1, borderColor: 'black', borderRadius: '9px' }}> 
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>  
                        <Typography gutterBottom variant="h6" sx={{fontWeight:'bold'}} component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={card.ico} {...buttonProps} label={card.tipo} variant="outlined" />
                            <ChipBlack icon={<LocationCityIcon />} sx={{margin:0.5}} {...buttonProps} label={card.loc} variant="outlined"/>
                            <ChipBlack icon={<PhoneIcon />} sx={{margin:0.5}} onClick={() => handleClick(card.telf)} {...buttonProps} label={card.telf} variant="outlined" />
                            {(card.ub !== '') ? (
                            <ChipBlack icon={<PlaceIcon />} sx={{margin:0.5}} {...buttonProps} onClick={() => window.open(card.link, '_blank', 'noopener,noreferrer')} label={card.ub} variant="outlined"/>) : ""}
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

export default Agroalimentarios;