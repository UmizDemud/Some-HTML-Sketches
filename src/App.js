import React, {useEffect, useState} from 'react';
import './App.css';
import BezierSketch from './sketches/Bezier';

function App() {
  const [pageName, setPageName] = useState('home')

  useEffect(() => {
    
  }, [pageName])
  

  return (
    <div className="App">
      <div className='Header'>
        <div className='hdr-btn' style={{'marginLeft': 'auto'}} onClick={() => setPageName('home')}>
          Home
        </div>
        <div className='hdr-btn' onClick={() => setPageName('home')}>
          Background
        </div>
        <div className='hdr-btn' onClick={() => setPageName('portfolio')}>
          Portfolio
        </div>
        <div className='hdr-btn' onClick={() => setPageName('home')}>
          About
        </div>
      </div>
      {
        pageName === 'home' ? 
        <div className='InitialScreen'>
        <div className='LeftColumn'>

        </div>
        <div className='RightColumn'>

        </div>
        </div>

        : pageName === 'portfolio' ? 

          <BezierSketch />

        :
        <>
        </>
      }

    </div>
  );
}

export default App;
