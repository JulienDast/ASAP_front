import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/StaticPages/Home";
import Contact from "./pages/StaticPages/Contact";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import SignUp from "./pages/Auth/SignUp";
import TermsOfService from "./pages/StaticPages/TermsOfService";
import UserProfile from "./pages/MyProfile/UserProfile";
import DeleteProfile from "./pages/MyProfile/DeleteProfile";
import UpdateProfile from "./pages/MyProfile/UpdateProfile";
import NotFoundPage from "./pages/StaticPages/NotFoundPage";
import ArticlesList from "./pages/Articles/ArticlesList";
import MemberProfile from "./pages/Members/MemberProfile";
import MembersList from "./pages/Members/MembersList";
import ArticleView from "./pages/Articles/ArticleView";
import TournamentsList from "./pages/Tournaments/TournamentsList";
import TournamentView from "./pages/Tournaments/TournamentView";
import CreateArticle from "./pages/Articles/CreateArticle";
import UpdateArticle from "./pages/Articles/UpdateArticle";
import CreateTournament from "./pages/Tournaments/CreateTournament";
import UpdateTournament from "./pages/Tournaments/UpdateTournament";
import { useAuth } from "./interceptors/AuthProvider";
import { RoleUser } from "./services/interfaces/UserInterface";

function App() {

  interface PrivateRouteProps {
    children: React.ReactElement;
  }

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
      return <div>Chargement...</div>;
    } 
    return user ? children : <Navigate to="/signin" />;
  };
  
  const PrivateAdminRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user, loading } = useAuth(); 
    if (loading) {
      return <div>Chargement...</div>;
    }
    return user?.role === RoleUser.ADMIN ? children : <Navigate to="/" />;
  };

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
          <Route path="/profil" element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
          <Route path="/profil/delete-profil" element={<PrivateRoute><DeleteProfile/></PrivateRoute>}/>
          <Route path="/profil/update-profil" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
          <Route path="/members" element={<MembersList/>}/>
          <Route path="/members/:id" element={<PrivateRoute><MemberProfile/></PrivateRoute>}/>
          <Route path="/articles" element={<ArticlesList/>}/>
          <Route path="/articles/create" element={<PrivateAdminRoute><CreateArticle/></PrivateAdminRoute>}/>
          <Route path="/articles/:id/update" element={<PrivateAdminRoute><UpdateArticle/></PrivateAdminRoute>}/>
          <Route path="/articles/:id" element={<ArticleView/>}/>
          <Route path="/tournaments" element={<TournamentsList/>}/>
          <Route path="/tournaments/:id" element={<TournamentView/>}/>
          <Route path="/tournaments/create" element={<PrivateAdminRoute><CreateTournament/></PrivateAdminRoute>}/>
          <Route path="/tournaments/:id/update" element={<PrivateAdminRoute><UpdateTournament/></PrivateAdminRoute>}/>
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;