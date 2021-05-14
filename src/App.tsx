import React from 'react';
import styled from 'styled-components';
import Landing from './components/landing';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: #87CEEB;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
`;



function App() {



  return (
    <Background>
      <Landing />
    </Background>
  );
}

export default App;
