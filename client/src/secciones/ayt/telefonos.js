import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import Button from '@mui/material/Button';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import TipsIcon from '@mui/icons-material/TipsAndUpdates';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import {Link} from "react-router-dom";

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Telefonos = () => {
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
            <Box sx={{width:"100%", mt:1, display:{xs:"none", md:"flex"}, justifyContent:"right", alignItems:"right", align:"right"}}>
                <LightTooltip title={"Pulsa en las direcciones para abrirlas en Google Maps. Pulsa en los teléfonos para copiarlos."}>
                    <Button startIcon={<TipsIcon />} sx={{color:'orange'}}> Información </Button>
                </LightTooltip>
            </Box> 
            <Grid container rowSpacing={2} direction="row" alignItems="center" sx={{ml:"3.5%", mb:3, mt:1.5}}>
                <Grid item xs={11} md={5} align="right">
                <Card sx={{ display: 'flex', border:1, borderColor: 'black', borderRadius: '9px'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }}}>
                        <CardMedia component="img" image="/images/escudo.png" />
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                            Ayuntamiento
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<PhoneIcon />} onClick={() => handleClick("987 592 071")} size="small" label="987 592 071" variant="outlined" sx={{mb:1}}/>
                            <ChipBlack icon={<PlaceIcon />} size="small" onClick={() => window.open("https://goo.gl/maps/Ez4onQnZ8PLvjJpM6", '_blank', 'noopener,noreferrer')}
                            label="Plaza Mayor, 1. Carrocera" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container spacing={0} sx={{ display: { xs: 'none', md: 'block' }}} direction="column" justifyContent="center">
                        <CardMedia sx={{maxWidth:120}} component="img" image="/images/escudo.png" />
                    </Grid>
                </Card>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11} md={5} align="left">
                <Card sx={{ display: 'flex', border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }}}>
                        <CardMedia maxWidth="90%" component="img" image="/images/sacyl.png" />
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                            Centro de salud
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<PhoneIcon />} onClick={() => handleClick("987 581 373")} size="small" label="987 581 373" variant="outlined" sx={{mb:1}}/>
                            <ChipBlack icon={<PlaceIcon />} size="small" onClick={() => window.open("https://goo.gl/maps/3QT4yZxYhqxUgayR9", '_blank', 'noopener,noreferrer')}
                            label="Av. la Magdalena, 4. La Magdalena" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container sx={{ display: { xs: 'none', md: 'block' }}} direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia sx={{maxWidth:110,mt:1}} component="img" image="/images/sacyl.png" />
                    </Grid>
                </Card>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11} md={5} align="right">
                <Card sx={{ display: 'flex', border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }}}>
                        <CardMedia maxWidth="90%" component="img" image="/images/farmacia.png" />
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                            Farmacia
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<PhoneIcon />} onClick={() => handleClick("987 581 126")} size="small" label="987 581 126" variant="outlined" sx={{mb:1}}/>
                            <ChipBlack icon={<PlaceIcon />} size="small" onClick={() => window.open("https://goo.gl/maps/QfQqAYTc8oDZk2rDA", '_blank', 'noopener,noreferrer')}
                            label="LE-420, 2. La Magdalena" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container sx={{ display: { xs: 'none', md: 'block' }}} direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia component="img" image="/images/farmacia.png" />
                    </Grid>
                </Card>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11} md={5.5} align="left">
                <Card sx={{ display: 'flex', border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }}}>
                        <CardMedia sx={{maxWidth:"90%"}} component="img" image="/images/guardiacivil.png" />
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                            Guardia Civil
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<PhoneIcon />} onClick={() => handleClick("987 581 017")} size="small" label="987 581 017" variant="outlined" sx={{mb:1}}/>
                            <ChipBlack icon={<PlaceIcon />} size="small" onClick={() => window.open("https://goo.gl/maps/eMEvrSSyPUhwKnts5", '_blank', 'noopener,noreferrer')}
                            label="Av. Florentino Agustin Diez, 2007. La Magdalena" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container sx={{ display: { xs: 'none', md: 'block' }}} direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia sx={{maxWidth:90}} component="img" image="/images/guardiacivil.png" />
                    </Grid>
                </Card>
                </Grid>

                <Grid item xs={1} md={0.5} />
                <Grid item xs={11} md={4.5} align="right">
                <Card sx={{ display: 'flex', border:1, borderColor: 'black', borderRadius: '9px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>   
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Box sx={{ display: { xs: 'block', md: 'none' }}}>
                        <CardMedia maxWidth="100%" component="img" image="/images/4valles_perfil.png" />
                        </Box>
                        <Typography variant="h5" component="div">
                            Cuatro valles
                        </Typography>
                        <Typography gutterBottom color="#4a4948" variant="subtitle1" component="div">
                            Grupo de acción local
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <ChipBlack icon={<PhoneIcon />} onClick={() => handleClick("987 581 666")} size="small" label="987 581 666" variant="outlined" sx={{mb:1}}/>
                            <ChipBlack icon={<PlaceIcon />} size="small" onClick={() => window.open("https://goo.gl/maps/cCwDwKz44q9LTLen7", '_blank', 'noopener,noreferrer')}
                            label="Av. Manocho nº 92. Canales" variant="outlined" />
                        </Typography>
                    </CardContent>
                    </Box>
                    <Grid container sx={{ display: { xs: 'none', md: 'block' }}} direction="column" spacing={0} justifyContent="center" justify="center">
                        <CardMedia component="img" image="/images/4valles_perfil.png" />
                    </Grid>
                </Card>
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

export default Telefonos;