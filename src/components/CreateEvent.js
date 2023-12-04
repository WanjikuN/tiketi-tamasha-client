import React, { useState } from "react";
import { NotificationManager } from "react-notifications";

const CreateEvent = ({ currentUser }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingPrices, setBookingPrices] = useState("");
  const [availableTickets, setAvailableTickets] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [errors, setErrors] = useState([]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const event = {
      eventName,
      description,
      tags,
      location,
      startTime,
      endTime,
      bookingPrices,
      availableTickets,
      eventImage,
    };

    // Perform validation
    const validationErrors = validateForm(event);

    if (validationErrors.length) {
      setErrors(validationErrors);
      validationErrors.forEach((err) =>
        NotificationManager.error(err, "Error", 5000)
      );
    } else {
      // Submit the event to your backend or wherever you're handling events
      // You can call an API function here or dispatch an action if you're using Redux
      console.log("Event submitted:", event);
      // Reset the form after successful submission
      resetForm();
    }
  };

  const validateForm = (event) => {
    const errors = [];

    // Add your validation logic here
    // For example, you can check if required fields are filled, if dates are valid, etc.

    if (!event.eventName) {
      errors.push("Event name is required");
    }

    // Add more validation checks for other fields

    return errors;
  };

  const resetForm = () => {
    // Reset all form fields to their initial state
    setEventName("");
    setDescription("");
    setTags("");
    setLocation("");
    setStartTime("");
    setEndTime("");
    setBookingPrices("");
    setAvailableTickets("");
    setEventImage("");
    setErrors([]);
  };

  return (
    <div className="flex items-center justify-center">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-3/5 mt-12">
        {/* Form inputs */}
        {/* ... */}
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onFormSubmit}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default CreateEvent;
