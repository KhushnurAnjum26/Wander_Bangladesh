
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Divisions from './Pages/Divisions';
import DivisionDetail from './Pages/DivisionDetails';
import Admin from './Pages/Dashboards/Admin';
import Traveller from './Pages/Dashboards/Traveller';

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
    switch (currentUser.role) {
      case 'admin':
        return <Admin onExit={() => navigate('home')} />;

      case 'traveller':
        return <Traveller onExit={() => navigate('home')} />;

      case 'agency':
        return (
          <div className="min-h-screen bg-[#f5ede0] p-8 text-center">
            <h2 className="text-2xl font-semibold">
              Agency Dashboard
            </h2>
            <p className="mt-3">
              The agency dashboard component needs to be connected here.
            </p>
            <button
              onClick={() => navigate('home')}
              className="mt-5 rounded-lg bg-[#1e3d28] px-5 py-3 text-white"
            >
              Back to Home
            </button>
          </div>
        );

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
