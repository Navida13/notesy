import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserDetail from './UserDetail';
import AdminHeader from './AdminHeader';
import UserHeader from '../user/UserHeader';
import Footer from '../common/Footer';

function AllUser() {
  const APIURL = "http://localhost:8080/admin/allUsers";
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get(APIURL);
        console.log(serverResponse.data);
        setUserData(serverResponse.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <AdminHeader />
      <div style={{ padding: "30px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <UserDetail userArray={userdata} />
      </div>
      <Footer/>
    </div>
  );
}

export default AllUser;