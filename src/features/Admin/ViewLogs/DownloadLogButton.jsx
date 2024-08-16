import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/UI/Button";
import { FiDownload } from "react-icons/fi";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

const DownloadLogButton = ({ fileUrl }) => {
  const [loading, setLoading] = useState(false);
  const downloadFile = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("There was an error downloading the file: " + error, {
        autoClose: 10000,
      });
      console.error("There was an error downloading the file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={loading}
      onClick={() => downloadFile(fileUrl)}
      className="rounded-lg border-2 border-transparent p-2 hover:border-primary-100/10"
    >
      {loading ? (
        <LoadingSpinner border="3px" color="white" width="15px" height="15px" />
      ) : (
        <FiDownload />
      )}
    </Button>
  );
};

export default DownloadLogButton;
