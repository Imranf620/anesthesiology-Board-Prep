import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebare from '../Sidebare/Sidebare';
import QuizTrack from '../../features/Quiz/QuizTrack';
import { useScreen } from '../../hooks/useScreen';
import { useState } from 'react';

const MainLayout = ({ children }) => {
  const { screen } = useScreen();
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Mobile and tablet Sidebar */}
      {screen <= 990 && showSidebar && (
        <Sidebare onClose={() => setShowSidebar(false)}>
          <QuizTrack />
        </Sidebare>
      )}
      {/* Desktop sidebar */}
      {screen > 990 && (
        <Sidebare>
          <QuizTrack />
        </Sidebare>
      )}

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <Header onOpenSidebar={() => setShowSidebar(true)} quizTrack={true} />

        {/* main */}
        <main className="main">{<Outlet /> || children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
