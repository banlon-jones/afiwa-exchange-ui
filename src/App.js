import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { login } from './store/slices/AuthSlice';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Views from './routes/Views';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      dispatch(login(JSON.parse(user)))
    }
  })

  return (
    <div>
      <NavBar />
      <main className={'min-h-[65vh]'}>
        <Views />
      </main>
      <Footer />
    </div>
  )
}

export default App;
