import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FetchFeedBackDetails from '../common/FetchFeedBackDetails';
import Footer from './Footer';

function FetchFeedBack() {

    const APIURL="http://localhost:8080/fetchFeedback";
    const [feedbacks,setFeedbacks]=useState([{}]);
    const [name,setName]=useState("");
    useEffect(()=>{
        const fetchFeedback=async()=>{
           try{
             const serverResponse=await axios.get(APIURL);
            setFeedbacks(serverResponse.data);      
            console.log(serverResponse.data);
           }
           catch(err){
            console.log(err);
            
           }
        }
        fetchFeedback();
    },[])
  return (
    <>
    {/* {
        feedbacks.map((feedback)=>{
            return(
                <FetchFeedBackDetails feedbackArray={feedback}/>
            )
        })
    } */}
    <FetchFeedBackDetails feedbackArray={feedbacks} name={name}/>
    <Footer/>
    </>
  )
}

export default FetchFeedBack