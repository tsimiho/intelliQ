import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function Home() {
  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: '100px' }}>
        <Button href="/questionnaire/QQ000" variant="contained">Ερωτηματολογιο</Button>
      </Container>
      <Container maxWidth="sm" style={{ marginTop: '100px' }}>
        <Button href="/question/QQ000/P00/ABCD" variant="contained">Ερωτηση</Button>
      </Container>
      <Container maxWidth="sm" style={{ marginTop: '100px' }}>
        <Button href="/getquestionanswers/QQ000/P00" variant="contained">e</Button>
      </Container>
      <Container maxWidth="sm" style={{ marginTop: '100px' }}>
        <Button href="/admin" variant="contained">Admin</Button>
      </Container>
    </>   
  )
}

export default Home