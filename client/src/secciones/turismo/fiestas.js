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

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Divider from '@mui/material/Divider';
import MuiToggleButton from '@mui/material/ToggleButton';
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

const ToggleButton = styled(MuiToggleButton)({
    color: "black",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "black",
      backgroundColor: '#29d457'
    }
});

const Fiestas = () => {
    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const buttonProps = {
        size: mobileScreen ? "normal" : "large",
    };

    const buttonProps2 = {
        orientation: mobileScreen ? "vertical" : "horizontal",
    };

    const items = [
        {id:0, title: 'Benllera', date: '16 y 17 de Agosto', label: 'San Roque y San Roquín' },
        {id:1, title: 'Carrocera', date: '16 y 17 de Julio', label: 'El Carmen y el "Carmín"' },
        {id:2, title: 'Cuevas de Viñayo', date: '10 de Septiembre', label: 'San Nicolás de Bari' },
        {id:3, title: 'Otero de las Dueñas', date: 'Último fin de semana de Agosto', label: 'Ntra. señora de Fátima' },
        {id:4, title: 'Piedrasecha', date: 'Último fin de semana de Agosto', label: 'Santos Justo y Pastor' },
        {id:5, title: 'Santiago de las Villas', date: '25 de Julio', label: 'Santiago Apóstol' },
        {id:6, title: 'Santiago de las Villas', date: '16 de Septiembre', label: 'San Cipriano' },
        {id:7, title: 'Viñayo', date: 'Miércoles siguiente al día de Corpus', label: 'Octava de Corpus' }
    ]

    const [alj, setAlj] = React.useState(items);

    const [pueblo, setPueblo] = React.useState("Municipio");
    const handleChange = (event, newAlignment) => {
        setPueblo(newAlignment);
        if(newAlignment==="Municipio"){
            setAlj(items);
        }else{
            setAlj(items.filter((item) => item.title === newAlignment));
        }
    };

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Grid container direction="column"justifyContent="center" alignItems="center" sx={{mt:1, mb:2}}>
            <ToggleButtonGroup {...buttonProps2} sx={{mb:2}} value={pueblo} exclusive onChange={handleChange} >
                <ToggleButton size="small" sx={{fontWeight:'bold'}} value="Municipio">Municipio</ToggleButton>
                <ToggleButton size="small" value="Benllera">Benllera</ToggleButton>
                <ToggleButton size="small" value="Carrocera">Carrocera</ToggleButton>
                <ToggleButton size="small" value="Cuevas de Viñayo">Cuevas</ToggleButton>
                <ToggleButton size="small" value="Otero de las Dueñas">Otero</ToggleButton>
                <ToggleButton size="small" value="Piedrasecha">Piedrasecha</ToggleButton>
                <ToggleButton size="small" value="Santiago de las Villas">Santiago</ToggleButton>
                <ToggleButton size="small" value="Viñayo">Viñayo</ToggleButton>
            </ToggleButtonGroup>
            <Grid container sx={{mb:2}} rowSpacing={2} columnSpacing={2} padding={1} direction="row" alignItems="center">
            {alj.map((card) => (
                <Grid item key={card.id} xs={12} sm={6}>
                    <Card sx={{ display: 'flex', backgroundImage: "linear-gradient(180deg, rgba(41,212,87,100) 20%, rgba(255,209,0,0.2945553221288515) 58%)", border:1, borderColor: 'black', borderRadius: '9px' }}> 
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>  
                        <Typography gutterBottom variant="h6" sx={{fontWeight:'bold'}} component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<CalendarMonthIcon />} {...buttonProps} label={card.date} variant="outlined" />
                            <ChipBlack {...buttonProps} sx={{margin:1}} label={card.label} variant="outlined" />
                        </Typography>
                       </Box> 
                    </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid>
            </Grid>
        </Box>
    );
}

export default Fiestas;