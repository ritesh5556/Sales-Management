import logo from './logo.svg';
import './App.css';
import Table from "./components/Table"
import Statistics from "./components/Statistics"
// import { BarChart } from 'lucide-react';
import BarChartComponent from './components/BarChart';
import PieChartComponent from './components/PieChart';
import Navbar from './components/NavBar';

function App() {
  return (
    <div>
      <Navbar />
      <section id="trasactions" className="pt-24 mt-20">
        <Table />
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="pt-24 mt-20">
        <Statistics />
      </section>

      {/* Bar Chart Section */}
      <section id="barChart" className="pt-24 mt-20">
        <BarChartComponent />
      </section>

      {/* Pie Chart Section */}
      <section id="pieChart" className="pt-24 mt-20">
        <PieChartComponent />
      </section>
    </div>
  );
}

export default App;
