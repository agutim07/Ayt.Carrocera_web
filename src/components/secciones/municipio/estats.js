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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SpeedDial from '@mui/material/SpeedDial';
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
import CloseIcon from '@mui/icons-material/Cancel';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Estadisticas = ({pageChange}) => {

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Box sx={{width:"100%", maxHeight: 3, mb:3}}><Grid container spacing={0} direction="row">
                <Typography component="h2" variant="body2" >
                <Link color="#4a4948" href="#" onClick={() => pageChange("inicio")} underline="none">
                    Inicio / 
                </Link>
                </Typography>
                <Typography component="h2" variant="body2" sx={{ml:0.5}}> Municipio / Estadísticas Demográficas</Typography>
            </Grid></Box>

            <Grid container sx={{my:1}} spacing={0.5} direction="row" justifyContent="center">
                
            </Grid>
        </Box>
    );
}

export default Estadisticas;