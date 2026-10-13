
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './Pages/DivisionDetails/Home';
import Divisions from './Pages/DivisionDetails/Divisions';
import DivisionDetail from './Pages/DivisionDetails/DivisionDetail';
import Dashboard from './Pages/DivisionDetails/Dashboard';
import Admin from './Pages/Dashboards/Admin';

function App() {
  const [page, setPage] = useState('home');
  const [selectedDivision, setSelectedDivision] = useState('dhaka');

  // Temporary frontend user for testing
  const [currentUser] = useState({
  name: 'Agency User',
  role: 'agency',
});

  const navigate = (target, divisionId) => {
    if (divisionId) {
      setSelectedDivision(divisionId);
    }

    setPage(target);
  };

  const renderDashboard = () => {
    switch (currentUser?.role) {
      case 'admin':
        return <Admin onExit={() => navigate('home')} />;

      case 'agency':
        return <Agency onExit={() => navigate('home')} />;

      case 'traveller':
        return <Traveller onExit={() => navigate('home')} />;

      default:
        return (
          <div className="p-8 text-center">
            You are not authorized to access this dashboard.
            <button
              onClick={() => navigate('home')}
              className="ml-3 underline"
            >
              Go Home
            </button>
          </div>
        );
    }
  };

  if (page === 'dashboard') {
    return renderDashboard();
  }

  return (
    <div className="min-h-screen bg-[#f5ede0]">
      <Navbar
        currentPage={page}
        onNavigate={navigate}
        user={currentUser}
      />

      {page === 'home' && <Home onNavigate={navigate} />}

      {page === 'divisions' && <Divisions onNavigate={navigate} />}

      {page === 'detail' && (
        <DivisionDetail
          divisionId={selectedDivision}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}

export default App;
