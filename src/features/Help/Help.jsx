import { HiX } from 'react-icons/hi';
import Overlay from '../../components/UI/Overlay';
import { useHelpContext } from '../../context/HelpContext';
import { GiBlackBook, GiNotebook } from 'react-icons/gi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import RequestForm from './RequestForm';
import { useState } from 'react';

const Help = () => {
  const { showHelp, handleHideHelp } = useHelpContext();
  const [reqForm, setReqForm] = useState(false);

  if (!showHelp) return;

  const handleClick = () => {
    if (document.getElementById('zoho-id')) return;
    toast.success('Chat App will be open in while.');
    // Create a script element
    const script = document.createElement('script');
    script.id = 'zoho-id';
    script.type = 'text/javascript';
    script.innerHTML = `
      var $zoho = $zoho || {};
      $zoho.salesiq = $zoho.salesiq || {
        widgetcode: "siq701e75af43e4ab105ccde04b530d300eb16b19011d89c49531e71ded296dad50",
        values: {},
        ready: function() {}
      };
      var d = document;
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.id = "zsiqscript";
      s.defer = true;
      s.src = "https://salesiq.zoho.com/widget";
      document.body.appendChild(s); // Append the new script to the body
    `;
    // Append the script element to the body of the document
    document.body.appendChild(script);
  };

  const handleCloseHelpSection = () => {
    handleHideHelp();
    setReqForm(false);
  };

  return (
    <>
      <Overlay show={showHelp} onClick={handleHideHelp} className="z-50" />
      <aside
        className={`slide fixed right-0 top-0 z-[8888] h-[100dvh] w-[90%] bg-gray-50 px-4 py-7 ${reqForm ? 'sm:w-[500px]' : 'sm:w-[400px]'}`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 pb-5">
          <h1 className="text-[1.3rem] font-[700]">Help & Resources</h1>
          <span
            className="cursor-pointer rounded-md p-3 text-primary-400 hover:bg-primary-100"
            onClick={handleCloseHelpSection}
          >
            <HiX />
          </span>
        </div>

        {reqForm && (
          <div className="flex justify-center">
            <RequestForm open={reqForm} />
          </div>
        )}

        {!reqForm && (
          <section className="mt-6 flex flex-col gap-6 sm:mt-10 sm:gap-10">
            <div className="flex flex-col gap-2">
              <h1 className="block text-[1.1rem] font-[600] sm:text-[1.3rem] sm:font-[700]">
                Help
              </h1>
              <div className="grid grid-cols-2 gap-3">
                <button className=" flex items-center gap-2 rounded-md  border-2 border-primary-100 px-1 py-2 text-[0.8rem] capitalize hover:bg-primary-100/40 sm:gap-3 sm:px-2 sm:py-3 sm:text-[0.9rem]">
                  <GiBlackBook className="text-[1.2rem] text-primary-300" />
                  <span className="font-[600]">Knowledge base</span>
                </button>
                <button className=" flex items-center gap-2 rounded-md  border-2 border-primary-100 px-1 py-2 text-[0.8rem] capitalize hover:bg-primary-100/40 sm:gap-3 sm:px-2 sm:py-3 sm:text-[0.9rem]">
                  <HiOutlineChatBubbleLeftRight className="text-[1.2rem] text-primary-300" />
                  <span className="font-[600]" onClick={handleClick}>
                    chat with us{' '}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="block text-[1.1rem] font-[600] sm:text-[1.3rem] sm:font-[700]">
                Share Feedback
              </h1>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setReqForm(true)}
                  className=" flex items-center gap-2 rounded-md  border-2 border-primary-100 px-1 py-2 text-[0.8rem] capitalize hover:bg-primary-100/40 sm:gap-3 sm:px-2 sm:py-3 sm:text-[0.9rem]"
                >
                  <RiQuestionnaireLine className="text-[1.2rem] text-primary-300" />
                  <span className="font-[600]">submit request</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="block text-[1.1rem] font-[600] sm:text-[1.3rem] sm:font-[700]">
                Resources
              </h1>
              <div className="grid grid-cols-2 gap-3">
                <button className=" flex items-center gap-2 rounded-md  border-2 border-primary-100 px-1 py-2 text-[0.8rem] capitalize hover:bg-primary-100/40 sm:gap-3 sm:px-2 sm:py-3 sm:text-[0.9rem]">
                  <GiNotebook className="text-[1.2rem] text-primary-300" />
                  <span className="font-[600]">Blogs</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </aside>
    </>
  );
};

export default Help;
