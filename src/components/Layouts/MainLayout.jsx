import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebare from "../Sidebare/Sidebare";
import CreateQuickTest from "../../features/CreateTest/CreateQuickTest";
import { useState } from "react";
import { useScreen } from "../../hooks/useScreen";
import Help from "../../features/Help/Help";

const MainLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { screen } = useScreen();
  return (
    <div className="flex h-screen">
      {showSidebar && screen <= 990 && (
        // Mobile Sidebar
        <Sidebare onClose={() => setShowSidebar(false)}>
          <CreateQuickTest />
        </Sidebare>
      )}
      {screen > 990 && (
        // Desktop sidebar
        <Sidebare>
          <CreateQuickTest />
        </Sidebare>
      )}

      {/* Help sidebar */}
      <Help />
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <Header onOpenSidebar={() => setShowSidebar(true)} quizTrack={false} />
        {/* Main */}
        <main className="main">{<Outlet /> || children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
