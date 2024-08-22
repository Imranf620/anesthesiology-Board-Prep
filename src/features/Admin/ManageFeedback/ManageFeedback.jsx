import { useGetFeedback } from "../ManageFeedback/useGetFeedback.js";
import { useDeleteFeedback } from "./useDeleteFeedback.js";
import Heading from "../../../components/UI/Heading";
import Button from "../../../components/UI/Button.jsx";
import Table from "../../../components/UI/Table"; // Adjust the import path as needed
import LoadingSpinner from "../../../components/UI/LoadingSpinner.jsx";
import { useGetUsers } from "../ManageUsers/useGetUsers.js";


const ManageFeedback = () => {
  const { feedback, isLoading, isError } = useGetFeedback();
  const { users } = useGetUsers();
  console.log("users", users)


  const FeedBack = feedback?.Feedback;
  console.log(FeedBack)
  const deleteFeedbackMutation = useDeleteFeedback(); // Use the delete mutation hook

  const handleDelete = (id) => {
    deleteFeedbackMutation.mutate(id); // Call mutate function with id
  };

  if (isLoading) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }

  if (isError) {
    return <p>Error loading feedback. Please try again.</p>;
  }

  return (
    <div className="px-3 py-5 md:px-10">
      <div className="flex items-center justify-between">
        <Heading>Manage Feedback</Heading>
        {/* Add any buttons or controls needed */}
      </div>

      {FeedBack?.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Data>ID</Table.Data>
              <Table.Data>User ID</Table.Data>
              <Table.Data>Question ID</Table.Data>
              <Table.Data>Feedback</Table.Data>
              <Table.Data>Date</Table.Data>
              <Table.Data>Actions</Table.Data> {/* New Actions column */}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {FeedBack?.map((fb) => (
              <Table.Row key={fb.id}>
                <Table.Data>{fb.id}</Table.Data>
                <Table.Data>{fb.userID}</Table.Data>
                <Table.Data>{fb.questionID}</Table.Data>
                <Table.Data>{fb.feedback}</Table.Data>
                <Table.Data>{fb.date}</Table.Data>
                <Table.Data>
                  <Button
                    variant="danger"
                    className="bg-red-600 rounded text-white px-2 py-1"
                    onClick={() => handleDelete(fb.id)} // Add delete functionality
                  >
                    Delete
                  </Button>
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default ManageFeedback;
