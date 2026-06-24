import React from 'react';

function UserDetail({ userArray }) {
  const cardStyle = {
    marginTop:"70px",
    borderRadius: "15px",
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    overflow: "hidden",
  };

  const headerStyle = {
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    color: "white",
    padding: "20px 30px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "24px",
    letterSpacing: "1px",
  };

  const tableHeaderStyle = {
    background: "#f8f9fa",
    fontWeight: "600",
    color: "#555",
  };

  return (
    <div>
      <div style={cardStyle}>
        <div style={headerStyle}>User Details</div>

        <div className="table-responsive p-4">
          <table className="table table-hover align-middle">
            <thead style={tableHeaderStyle}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {userArray.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No users found 😢
                  </td>
                </tr>
              ) : (
                userArray.map((uobj) => (
                  <tr key={uobj.email}>
                    <td>{uobj.name}</td>
                    <td>{uobj.email}</td>
                    <td>{uobj.phone}</td>
                    <td>{uobj.city}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;