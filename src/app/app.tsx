import './app.scss';
import Chart from "./components/chart/Chart";
import ValuesList from "./components/values-list/ValuesList";

export function App() {
  return (
    <div className='app'>
      <Chart></Chart>
      <ValuesList></ValuesList>
    </div>
  );
}

export default App;
