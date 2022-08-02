import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const pueblosLoc = [
    "https://maps.google.com/maps?q=Benllera,%20Le%C3%B3n&t=&z=17&ie=UTF8&iwloc=&output=embed",
    "https://maps.google.com/maps?q=Carrocera,%20Le%C3%B3n&t=&z=17&ie=UTF8&iwloc=&output=embed",
    "https://maps.google.com/maps?q=Cuevas%20de%20Vi%C3%B1ayo,%20Le%C3%B3n&t=&z=17&ie=UTF8&iwloc=&output=embed",
    "https://maps.google.com/maps?q=Otero%20de%20las%20Due%C3%B1as,%20Le%C3%B3n&t=&z=15&ie=UTF8&iwloc=&output=embed",
    "https://maps.google.com/maps?q=Piedrasecha&t=&z=17&ie=UTF8&iwloc=&output=embed",
    "https://maps.google.com/maps?q=Santiago%20de%20las%20Villas&t=&z=15&ie=UTF8&iwloc=&output=embed",
    "https://maps.google.com/maps?q=Vi%C3%B1ayo&t=&z=15&ie=UTF8&iwloc=&output=embed"
]

const Localizacion = ({pageChange}) => {
    const [pueblo, setPueblo] = React.useState("1");
    const [loc, setLoc] = React.useState(pueblosLoc[1]);

    const handleChange = (event, newAlignment) => {
        setPueblo(newAlignment);
        setLoc(pueblosLoc[parseInt(newAlignment, 10)]);
    };

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{width:"100%", maxHeight: 3, mb:3}}><Grid container spacing={0} direction="row">
                <Typography component="h2" variant="body2" >
                <Link color="#4a4948" href="#" onClick={() => pageChange("inicio")} underline="none">
                    Inicio / 
                </Link>
                </Typography>
                <Typography component="h2" variant="body2" sx={{ml:0.5}}> Localización</Typography>
            </Grid></Box>

            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3, mt:1.5}}>
                <Typography display="inline"><Box sx={{ mt:2, fontSize:20, fontWeight: 'bold'}}>AYUNTAMIENTO</Box></Typography>
                <Divider sx={{ width:'40%', bgcolor: "#424242", my:0.5, mb:1 }} variant="middle"/>
                <Box sx={{ display: 'flex', border:1, borderColor: 'red'}}>
                <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Plaza%20Mayor%20N%C2%BA1,%20Carrocera,%20Le%C3%B3n&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" />
                </Box>
            </Grid>

            <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" sx={{mb:3, mt:1.5}}>
                <Typography display="inline"><Box sx={{ mt:2, fontSize:20, fontWeight: 'bold'}}>PUEBLOS</Box></Typography>
                <Divider sx={{ width:'40%', bgcolor: "#424242", my:0.5, mb:1 }} variant="middle"/>
                <ToggleButtonGroup sx={{mb:2}} color="primary" value={pueblo} exclusive onChange={handleChange} >
                    <ToggleButton size="small" value="0">Benllera</ToggleButton>
                    <ToggleButton size="small" value="1">Carrocera</ToggleButton>
                    <ToggleButton size="small" value="2">Cuevas de Viñayo</ToggleButton>
                    <ToggleButton size="small" value="3">Otero de las Dueñas</ToggleButton>
                    <ToggleButton size="small" value="4">Piedrasecha</ToggleButton>
                    <ToggleButton size="small" value="5">Santiago de las Villas</ToggleButton>
                    <ToggleButton size="small" value="6">Viñayo</ToggleButton>
                </ToggleButtonGroup>
                <Box sx={{ display: 'flex', border:1, borderColor: 'blue'}}>
                <iframe width="600" height="500" id="gmap_canvas" src={loc} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </Box>
            </Grid>
        </Box> 
        );
}

export default Localizacion;