import { HiX } from 'react-icons/hi';
import { TbConfetti } from 'react-icons/tb';

const WelcomePopup = ({ onCloseModal }) => {
  return (
    <div>
      <div className="flex justify-end p-3">
        <HiX
          onClick={onCloseModal}
          className="cursor-pointer font-[1.5rem] hover:scale-110"
        />
      </div>
      <div className=" px-3 py-8 pt-3">
        <div className="mb-3 flex items-center justify-center gap-3 text-[2rem] text-primary-400">
          <TbConfetti />
          <TbConfetti />
          <TbConfetti />
        </div>
        <h1 className="mb-1 text-center text-[1.3rem] font-[600] text-primary-400">
          Brand new testing experience!
        </h1>
        <div className="flex flex-col gap-4 px-2 text-center text-[0.9rem] leading-5 text-primary-300">
          <p>
            We are so pleased to release a brand new testing interface for you.
            <br />
            We have incorporated years of feedback from learners like you to
            provide a fimiliar but inhanced interface.
          </p>

          <p className="px-6">
            If you would like detailed information, you can find out more below,
            otherwise, hop into a test, and let us know what you think!
          </p>

          <div className="flex flex-col text-blue-400">
            <a href="#">Guide: Taking your test</a>
            <a href="#">Guide: Reviewing your test</a>
          </div>
        </div>
        <div className="mt-4 text-center text-[1.4rem] text-primary-400">
          Good Luck!
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
