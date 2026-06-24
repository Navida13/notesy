import React from 'react';

function ContactDetail({ contactArray, deleteById }) {


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
    padding: "20px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "22px",
    letterSpacing: "1px"
  };

  const tableHeaderStyle = {
    background: "#f5f5f5",
    fontWeight: "600",
    color: "#333"
  };

  return (

      <div style={cardStyle}>
        <div style={headerStyle}>
          Contact Details
        </div>

        <div className="table-responsive p-3">
          <table className="table table-hover">
            <thead style={tableHeaderStyle}>
              <tr>
                <th>Serial Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Question</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contactArray.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#777" }}>
                    No contacts found 😢
                  </td>
                </tr>
              ) : (
                contactArray.map((cobj) => (
                  <tr key={cobj.id}>
                    <td>{cobj.id}</td>
                    <td>{cobj.name}</td>
                    <td>{cobj.email}</td>
                    <td>{cobj.phone}</td>
                    <td>{cobj.question}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteById(cobj.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}

export default ContactDetail;