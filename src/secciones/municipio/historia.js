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
import CardMedia from '@mui/material/CardMedia';
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

import {introduccionhistorica} from '../../data.js';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Historia = ({pageChange}) => {

    return(
        <Box sx={{ border:0.5, borderColor:"#757575", flexGrow: 1, bgcolor: 'background.paper', display: 'flex', 
        mt:1, justifyContent:"center",  flexDirection: 'column'}}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
            <Card sx={{ display: 'flex', maxWidth: "90%", m:2}}>
                <Grid container sx={{display: { xs: 'none', md: 'flex' }}} spacing={0} direction="column" justifyContent="center">
                    <CardMedia
                        component="img"
                        image="/vacceos.png"
                        alt="green iguana"
                    />
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column', width:"90%" }}> 
                <CardContent>
                    <CardMedia sx={{display: { xs: 'flex', md: 'none' }, mb:2}}
                        component="img"
                        image="/vacceos.png"
                        alt="green iguana"
                    />
                    <Typography gutterBottom variant="h5" component="div">
                    <Box sx={{ fontWeight: 'bold'}}>Historia del municipio</Box>
                    </Typography>
                    <Typography variant="body1">
                    {introduccionhistorica}
                    </Typography>
                </CardContent>
                </Box>
            </Card>
            </Grid>
        </Box>
    );
}

export default Historia;