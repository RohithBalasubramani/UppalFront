import React from "react";

const AI = () => {
  return (
    <div>
      <textarea
        type="text"
        placeholder="Ask our Embedded AI for Advanced Graphs and Smart Analytics..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        class="form-control border-1 small"
        style={{
          width: "100%",
          height: "30vh",
          borderRadius: "8px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          padding: "2vh",
          background: "#f9f9f9",
          marginTop: "-35vh",
        }}
      />
    </div>
  );
};

export default AI;
