import './App.css';
import Footer from './components/footer/Footer';
import NavBar from './components/nav-bar/NavBar';
import Views from './components/views/Views';

const App = () => (
  <div>
    <NavBar />
    <main className={'min-h-[65vh]'}>
      <Views />
    </main>
    <Footer />
  </div>
)

export default App;
