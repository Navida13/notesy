import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedBackDetails from './FeedBackDetails';
import AdminHeader from './AdminHeader';
import Footer from '../common/Footer';

function AllFeedBack() {
  const APIURL = "http://localhost:8080/admin/allFeedBack";
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get(APIURL);
        console.log(serverResponse.data);
        setFeedbackData(serverResponse.data); // update feedback data state
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(); // call fetch function
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <AdminHeader />

      <div style={{ padding: "30px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <FeedBackDetails feedbackArray={feedbackData} />
      </div>
      <Footer/>
    </div>
  );
}

export default AllFeedBack;