import { createContext, useContext, useState } from 'react';

const HelpContext = createContext({});

const HelpContextProvider = ({ children }) => {
  const [showHelp, setShowHelp] = useState(false);

  const handleShowHelp = () => {
    setShowHelp(true);
    document.body.style.overflow = 'hidden';
  };
  const handleHideHelp = () => {
    setShowHelp(false);
    document.body.style.overflow = 'visible';
  };

  return (
    <HelpContext.Provider value={{ showHelp, handleShowHelp, handleHideHelp }}>
      {children}
    </HelpContext.Provider>
  );
};

export const useHelpContext = () => {
  const context = useContext(HelpContext);

  if (!context) throw Error('Help Context is used outside of provider!');

  return context;
};

export default HelpContextProvider;
