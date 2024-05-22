import './App.css';
import EventsBoardPage from './components/EventsBoardPage/EventsBoardPage';
import ParticipantsPage from './components/ParticipantsPage/ParticipantsPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<EventsBoardPage />} />
        <Route path='/RegistrationPage' element={<RegistrationPage />} />
        <Route path='/ParticipantPage' element={<ParticipantsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
