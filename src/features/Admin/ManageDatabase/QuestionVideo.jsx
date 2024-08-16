import { useState } from 'react';
import Modal from '../../../components/UI/Modal';
import { IoIosPlayCircle } from 'react-icons/io';
import { BsRecordCircle } from 'react-icons/bs';
import { MdOutlineFileUpload } from 'react-icons/md';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import RecordVideo from './RecordVideo';

const QuestionVideo = () => {
  const [loading, setLoading] = useState(false);
  const [videoSrc, setvideoSrc] = useState(null);

  const handleVideo = e => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true); // Set loading state to true when file selection starts

    const video = document.createElement('video');
    video.preload = 'auto';

    video.onloadeddata = () => {
      
      setLoading(false); // Set loading state to false when video is fully loaded
      // Here you can send the video file to the server
      // Example: sendVideoToServer(video);
    };

    video.src = URL.createObjectURL(file);

    setvideoSrc(video.src);
  };
  return (
    <Modal>
      <div className="flex items-center gap-3">
        <label
          htmlFor="video"
          className="flex cursor-pointer items-center gap-3 bg-primary-300/20 px-3 py-2 hover:bg-primary-300/10"
        >
          {loading ? (
            <LoadingSpinner width="14px" height="14px" border="2px" />
          ) : (
            <MdOutlineFileUpload className="text-[1.2rem]" />
          )}
          <span> Upload Video</span>
        </label>
        <span>OR</span>
        <input onChange={handleVideo} hidden type="file" id="video" />
        <Modal.Open id="record">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-3 bg-primary-300/20 px-3 py-2 hover:bg-primary-300/10"
          >
            <BsRecordCircle className="text-red-500" />
            <span>Record Video</span>
          </button>
        </Modal.Open>
        <Modal.Window id="record" closeOnOverlay>
          <RecordVideo />
        </Modal.Window>
      </div>

      {videoSrc && (
        <>
          <Modal.Open id="play">
            <button type="button" className="flex items-center gap-2">
              <IoIosPlayCircle className="text-[1.5rem] text-primary-300" />
              <span className="text-[0.7rem] ">Play Video</span>
            </button>
          </Modal.Open>
          <Modal.Window id="play" closeOnOverlay>
            <div>
              <video src={videoSrc} controls width="100%">
                <source src={videoSrc} />
              </video>
            </div>
          </Modal.Window>
        </>
      )}
    </Modal>
  );
};

export default QuestionVideo;
