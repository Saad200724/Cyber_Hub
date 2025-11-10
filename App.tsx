import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Import page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import IdeasPage from './pages/IdeasPage';
import ExecutivePage from './pages/ExecutivePage';
import ProjectsPage from './pages/ProjectsPage';


const App: React.FC = () => {
  // Use window.location.hash to determine the current route
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0); // Scroll to top on page change
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Render the appropriate page component based on the route
  const renderPage = () => {
    switch (route) {
      case '#/about':
        return <AboutPage />;
      case '#/events':
        return <EventsPage />;
      case '#/ideas':
        return <IdeasPage />;
      case '#/executive':
        return <ExecutivePage />;
      case '#/projects':
        return <ProjectsPage />;
      case '#/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-[#0F0F1A] min-h-screen overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow pt-20"> {/* Add padding top to avoid content being hidden by fixed header */}
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
