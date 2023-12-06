import { useEffect } from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import NavBar from './components/nav-bar/NavBar';
import Views from './components/views/Views';
import { useDispatch } from 'react-redux';
import { login } from './components/login/AuthSlice';

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
