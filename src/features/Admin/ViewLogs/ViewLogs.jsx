import { useSearchParams } from "react-router-dom";
import Heading from "../../../components/UI/Heading";
import { useGetLogFilesUrl } from "./useGetLogFilesUrl";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

import { LuFileJson } from "react-icons/lu";
// import { useGetLogFile } from "./useGetLogFile";
import { MdOutlineFileCopy } from "react-icons/md";
import DownloadLogButton from "./DownloadLogButton";
import { sortDataByDates } from "../../../utils/sortDataByDates";
import Tab from "../../../components/UI/Tab";

const ViewLogs = () => {
  const [searchParams] = useSearchParams();
  // Files url
  const {
    logFilesUrl,
    isLoading: isUrlLoading,
    isError: isUrlError,
  } = useGetLogFilesUrl();
  // File data
  // const {
  //   logFile,
  //   isLoading: isFileLoading,
  //   isError: isFileError,
  // } = useGetLogFile();
  const last = +searchParams.get("last") || 7;
  const [urls, setUrls] = useState();
  const fileUrl = searchParams.get("logfileUrl") || undefined;

  // Back to files
  // const handleBack = () => {
  //   searchParams.delete("logfileUrl");
  //   setSearchParams(searchParams);
  // };

  // Set url of the file to show
  // const handleShowLogFile = (url) => {
  //   searchParams.set("logfileUrl", url);
  //   setSearchParams(searchParams);
  // };

  // Change the urls whenever the filter changes
  useEffect(() => {
    if (!logFilesUrl) return;
    // Sort urls by dates in descending order
    const sortedUrls =
      logFilesUrl &&
      logFilesUrl.sort((a, b) => {
        // Extract date strings using regex
        const dateA = a.match(/(\d{4}-\d{2}-\d{2})/)[0];
        const dateB = b.match(/(\d{4}-\d{2}-\d{2})/)[0];

        // Convert to Date objects
        const timeA = new Date(dateA).getTime();
        const timeB = new Date(dateB).getTime();

        // Sort in ascending order
        return timeA - timeB;
      });
    // function to get date from item
    const extractDate = (date) => date.split("/").at(-1).split(".").at(0);
    setUrls(sortDataByDates(sortedUrls, last, extractDate));
  }, [logFilesUrl, last]);

  return (
    <div className="mx-2 px-1 py-10 sm:px-4 md:px-10 md:py-5">
      <div className="flex flex-wrap items-center gap-3">
        <Heading>View Logs</Heading>
        <div className="ml-auto">
          <Tab
            url
            defaultValue={7}
            tabs={[7, 30, 90]}
            onDeleteValues={["logfileUrl"]}
          />
        </div>
      </div>
      <section className="mt-3 h-[70dvh] overflow-auto rounded-lg border-2 border-primary-300 bg-primary-500  text-primary-100">
        <div className="sticky left-0 top-0 z-50 flex w-full items-center justify-between gap-3 bg-primary-400 py-[2px] pr-3">
          <div className="flex  items-center gap-3 px-3 py-4  capitalize ">
            <MdOutlineFileCopy className="text-[1.4rem]" />
            all files
          </div>
          {/* {fileUrl ? (
            <>
              <div
                className="flex cursor-pointer items-center gap-3 px-3 py-4  capitalize hover:bg-primary-500"
                onClick={handleBack}
              >
                <MdOutlineFileCopy className="text-[1.4rem]" />
                all files
              </div>
              {logFile && <DownloadLogButton fileUrl={fileUrl} />}
            </>
          ) : (
            <div
              className="flex items-center gap-3 px-3 py-4  capitalize "
              onClick={handleBack}
            >
              <MdOutlineFileCopy className="text-[1.4rem]" />
              Log Files
            </div>
          )} */}
        </div>
        {/* Loading indicator */}
        {isUrlLoading && (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner color="white" />
          </div>
        )}
        {/* Error */}
        {isUrlError && (
          <div className="flex h-full items-center justify-center">
            Failed to fetch, Please try again!
          </div>
        )}
        {/* Log files url */}
        {urls && !fileUrl && !isUrlLoading && (
          <ul className="mt-2 flex flex-col gap-2">
            {urls?.map((itm, i) => (
              <li
                className="flex items-center justify-between px-2 text-[1rem] sm:px-8  sm:text-[1.2rem] "
                key={i}
              >
                <a
                  className="flex cursor-pointer items-center gap-3 px-3 py-3 hover:bg-primary-100/10"
                  href={itm}
                  target="__blank"
                  rel="norefferer noopener"
                >
                  <LuFileJson className="text-[1.6rem]" />
                  {itm.split("/").at(-1)}
                </a>
                <DownloadLogButton fileUrl={itm} />
              </li>
            ))}
          </ul>
        )}
        {/* Log file */}
        {/* {fileUrl && !isUrlLoading && !isFileLoading && logFile && (
          <pre className="px-3 py-2 text-[0.8rem]">{logFile}</pre>
        )} */}
      </section>
    </div>
  );
};

export default ViewLogs;
