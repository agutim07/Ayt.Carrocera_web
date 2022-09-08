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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange,green } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder'

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const ButtonHover = styled(Button)({
    fontWeight: 'bold',
    '&:hover': {
        color: 'black',
        backgroundColor: '#FEAC44'
    }
  });

const MapaWeb = () => {
    const navigate = useNavigate();

    const nav = page => {
        if(page==="INICIO"){
          navigate('/');
        }
        if(page==="Teléfonos de Interés"){
          navigate('/ayt/telefonos');
        }
        if(page==="Corporación Municipal"){
          navigate('/ayt/corporacion');
        }
        if(page==="LOCALIZACIÓN"){
          navigate('/localizacion');
        }
        if(page==="Normativa urbanística"){
          navigate('/ayt/normativa/urbanistica');
        }
        if(page==="Datos del Municipio"){
          navigate('/municipio/datos');
        }
        if(page==="Estadísticas"){
          navigate('/municipio/estadisticas');
        }
        if(page==="Introducción Histórica"){
          navigate('/municipio/historia');
        }
        if(page==="Escudo y Bandera"){
          navigate('/municipio/emblemas');
        }
        if(page==="Benllera"){
          navigate('/pueblos/benllera');
        }
        if(page==="Carrocera"){
          navigate('/pueblos/carrocera');
        }
        if(page==="Cuevas de Viñayo"){
          navigate('/pueblos/cuevas');
        }
        if(page==="Otero de las Dueñas"){
          navigate('/pueblos/otero');
        }
        if(page==="Piedrasecha"){
          navigate('/pueblos/piedrasecha');
        }
        if(page==="Santiago de las Villas"){
          navigate('/pueblos/santiago');
        }
        if(page==="Viñayo"){
          navigate('/pueblos/vinayo');
        }
        if(page==="Espacios Naturales y Patrimonio"){
          navigate('/turismo/naturaleza');
        }
        if(page==="Fiestas"){
          navigate('/turismo/fiestas');
        }
        if(page==="contacto"){
            navigate('/contacto');
        }
        if(page==="pueblos"){
            navigate('/pueblos');
        }
        if(page==="Noticias"){
          navigate('/ayt/noticias');
        }
        if(page==="Eventos"){
          navigate('/ayt/eventos');
        }
      }

    const [open, setOpen] = React.useState([]);
    for(let i=0; i<4 && open.length<4; i++){
        open.push(false);
    }

    const handleClick = (num) => {
        let newMenu = open;
        if(!newMenu[num]){
            newMenu[num] = true;
        }else{
            newMenu[num] = false;
        }
        setOpen([...newMenu]);
    };

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
        <ThemeProvider theme={darkTheme}> 
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{my:{xs:0,sm:2}}}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border:3, borderColor: 'blue'}}
            subheader={<ListSubheader component="div" id="nested-list-subheader">Mapa Web</ListSubheader>}>
            <ListItemButton onClick={() => nav("INICIO")}>
                <ListItemText sx={{color: 'white'}} primary="Inicio" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("contacto")}>
                <ListItemText sx={{color: 'white'}} primary="Contacto" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("LOCALIZACIÓN")}>
                <ListItemText sx={{color: 'white'}} primary="Localización" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("pueblos")}>
                <ListItemText sx={{color: 'white'}} primary="Pueblos" />
            </ListItemButton>

            <ListItemButton onClick={() => handleClick(0)}>
                <ListItemText sx={{color: 'white'}} primary="Ayuntamiento" />
                <Chip label="Subsección" variant="outlined" />
                {open ? <ExpandLess sx={{color:'white'}} /> : <ExpandMore sx={{color:'white'}}/>}
            </ListItemButton>
            <Collapse in={open[0]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton onClick={() => nav("Corporación Municipal")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Coorporación municipal" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Teléfonos de Interés")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Teléfonos de contacto" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Normativa urbanística")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Normativa urbanística" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Eventos")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Eventos" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Noticias")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Noticias" />
                </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={() => handleClick(1)}>
                <ListItemText sx={{color: 'white'}} primary="Municipio" />
                <Chip label="Subsección" variant="outlined" />
                {open ? <ExpandLess sx={{color:'white'}} /> : <ExpandMore sx={{color:'white'}}/>}
            </ListItemButton>
            <Collapse in={open[1]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton onClick={() => nav("Datos del Municipio")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Datos del Municipio" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Escudo y Bandera")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Escudo y Bandera" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Estadísticas")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Estadísticas del Municipio" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Introducción Histórica")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Introducción Histórica" />
                </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={() => handleClick(2)}>
                <ListItemText sx={{color: 'white'}} primary="Pueblos" />
                <Chip label="Subsección" variant="outlined" />
                {open ? <ExpandLess sx={{color:'white'}} /> : <ExpandMore sx={{color:'white'}}/>}
            </ListItemButton>
            <Collapse in={open[2]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton onClick={() => nav("Benllera")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Benllera" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Carrocera")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Carrocera" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Cuevas de Viñayo")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Cuevas de Viñayo" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Otero de las Dueñas")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Otero de las Dueñas" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Piedrasecha")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Piedrasecha" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Santiago de las Villas")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Santiago de las Villas" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Viñayo")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Viñayo" />
                </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={() => handleClick(3)}>
                <ListItemText sx={{color: 'white'}} primary="Turismo y Ocio" />
                <Chip label="Subsección" variant="outlined" />
                {open ? <ExpandLess sx={{color:'white'}} /> : <ExpandMore sx={{color:'white'}}/>}
            </ListItemButton>
            <Collapse in={open[3]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton onClick={() => nav("Espacios Naturales y Patrimonio")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Espacios Naturales y Patrimonio" />
                </ListItemButton>
                <ListItemButton onClick={() => nav("Fiestas")} sx={{ pl: 4 }}>
                    <ListItemText sx={{color: 'white'}} primary="Fiestas" />
                </ListItemButton>
                </List>
            </Collapse>

        </List>
        </Grid>
        </ThemeProvider>
        </Box>
    );
}

export default MapaWeb;