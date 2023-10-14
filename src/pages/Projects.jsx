import React from 'react';
import Container from '@mui/material/Container';

import Navbar from '../components/Navbar';
import BarChart from '../components/BarChart';
import { useAppDispatch } from '../redux/hooks';
import { fetchEnergy } from '../redux/Projects/projectSlice';

function Projects(uuidObject) {
  const dispatch = useAppDispatch();
  const { uuid } = uuidObject;
  console.log('uuid is == ', uuid);
  React.useEffect(() => {
    dispatch(fetchEnergy(uuid));
  }, [uuidObject]);

  return (
    <>
      <Navbar />
      <Container sx={{
        marginTop: '5%',
        alignItems: 'center',
        width: '80vw',
        height: '80vh',
      }}
      >
        <BarChart />
      </Container>
    </>
  );
}

export default Projects;
