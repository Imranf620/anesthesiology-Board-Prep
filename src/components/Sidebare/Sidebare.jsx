import { useScreen } from "../../hooks/useScreen";

const Sidebare = ({ children, onClose }) => {
  const { screen } = useScreen();
  return (
    <>
      {/* Desktop */}
      {screen > 990 && (
        <aside className="w-[20rem] flex-none bg-primary-500 text-slate-100">
          {children}
        </aside>
      )}
      {/* Mobile and tablet */}
      {screen <= 990 && (
        <>
          <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          ></div>
          <aside className="fixed left-0 top-0 z-[700] h-screen w-[300px] bg-primary-500 px-4 text-slate-100">
            {children}
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebare;
