import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CallIcon from '@mui/icons-material/Call';
import ShareIcon from '@mui/icons-material/Share';
import PublicIcon from '@mui/icons-material/Public';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';

import { pink, green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CircularProgress from '@mui/material/CircularProgress';

import {saludo} from '../data.js';
import {useNavigate} from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} 
        aria-labelledby={`vertical-tab-${index}`} {...other}
      >
        {value === index && (
          <Box sx={{ p: 0.5 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Inicio({loadingNews,noticia,loadingEventos,evento}){
    const [value, setValue] = React.useState(0);
    const CurrentDate = new Date();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [openAlert, setOpenAlert] = React.useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {return;}
        setOpenAlert(false);
    };

    const handleClick = () => {
        navigator.clipboard.writeText("https://www.ayuntamientocarrocera.com/");
        setOpenAlert(true);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openCont = Boolean(anchorEl);
    const handleClickCont = (event) => {setAnchorEl(event.currentTarget);};
    const handleCloseCont = () => {setAnchorEl(null);};

    const navigate = useNavigate();
  
    function pageChange(page) {
        if(page==="telefonos"){navigate('/ayt/telefonos', {replace: true});}
        if(page==="contacto"){navigate('/contacto', {replace: true});}
        if(page==="pueblos"){navigate('/pueblos', {replace: true});}
    }

    function sedeLink(){
        window.open("https://aytocarrocera.sedelectronica.es/", '_blank', 'noopener,noreferrer');
    }

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

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{display: { xs: 'block', md: 'none' }, width:"100%", mt:1, mb:3}}>
            <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
                <Button onClick={() => sedeLink()} sx={{ bgcolor:"#e53935"}} variant="contained" startIcon={<PublicIcon />}>
                    SEDE ELECTRÓNICA
                </Button>
            </Grid>
            </Box>
            <Grid container direction="row" justifyContent="center" alignItems="center">
            <Box sx={{ display: { xs: 'block', md: 'none' }}}>
            <Tabs value={value} onChange={handleChange}
            sx={{borderRight: 1, borderColor: 'divider' }} centered>
                <Tab label="Ciudadanos" {...a11yProps(0)} />
                <Tab label="Empresas" {...a11yProps(1)} />
            </Tabs>
            </Box> 
            <Box sx={{ display: { xs: 'none', md: 'block' }}}>
            <Tabs orientation="vertical" value={value} onChange={handleChange}
            sx={{borderRight: 1, borderColor: 'divider' }} centered>
                <Tab label="Ciudadanos" {...a11yProps(0)} />
                <Tab label="Empresas" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => pageChange("telefonos")}>
                            <ListItemIcon><CallIcon /></ListItemIcon>
                            <ListItemText primary="Teléfonos de interés" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => pageChange("contacto")}>
                            <ListItemIcon><SupportAgentIcon /></ListItemIcon>
                            <ListItemText primary="Atención a la ciudadania" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link rel="noopener noreferrer" target="_blank" href="https://aytocarrocera.sedelectronica.es/dossier.0" underline="none">
                        <ListItemButton>
                            <ListItemIcon><RequestPageIcon /></ListItemIcon>
                            <ListItemText sx={{color:'black'}} primary="Trámites y solicitudes" />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton aria-controls={openCont ? 'basic-menu' : undefined} aria-haspopup="true"
                    aria-expanded={openCont ? 'true' : undefined} onClick={handleClickCont}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Perfil del contratante" />
                    </ListItemButton>
                    <Menu anchorEl={anchorEl} open={openCont} onClose={handleCloseCont} MenuListProps={{'aria-labelledby': 'basic-button',}}>
                        <Link rel="noopener noreferrer" target="_blank" href="https://aytocarrocera.sedelectronica.es/" underline="none">
                        <MenuItem sx={{color:'black'}} onClick={handleCloseCont}>Perfil del contratante actual (Sede Electrónica)</MenuItem>
                        </Link>
                        <Link rel="noopener noreferrer" target="_blank" href="https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&ubicacionOrganica=v%2FILA6%2FpJ8o%3D" underline="none">
                        <MenuItem sx={{color:'black'}} onClick={handleCloseCont}>Plataforma de Contratación del Estado</MenuItem>
                        </Link>
                    </Menu>
                </ListItem>
                <ListItem disablePadding>
                    <Link rel="noopener noreferrer" target="_blank" href="http://www.facturae.es/" underline="none">
                    <ListItemButton>
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText sx={{color:'black'}} primary="Factura electrónica" />
                    </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link rel="noopener noreferrer" target="_blank" href="http://www.dipuleon.es/bop" underline="none">
                    <ListItemButton>
                        <ListItemIcon><NewspaperIcon  /></ListItemIcon>
                        <ListItemText sx={{color:'black'}} primary="Boletín Oficial de la Provincia de León" />
                    </ListItemButton>
                    </Link>
                </ListItem>
                </List>
            </TabPanel>
            </Grid>

            <Grid container sx={{mt:0.5}} spacing={4} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                <Paper elevation={12} sx={{ml:{xs:1,sm:3}, mr:{xs:1,sm:0}, backgroundColor: "#222222", border: "1px pink"}}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Typography display="inline"><Box sx={{ color:"pink", fontSize:20, fontWeight: 'bold'}}>Última noticia</Box></Typography>
                        {(loadingNews) ? (
                        <Box sx={{ display: 'flex', my:1 }}>
                            <CircularProgress />
                        </Box>) : (
                        <Card elevation={12}  sx={{width:"100%"}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: pink[500] }} variant="rounded">
                                    <CalendarMonthIcon />
                                </Avatar>
                            }
                            subheader={extractFecha(noticia.fecha)}
                        />
                        <CardContent>
                            <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                            {noticia.title}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Grid container justifyContent="flex-end">
                            <Button variant="outlined" sx={{color:'blue'}} onClick={() => navigate('/ayt/noticias', {replace: true})} endIcon={<AddIcon/>} >
                                MÁS
                            </Button>
                            </Grid>
                        </CardActions>
                        </Card>
                        )}
                    </Grid>
                </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Paper elevation={12} sx={{mr:{xs:1,sm:3}, ml:{xs:1,sm:0}, backgroundColor: "#222222", border: "1px green"}}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Typography display="inline"><Box sx={{ color:"lightgreen", fontSize:20, fontWeight: 'bold'}}>Próximo evento</Box></Typography>
                        {(loadingEventos) ? (
                        <Box sx={{ display: 'flex', my:1 }}>
                            <CircularProgress />
                        </Box>) : ""}

                        {(!loadingEventos && CurrentDate <= new Date(evento.fecha)) ? (
                        <Card elevation={12} sx={{width:"100%"}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                                    <CalendarMonthIcon />
                                </Avatar>
                            }
                            subheader={extractFecha(evento.fecha)}
                        />
                        <CardContent>
                            <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                            {evento.title}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Grid container justifyContent="flex-end">
                            <Button variant="outlined" sx={{color:'blue'}} onClick={() => navigate('/ayt/eventos', {replace: true})} endIcon={<AddIcon/>} >
                                MÁS
                            </Button>
                            </Grid>
                        </CardActions>
                        </Card>
                        ) : ""}

                        {(!loadingEventos &&  CurrentDate > new Date(evento.fecha)) ? (
                        <Card elevation={12} sx={{width:"100%"}}>
                        <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                                <CalendarMonthIcon />
                            </Avatar>
                        }
                        />
                        <CardContent>
                            <Typography gutterBottom sx={{fontWeight:'bold',fontSize:{xs:15,sm:18}}} component="div">
                            No hay eventos próximos
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Grid container justifyContent="flex-end">
                            <Button variant="outlined" sx={{color:'blue'}} onClick={() => navigate('/ayt/eventos', {replace: true})} endIcon={<AddIcon/>} >
                                VER EVENTOS ANTERIORES
                            </Button>
                            </Grid>
                        </CardActions>
                        </Card>
                        ) : ""}
                </Grid>
                </Paper>
                </Grid>
            </Grid>

            <Grid sx={{mt:2}} container direction="row" justifyContent="center" alignItems="center">
            <Card sx={{ maxWidth: "90%", m:2}}>
                <CardMedia
                    component="img"
                    image="/images/casa_consistorial.jpg"
                    alt="casa consistorial"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    <Box sx={{ fontWeight: 'bold'}}>Saludo del alcalde</Box>
                    </Typography>
                    <Typography variant="subtitle1">
                    {saludo}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container direction="row">
                    <Button onClick={() => pageChange("pueblos")} size="small">Los pueblos del municipio</Button>
                    <SpeedDial
                        ariaLabel="share" FabProps={{ size: "small" }} 
                        icon={<ShareIcon />} direction="right" sx={{ml:2}}
                    >
                        <SpeedDialAction key={'Compartir en Twitter'} icon={<TwitterIcon />} 
                        tooltipTitle={'Compartir en Twitter'} rel="noopener noreferrer" target="_blank" 
                        href="https://twitter.com/intent/tweet?url=https://www.ayuntamientocarrocera.com/&text=Ayuntamiento%20de%20Carrocera%20:"/>
                        <SpeedDialAction key={'Compartir en Facebook'} icon={<FacebookIcon />} 
                        tooltipTitle={'Compartir en Facebook'} rel="noopener noreferrer" target="_blank" 
                        href="https://facebook.com/sharer/sharer.php?u=https://www.ayuntamientocarrocera.com/"/>
                        <SpeedDialAction key={'Copiar enlace'} icon={<ContentCopyIcon />} 
                        tooltipTitle={'Copiar enlace'} onClick={() => handleClick()}/>
                    </SpeedDial>
                    </Grid>
                </CardActions>
            </Card>
            </Grid>

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Enlace copiado al portapapeles
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Inicio;