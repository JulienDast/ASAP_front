import { Route, Routes } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/StaticPages/Home";
import Contact from "./pages/StaticPages/Contact";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SignUp from "./pages/Auth/SignUp";
import TermsOfService from "./services/utils/TermsOfService";
import UserProfile from "./pages/MyProfile/UserProfile";
import DeleteProfile from "./pages/MyProfile/DeleteProfile";
import UpdateProfile from "./pages/MyProfile/UpdateProfile";
import NotFoundPage from "./services/utils/NotFoundPage";
import ArticlesList from "./pages/Articles/ArticlesList";
import MemberProfile from "./pages/Members/MemberProfile";
import MembersList from "./pages/Members/MembersList";
import ArticleView from "./pages/Articles/ArticleView";

function App() {
  return (
    <div className="bg-appBackground">
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signin/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/cgu" element={<TermsOfService/>}/>
          <Route path="/profil" element={<UserProfile/>}/>
          <Route path="/profil/delete-profil" element={<DeleteProfile/>}/>
          <Route path="/profil/update-profil" element={<UpdateProfile/>}/>
          <Route path="/members" element={<MembersList/>}/>
          <Route path="/members/:id" element={<MemberProfile/>}/>
          <Route path="/articles" element={<ArticlesList/>}/>
          <Route path="/articles/:id" element={<ArticleView/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;