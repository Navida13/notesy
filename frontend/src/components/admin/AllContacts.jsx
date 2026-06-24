import React from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useState,useEffect } from 'react'
import ContactDetail from './ContactDetail';
import Footer from '../common/Footer';

function AllContacts() {
    const APIURL="http://localhost:8080/admin/allContacts";
    const [contactdata,setContactData]=useState([{}])

    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                const serverRespone=await axios.get(APIURL)
                console.log(serverRespone.data);
                setContactData(serverRespone.data);//update the contact data state variable
                
            }
            catch(error){
                console.log(error);
                
            }
        }
        fetchData();//function calling
    },[])//useEffect close
    //function for delete contact
    const deleteContact=async (id)=>{
        // alert(id);
    const DELETEAPIURL=`http://localhost:8080/admin/deleteContact/${id}`;
        try{
            const serverResponse=await axios.delete(DELETEAPIURL);
            console.log(serverResponse.data);

            const updatedArray=contactdata.filter((cobj)=>{
                return cobj.id!=id;
            })
            setContactData(updatedArray)//modify state variable value
        }
        catch(err){
            console.log(err);
            
        }
    }//deleteContact function close

  return (
    <>
   
    <div style={{minHeight: "100vh", backgroundColor: "#f0f2f5"}}>
 <AdminHeader/>
    <div style={{ padding: "30px 20px", maxWidth: "1200px", margin: "0 auto" }}>

    
    <ContactDetail contactArray={contactdata}
        deleteById={deleteContact}
    /></div></div>
    {/* string "" */}
    <Footer/>
    </>
  )
}

export default AllContacts