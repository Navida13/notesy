import React from 'react';

function FeedBackDetails({ feedbackArray }) {

  const cardStyle = {
    marginTop: "70px",
    borderRadius: "15px",
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    overflow: "hidden",
  };

  const headerStyle = {
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    color: "white",
    padding: "20px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "22px",
    letterSpacing: "1px",
  };

  const tableHeaderStyle = {
    background: "#f5f5f5",
    fontWeight: "600",
    color: "#333",
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div style={{ width: "95%", maxWidth: "1200px" }}>
        <div style={cardStyle}>
          <div style={headerStyle}>Feedback Details</div>

          <div className="table-responsive p-3">
            <table className="table table-hover align-middle">
              <thead style={tableHeaderStyle}>
                <tr>
                  <th>Serial No.</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {feedbackArray.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#777" }}>
                      No feedback found 😢
                    </td>
                  </tr>
                ) : (
                  feedbackArray.map((fobj, index) => (
                    <tr key={fobj.email}>
                      <td>{index + 1}</td>
                      <td>{fobj.email}</td>
                      <td>{fobj.rating}</td>
                      <td>{fobj.review}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBackDetails;