import React, { useState } from "react";

const FormHandlingExample = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    setSubmittedData(formData);
  };

  return (
    <>
      <div>
        <h2>Contact Form </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label> Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label> Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label> Message:</label>
            <textarea
              type="text"
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            >
              {" "}
            </textarea>
          </div>
          <button type="submit">Submit</button>
        </form>

        {submittedData ? (
          <div>
            <h3> Submitted Data </h3>
            <p> Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
            <p>Message: {submittedData.message}</p>
          </div>
        ) : (
          <>No Data</>
        )}
      </div>
    </>
  );
};

export default FormHandlingExample;
