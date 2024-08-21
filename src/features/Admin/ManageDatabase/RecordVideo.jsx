import { useRecordWebcam } from 'react-record-webcam';
import { ImPause } from 'react-icons/im';
import { BsRecordCircle, BsStopCircle } from 'react-icons/bs';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { HiX } from 'react-icons/hi';
import { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';

const RecordVideo = ({ onCloseModal }) => {
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [viewRecording, setViewRecording] = useState(false);
  const {
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    activeRecordings,
    closeCamera,
    errorMessage,
  } = useRecordWebcam();

  // Start recording
  const handleStartRecording = async () => {
    setRecordedVideo(null);
    setViewRecording(false);

    const recording = await createRecording();

    if (errorMessage) {
      if (errorMessage && errorMessage === 'NO_USER_PERMISSION') {
        toast.error('No user permission to access camera!', {
          autoClose: 2000,
        });

        await cancelRecording();
        return;
      }
    }
    await openCamera(recording.id);
    await startRecording(recording.id);
    setViewRecording(false); // Reset viewRecording state on start
  };

  // Pause recording
  const handlePauseRecording = async () => {
    const activeRecording = activeRecordings[0];

    if (
      activeRecording &&
      activeRecording.status.toLowerCase() === 'recording'
    ) {
      await pauseRecording(activeRecording.id);
      await closeCamera();
    } else if (
      activeRecording &&
      activeRecording.status.toLowerCase() === 'paused'
    ) {
      await openCamera();
      await resumeRecording(activeRecording.id);
    }
  };

  // Stop recording
  const handleStopRecording = async () => {
    const activeRecording = activeRecordings[0];
    if (activeRecording) {
      const recorded = await stopRecording(activeRecording.id);
      setRecordedVideo(recorded.blob);
      setViewRecording(true);

      await cancelRecording(activeRecordings[0].id);
      await closeCamera();
      // Upload the blob to a back-end
      const formData = new FormData();
      formData.append('file', recorded.blob, 'recorded.webm');
    }
  };

  // Cancel Recording
  const handleCancelRecording = async () => {
    const activeRecording = activeRecordings[0];
    if (activeRecording) {
      await cancelRecording(activeRecording.id);
      await closeCamera();
      setRecordedVideo(null);
      setViewRecording(false);
    }
  };

  // Close recording modal
  const handleClose = async () => {
    if (activeRecordings?.length > 0) {
      await cancelRecording(activeRecordings[0].id);
      await closeCamera();
    }
    onCloseModal();
  };
  console.log(activeRecordings);
  return (
    <div className="relative h-[80dvh] w-full overflow-y-auto pb-20">
      <HiX
        onClick={handleClose}
        className="absolute right-4 top-3 z-50 cursor-pointer text-[1.5rem] text-white "
      />
      <h1 className="mb-4 bg-primary-400 py-3 text-center text-[1.3rem] font-[600] text-white">
        Record Video
      </h1>
      {/* Button to start,pause,resume and cancel recording */}
      <div className="mb-5 flex items-center justify-around">
        {(activeRecordings.length === 0 ||
          activeRecordings[0]?.status === 'ERROR' ||
          recordedVideo) && (
          <button
            onClick={handleStartRecording}
            type="button"
            className="flex cursor-pointer items-center gap-3 bg-primary-300/20 px-3 py-2 hover:bg-primary-300/10"
          >
            <BsRecordCircle className="text-red-500" />
            <span>Start Recording</span>
          </button>
        )}
        {activeRecordings.length > 0 &&
          !recordedVideo &&
          errorMessage !== 'NO_PERMISSION' && (
            <>
              {activeRecordings &&
              activeRecordings[0]?.status.toLocaleLowerCase() === 'paused' ? (
                <button
                  onClick={handlePauseRecording}
                  type="button"
                  className="flex cursor-pointer items-center gap-3 bg-primary-300/20 px-3 py-2 hover:bg-primary-300/10"
                >
                  <FaRegCirclePlay className="text-red-500" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseRecording}
                  type="button"
                  className="flex cursor-pointer items-center gap-3 bg-primary-300/20 px-3 py-2 hover:bg-primary-300/10"
                >
                  <ImPause className="text-red-500" />
                  <span>Pause</span>
                </button>
              )}
              <button
                onClick={handleStopRecording}
                type="button"
                className="flex cursor-pointer items-center gap-3 bg-primary-300/20 px-3 py-2 hover:bg-primary-300/10"
              >
                <BsStopCircle className="text-red-500" />
                <span>Stop</span>
              </button>
              <button
                onClick={handleCancelRecording}
                type="button"
                className="flex cursor-pointer items-center gap-3 bg-primary-300/20 px-3 py-2 hover:bg-primary-300/10"
              >
                <MdCancel className="text-red-500" />
                <span>Cancel</span>
              </button>
            </>
          )}
      </div>

      {/* View recorded video */}
      {viewRecording && recordedVideo && (
        <div className="mt-4 px-3">
          <video
            controls
            src={URL.createObjectURL(recordedVideo)}
            width="100%"
          />
        </div>
      )}

      {/* View recording */}
      {activeRecordings &&
        !recordedVideo &&
        activeRecordings.map(recording => (
          <div key={recording.id} className="rounded-md px-3">
            <video ref={recording.webcamRef} autoPlay />
          </div>
        ))}
    </div>
  );
};

export default RecordVideo;
