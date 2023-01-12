import './App.css';
import { FunctionComponent } from 'react';
import { AppContextProvider } from './features/AppContext';
import ProfileSelection from './features/profileselection/ProfileSelection';
import Questionary from './features/questionary/Questionary';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <ProfileSelection />
      <Questionary />
    </div>
  );
}

const AppWrapper: FunctionComponent = () => <AppContextProvider><App /></AppContextProvider>;

export default AppWrapper;
