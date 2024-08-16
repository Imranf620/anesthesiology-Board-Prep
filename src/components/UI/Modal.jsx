import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';

const ModalContext = createContext();

function Modal({ children }) {
  const [openId, setOpenId] = useState('');

  const open = id => setOpenId(id);
  const close = () => setOpenId('');

  useEffect(() => {
    if (openId) document.body.style.overflow = 'hidden';
    if (!openId) document.body.style.overflow = 'visible';
  }, [openId]);

  return (
    <ModalContext.Provider value={{ open, close, openId }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, id }) {
  const { open } = useContext(ModalContext);
  const handleClick = () => {
    open(id);
  };
  return cloneElement(children, {
    onClick: handleClick,
  });
}

function Window({ children, closeOnOverlay = false, center = false, id }) {
  const { close, openId } = useContext(ModalContext);
  if (id !== openId) return null;

  return createPortal(
    <>
      <Overlay
        show={id === openId}
        onClick={() => closeOnOverlay && close()}
        className="z-[9999]"
      />
      <div
        className={`fixed z-[9999] w-[90%] rounded-md bg-white sm:w-[500px] ${
          center ? 'top-1/2 -translate-y-1/2 ' : 'top-0 mt-[5rem] '
        } left-1/2 -translate-x-1/2 overflow-hidden shadow-md`}
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </>,
    document.getElementById('overlay'),
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
