import tl from './tl.png'
import './App.css';
import Dnld_btn from './components/dnld_btn';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={tl} className="App-tl" alt="tl" />
        <div className='app-container' ><b>X-Manibus</b><br></br>Real Time EMG Data Logging with Graphs on ESP32</div>
        <div className="chart-container" >
          <p>aa</p>
        <canvas id="Chart" width="400" height="400"></canvas>
        </div>
        <Dnld_btn/>
      </header>
      
      
    </div>
  );
}

export default App;
