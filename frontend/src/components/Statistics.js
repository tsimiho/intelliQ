import React from 'react'
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 

function Statistics(props) {
    const [currID, setCurrID] = React.useState('-');
    const handleClick = (ID) => {
        setCurrID(currID === ID ? '-' : ID)
    }
    
    const Questions = props.questions.filter(function(x) {return x.options.length>1;}).map((question) =>
        <>
            <ListItem>
                <List sx={{width: '100%'}}>
                    <ListItemButton onClick={() => handleClick(question.qID)}>
                        <ListItemText 
                        primary={question.qtext} 
                        //secondary={sec(question.required,question.type)}
                        />
                        {currID === question.qID ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={currID === question.qID} timeout="auto" unmountOnExit>
                        <ResponsiveContainer width="100%" aspect={3} >
                            <BarChart
                            width={500}
                            height={300}
                            data={question.options}
                            margin={{
                                top: 15,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="opttxt" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="counter" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
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
                    Ερωτήσεις:
                </Typography>
                <List>
                    { Questions }
                </List>              
            </Container>        
        </>       
    )
}

export default Statistics