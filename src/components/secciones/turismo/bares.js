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

import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';

import Divider from '@mui/material/Divider';
import MuiToggleButton from '@mui/material/ToggleButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TipsIcon from '@mui/icons-material/TipsAndUpdates';

const ToggleButton = styled(MuiToggleButton)({
    color: "black",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "black",
      backgroundColor: '#e66407'
    }
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} placement="left" classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
  }));

const ChipBlack = styled(Chip)({
    borderColor: 'black',
    "& .MuiChip-icon": {
        color: 'black'
    },
    "& .MuiChip-iconSmall": {
        color: 'black'
    }
});

const Bares = () => {
    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonProps = {
        size: mobileScreen ? "normal" : "large",
    };
    const buttonProps2 = {
        orientation: mobileScreen ? "vertical" : "horizontal",
    };

    const items = [
        {id:0, title: 'Sidrería Asturias', ub: 'LE-420, 30', loc: 'La Magdalena', telf: '987581599', link: 'https://goo.gl/maps/i26zWtPMF88K4Z717'},
        {id:1, title: 'El Crucero', ub: 'Av. Florentino Agustin Diez, 36', loc: 'La Magdalena', telf: '987581024', link:'https://g.page/hostalelcrucero?share'},
        {id:2, title: 'Santa Lucia', ub: 'Diseminado, 14', loc: 'Otero', telf: '987581437', link: 'https://goo.gl/maps/W7Uh8bRAehML7Gom6'},
        {id:3, title: 'El Piñueco', ub: 'C. Real, 47', loc: 'Viñayo', telf: '600881970', link: 'https://goo.gl/maps/MjH5ifbwyKcGtdhB8'},
        {id:4, title: 'El Manadero', ub: 'Av. el Desfiladero, 4', loc: 'Piedrasecha', telf: '987581429', link: 'https://g.page/elmanadero?share'}
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
            <Grid container direction="column"justifyContent="center" alignItems="center" sx={{mt:1, mb:2}}>
            <ToggleButtonGroup {...buttonProps2} sx={{mb:1}} color="primary" value={pueblo} exclusive onChange={handleChange} >
                <ToggleButton size="small" sx={{fontWeight:'bold'}} value="Municipio">Municipio</ToggleButton>
                <ToggleButton size="small" value="La Magdalena">La Magdalena (Otero)</ToggleButton>
                <ToggleButton size="small" value="Otero">Otero de las Dueñas</ToggleButton>
                <ToggleButton size="small" value="Viñayo">Viñayo</ToggleButton>
                <ToggleButton size="small" value="Piedrasecha">Piedrasecha</ToggleButton>
            </ToggleButtonGroup>
           <Box sx={{width:"100%", mb:0.5, display:{xs:"none", md:"flex"}, justifyContent:"right", alignItems:"right", align:"right"}}>
                <LightTooltip title={"Pulsa en las direcciones para abrirlas en Google Maps. Pulsa en los teléfonos para copiarlos."}>
                    <Button startIcon={<TipsIcon />} sx={{color:'orange'}}> Información </Button>
                </LightTooltip>
            </Box> 
            <Grid container rowSpacing={2} columnSpacing={2} padding={1} direction="row" alignItems="center">
            {alj.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} >
                    <Card sx={{ display: 'flex', backgroundImage: "linear-gradient(180deg, rgba(230,100,7,1) 20%, rgba(255,209,0,0.2945553221288515) 58%)", border:1, borderColor: 'black', borderRadius: '9px' }}> 
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>  
                        <Typography gutterBottom variant="h5" sx={{fontWeight:'bold'}} component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<RestaurantIcon />} {...buttonProps} label={card.ub} variant="outlined"  onClick={() => window.open(card.link, '_blank', 'noopener,noreferrer')} />
                            <ChipBlack sx={{margin:0.5}} icon={<LocationCityIcon />} {...buttonProps} label={card.loc} variant="outlined"/>
                            <ChipBlack sx={{margin:0.5}} icon={<PhoneIcon />} onClick={() => handleClick(card.telf)} {...buttonProps} label={card.telf} variant="outlined" />
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

export default Bares;