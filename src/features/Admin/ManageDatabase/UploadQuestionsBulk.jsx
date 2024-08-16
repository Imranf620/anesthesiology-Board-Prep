import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import Table from "../../../components/UI/Table";
import Button from "../../../components/UI/Button";
import { useAddQuestionBulk } from "./useAddQuestionBulk";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { verfiFields } from "../../../utils/verfiyFields";
import { HiArrowLeft } from "react-icons/hi";
import RippleEffect from "../../../components/UI/RippleEffect";

const UploadQuestionsBulk = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);
  const { addQuestions, isLoading } = useAddQuestionBulk();
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  // Total pages
  const totalPages =
    uploadedData.length > 0 && Math.ceil(uploadedData.length / 10);

  // Slice data
  let displayData;
  if (uploadedData.length > 0) {
    displayData =
      uploadedData.length < 10
        ? uploadedData
        : uploadedData.slice((currentPage - 1) * 10, currentPage * 10);
  }

  // Handle excel file upload and extract all the data
  const handleFileUpload = (e, uploadedFile) => {
    let file;
    if (uploadedFile) {
      file = uploadedFile;
    } else {
      file = e.target.files[0];
    }

    // If no file exists simply return
    if (!file) return;
    const fileExt = file.name.split(".").at(-1);

    // If file is other than excel return
    if (fileExt !== "xlsx" && fileExt !== "xls")
      return toast.error("File should be an excel file!", { autoClose: 6000 });

    // Set loading to true
    setIsFileLoading(true);
    // Set current page to one
    if (currentPage) setCurrentPage(1);

    // Set error to null
    setError(null);

    // Create file reader object
    const reader = new FileReader();

    // Read data from excel file
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      try {
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = utils.sheet_to_json(sheet);
        setUploadedData(jsonData);
        setIsFileLoading(false);
      } catch (err) {
        toast.error(
          `Error occurred while processing the file: ${err.message}`,
          {
            autoClose: 7000,
          },
        );
      } finally {
        setIsFileLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Add question to db function
  const handleSaveQuestions = () => {
    const data = {
      username: localStorage.getItem("username"),
      questionsList: uploadedData,
    };
    addQuestions(data, {
      onSuccess: () => {
        toast.success("Questions successfully uploaded!", { autoClose: 5000 });
        setUploadedData([]);
        setCurrentPage(1);
      },
      onError: (err) => {
        toast.error(
          err.message ||
            "Error occured while uploading the file please try again!",
        );
      },
    });
  };

  // Handle Drop event
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    handleFileUpload(null, event.dataTransfer.items[0].getAsFile());
  };

  // Handle Drag event
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  // If file is uploaded check for mendetory fields
  useEffect(() => {
    if (uploadedData) {
      const mandatoryFields = [
        "Question Text",
        "Keywords",
        "Answer A",
        "Answer B",
        "Answer C",
        "Answer D",
        "Answer A ~ Explanation on why answer is correct or incorrect",
        "Answer B ~ Explanation on why answer is correct or incorrect",
        "Answer C ~ Explanation on why answer is correct or incorrect",
        "Answer D ~ Explanation on why answer is correct or incorrect",
        "Correct Answer (letter only)",
        "Reference(s)",
        "Bottom Line Summary",
        "Contributor Initials",
      ];
      const { newData, error: err } = verfiFields(
        mandatoryFields,
        uploadedData,
      );
      setError(err);
      if (!err) {
        setUploadedData(newData);
      }
    }
  }, [uploadedData]);

  return (
    <>
      <div className="px-3 pt-10 md:px-10">
        {/* go back  button */}
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3"
          variant="underline"
        >
          <HiArrowLeft />
          <span>Go Back</span>
        </Button>
      </div>
      <section className="mx-3 flex flex-col gap-8 py-10 md:mx-10">
        {/* Errors when file is uploaded and mandatory fields are missing */}
        {error && (
          <div className="flex items-center gap-4">
            <p className="font-[500] text-red-500">
              There are {error.split(",").length - 1} Errors
            </p>
            <button
              onClick={() => setShowError(!showError)}
              className="rounded-md border-2 border-red-500 bg-red-200 px-8 py-2 text-red-500 "
            >
              {showError ? "Hide Errors" : "Show Errors"}
            </button>
          </div>
        )}

        {/* Error occure while uploading the file */}
        {showError && (
          <div className="flex flex-wrap items-center gap-5">
            {error
              .split(",")
              .slice(0, -1)
              .map((err, i) => (
                <p key={err} className="text-[0.8rem] text-red-500">
                  ({i + 1}) {err}
                </p>
              ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Upload file button */}
          <div>
            <label
              className="cursor-pointer rounded-md bg-primary-400 px-8 py-2 text-white shadow-md hover:-translate-y-[1px] "
              htmlFor="excelFile"
            >
              Upload File
            </label>
            <input
              id="excelFile"
              type="file"
              accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileUpload}
              hidden
            />
          </div>
          {/* Download excel temaplate button */}
          <a
            download
            href="/Bulk questions template.xlsx"
            className="rounded-md bg-primary-400 px-5 py-1 text-white"
          >
            Download Template
          </a>
        </div>

        {/* Drag and drop container */}
        {(uploadedData.length === 0 || isFileLoading) && (
          <RippleEffect>
            <label
              htmlFor="excelFile"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`flex h-[300px] w-full cursor-pointer items-center justify-center border-2 hover:bg-black/5 ${
                isDragOver ? "border-black/50 bg-black/10" : "border-gray-400"
              } rounded-lg`}
            >
              {!isFileLoading ? (
                <h1 className="text-center text-[1.5rem] font-[700] text-gray-400/50 md:text-[2rem]">
                  Upload <br /> OR <br /> Drag & Drop an Excel File
                </h1>
              ) : (
                <LoadingSpinner />
              )}
            </label>
          </RippleEffect>
        )}
        {/* Data Table */}
        {uploadedData.length > 0 && !isFileLoading && (
          <div className="mx-auto max-h-[80dvh] w-full min-w-[300px] overflow-hidden rounded-lg border-2 border-gray-400">
            <div className="max-h-[70dvh] w-full overflow-auto">
              <Table className="w-full overflow-scroll text-[0.7rem]">
                <Table.Head>
                  <Table.Row className="sticky top-0 z-20 border-2 border-gray-300 bg-gray-400">
                    {uploadedData.length > 0 &&
                      Object.keys(uploadedData[0]).map((key, index) => (
                        <th
                          className="w-max border-2 border-gray-300 text-[0.7rem]"
                          key={index}
                        >
                          {key}
                        </th>
                      ))}
                  </Table.Row>
                </Table.Head>
                {displayData && (
                  <Table.Body>
                    {displayData &&
                      displayData.map((row, rowIndex) => (
                        <Table.Row
                          className="border-2 border-gray-300"
                          key={rowIndex}
                        >
                          {Object.keys(uploadedData[0]).map(
                            (field, cellIndex) => (
                              <Table.Data
                                className={`border-2 border-gray-300 ${
                                  row[field] === "missing"
                                    ? "text-red-500"
                                    : "text-inherit"
                                }`}
                                key={cellIndex}
                              >
                                {row[field]}
                              </Table.Data>
                            ),
                          )}
                        </Table.Row>
                      ))}
                  </Table.Body>
                )}
              </Table>
            </div>

            {/* Pagination controls */}
            <div className="sticky bottom-0 flex w-full flex-wrap items-center justify-between bg-gray-300 px-3 py-4">
              <div>Current Page: {displayData ? currentPage : 0}</div>
              {totalPages > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="rounded-md bg-gray-400 px-5 py-1 font-[500] hover:bg-gray-500 hover:text-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    &larr; Prev
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="rounded-md bg-gray-400 px-5 py-1 font-[500] hover:bg-gray-500 hover:text-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}

              <div>
                Total Pages:{" "}
                <span className="font-[500]">{totalPages || 0}</span>
              </div>
            </div>
          </div>
        )}

        {/* Upload Button */}
        {uploadedData.length > 0 && !isFileLoading && !error && (
          <Button
            variant="dark"
            disabled={isLoading}
            onClick={handleSaveQuestions}
            isLoading={isLoading}
          >
            Upload
          </Button>
        )}
      </section>
    </>
  );
};

export default UploadQuestionsBulk;
