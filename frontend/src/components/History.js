import React from 'react'
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

function History(props) {
    const [currID, setCurrID] = React.useState('-');
    const handleClick = (ID) => {
        setCurrID(currID === ID ? '-' : ID)
    }
    const Pairs = props.history.map((hist) =>
        <>
            <ListItem>
                <List sx={{width: '100%'}}>
                    <ListItemButton onClick={() => handleClick(hist.sessionID)}>
                        <ListItemText primary={hist.sessionID} />
                        {currID === hist.sessionID ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={currID === hist.sessionID} timeout="auto" unmountOnExit>
                        <List>
                            {hist.pair.map((p) => 
                                <>
                                    <ListItem>
                                        <List>
                                            <ListItemText primary={p.qtext} />
                                            <ListItem>
                                                <ListItemIcon>
                                                    <SendIcon sx={{ fontSize: 10 }}/>
                                                </ListItemIcon>
                                                <ListItemText primary={p.opttxt} />
                                            </ListItem>    
                                        </List> 
                                    </ListItem>
                                    <Divider />
                                </>                    
                            )}    
                        </List>   
                    </Collapse>                           
                </List>
            </ListItem>
            <Divider />
        </>        
    );

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '0px' }}>
                <Typography variant="h6" gutterBottom sx={{mt:2}}>
                    Sessions:
                </Typography>
                <List>
                    { Pairs }
                </List>              
            </Container>        
        </>       
  )
}

export default History