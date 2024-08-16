import Table from "../../../components/UI/Table";
import { useState } from "react";
import Button from "../../../components/UI/Button";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

const TABLE_HEAD = ["Image", "User Name", "Name", "Email", "View", "Status"];
const ITEMS_PER_PAGE = 10;

const DisplayUsers = ({ users, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users?.length / ITEMS_PER_PAGE);
  const page = (currentPage - 1) * 10;

  let displayUsers;
  if (users) {
    displayUsers =
      users.length < ITEMS_PER_PAGE
        ? users
        : users?.slice(page, currentPage * ITEMS_PER_PAGE);
  }
  return (
    <section className="mx-auto max-h-[80dvh] w-full min-w-[300px] overflow-hidden rounded-lg border-2 border-gray-400">
      <div className="max-h-[70dvh] w-full overflow-auto">
        <Table className="border-2">
          <Table.Head>
            <Table.Row className="border-2 bg-gray-300 text-start">
              {TABLE_HEAD.map((head) => (
                <th key={head} className="w-max p-2">
                  {head}
                </th>
              ))}
            </Table.Row>
          </Table.Head>
          {users && (
            <Table.Body>
              {users &&
                displayUsers?.map((user) => (
                  <Table.Row
                    className="border-2 border-gray-300 text-center "
                    key={user.username}
                  >
                    <Table.Data className="items-center">
                      <div className="flex h-[1.5rem] w-[1.5rem] justify-center overflow-hidden rounded-full">
                        <img
                          src={user?.image ?? "/demo-img.jpg"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Table.Data>
                    <Table.Data>{user.username}</Table.Data>
                    <Table.Data>{user.Name}</Table.Data>
                    <Table.Data>{user.email}</Table.Data>
                    <Table.Data>
                      <Button
                        link={true}
                        variant="underline"
                        to={`user/${user.username}`}
                      >
                        View
                      </Button>
                    </Table.Data>
                    <Table.Data>Active</Table.Data>
                  </Table.Row>
                ))}
            </Table.Body>
          )}
        </Table>
      </div>
      {/* Loading spinner */}
      {isLoading && (
        <div className="my-20 flex justify-center font-[500]">
          <LoadingSpinner />
        </div>
      )}
      {/* No result message */}
      {!isLoading && users && !users.length && (
        <div className="my-20 flex justify-center font-[500]">
          No users were found!
        </div>
      )}

      {/* Pagination */}
      <div className="flex w-full items-center justify-between bg-gray-300 px-3 py-4">
        <div>Current Page: {currentPage}</div>
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
          Total Pages: <span className="font-[500]">{totalPages || 0}</span>
        </div>
      </div>
    </section>
  );
};

export default DisplayUsers;
