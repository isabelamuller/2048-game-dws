import { useState, useEffect } from 'react';
import './App.css';
import Game from './Components/Game';
import { ThemeContext } from './Components/Theme/ThemeContext';

const App = () => {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    if(theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme');
    if(themeLocal) {
      setTheme(themeLocal);
    }
  }, [])

  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Game />
    </ThemeContext.Provider>
  );
}
export default App;