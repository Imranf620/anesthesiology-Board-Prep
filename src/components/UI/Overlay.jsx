const Overlay = ({ show, onClick, className = "" }) => {
  if (!show) return null;

  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm ${className}`}
    ></div>
  );
};

export default Overlay;
