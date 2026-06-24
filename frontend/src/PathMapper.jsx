import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import App from './App.jsx'
import AboutUs from './components/common/AboutUs.jsx'
import ContactUs from './components/common/ContactUs.jsx'
import Login from './components/user/Login.jsx'
import Feedback from './components/user/Feedback.jsx'
import Registration from './components/user/Registration.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import AdminDashBoard from './components/admin/AdminDashBoard.jsx'
import AllContacts from './components/admin/AllContacts.jsx'
import UserDashBoard from './components/user/UserDashBoard.jsx'
import AllUsers from './components/admin/AllUsers.jsx'
import UploadNotes from './components/user/UploadNotes.jsx'
import AllFeedBack from './components/admin/AllFeedBack.jsx'
import AdminEditProfile from './components/admin/AdminEditProfile.jsx'
import UserEditProfile from './components/user/UserEditProfile.jsx'
import ChangePassword from './components/admin/ChangePassword.jsx'
import UserChangePassword from './components/user/UserChangePassword.jsx'
import ProfileUpload from './components/admin/ProfileUpload.jsx'
import UserProfileUpload from './components/user/UserProfileUpload.jsx'
import FetchFeedBack from './components/common/FetchFeedBack.jsx'
import TextSummarizerPage from './components/user/TextSummarizerPage.jsx'
import FetchSummarizedHistory from './components/user/FetchSummarizedHistory.jsx'
import ShareNotes from './components/user/ShareNotes.jsx'
import Help2 from './components/common/Help2.jsx'
import ViewNotes from './components/user/ViewNotes.jsx'
import TextSummarize from './components/user/TextSummarize.jsx'

function PathMapper() {
  return (

        <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<App></App>}></Route>
            <Route path='/about' element={<AboutUs></AboutUs>}></Route>
            <Route path='/contact' element={<ContactUs></ContactUs>}></Route>
            <Route path='/login/user' element={<Login></Login>}></Route>
            <Route path='/userdashboard' element={<UserDashBoard></UserDashBoard>}></Route>
            <Route path='/allUsers' element={<AllUsers></AllUsers>}></Route>
            <Route path='/feedback' element={<Feedback></Feedback>}></Route>
            <Route path='/register/user' element={<Registration></Registration>}></Route>
            <Route path="/login/admin" element={<AdminLogin/>}></Route>
            <Route path="/admindashboard" element={<AdminDashBoard/>}></Route>
            <Route path="/allContacts" element={<AllContacts/>}></Route>
            <Route path="/allFeedBack" element={<AllFeedBack/>}></Route>
            <Route path="/admineditprofile" element={<AdminEditProfile/>}></Route>
            <Route path="/usereditprofile" element={<UserEditProfile/>}></Route>
            <Route path="/login/uploadNotes" element={<UploadNotes/>}></Route>
            <Route path="/changepassword" element={<ChangePassword/>}></Route>
            <Route path="/userchangepassword" element={<UserChangePassword/>}></Route>
            <Route path="/uploadprofile" element={<ProfileUpload/>}></Route>
            <Route path="/useruploadprofile" element={<UserProfileUpload/>}></Route>
            <Route path="/fetchfeedback" element={<FetchFeedBack/>}></Route>
            <Route path="/textsummarizerpage" element={<TextSummarizerPage/>}></Route>
            <Route path="/fetchhistory" element={<FetchSummarizedHistory/>}></Route>
            <Route path="/sharenotes" element={<ShareNotes/>}></Route>
            <Route path="/help" element={<Help2/>}></Route>
            <Route path="/viewnotes" element={<ViewNotes/>}></Route>
            <Route path="/textsummarize" element={<TextSummarize/>}></Route>
        </Routes>
        </BrowserRouter>
        </>

)
}

export default PathMapper