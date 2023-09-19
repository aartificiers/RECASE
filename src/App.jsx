import { useEffect, useState } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Routes, Route, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Homepage from './Pages/Common/Homepage/Homepage';
import Aboutpage from './Pages/Common/Aboutpage/Aboutpage';
import Contactpage from './Pages/Common/Contactpage/Contactpage';
import Privacypage from './Pages/Common/Privacypage/Privacypage';
import Termscondition from './Pages/Common/Termscondition/Termscondition';
import Login from './Pages/Admin/Login/Login';
import Layout from './Pages/Admin/Dashboard/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { API } from './Services/Api';
import { addUser } from './Store/Slices/userSlice';
import Customalert from './Components/Customalert/Customalert';
import Pageloader from './Components/Pageloader/Pageloader';

const PrivateRoute = ({ isAdminAuthenticated, children }) => {
  return isAdminAuthenticated ? <>{children}</> : <Navigate replace to={'/admin/login'} />
}

function App() {

  const userinfo = useSelector(state => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const isPageReload = () => {
    const navEntries = window.performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      return navEntries[0].type === 'reload';
    }
    return false;
  };

  useEffect(() => {
    const getCookie = async (navi) => {
      setLoading(true);
      const response = await API.getCookie();
      if (response.isSuccess) {
        setLoading(false);
        if (userinfo.isAuthenticated && isPageReload()) {
          return null;
        }
        dispatch(addUser({ isAuthenticated: true, user: response.data.data }));
        navigate("/admin/dashboard/12345");
      } else {
        dispatch(addUser({ isAuthenticated: false, user: {} }));
        setLoading(false);
      }
    }
    if(userinfo.isAuthenticated && isPageReload()){
      return null;
    }
    
    getCookie();

  }, [])



  useEffect(() => {
    const getCookie = async () => {
      setLoading(true);
      
      const response = await API.getCookie();
      if (response.isSuccess) {
        setLoading(false);
        dispatch(addUser({ isAuthenticated: true, user: response.data.data }));
        navigate(location.pathname);
      } else {
        setLoading(false);
        dispatch(addUser({ isAuthenticated: false, user: {} }));
        setShowAlert(true);
      }
    }
    if (userinfo.isAuthenticated) {
      getCookie();
    }
  }, [location.pathname]);




  return (
    <div className="app">
      

      <ToastContainer position='top-right' autoClose={3000} transition={Flip} hideProgressBar={false} />

      {!userinfo.isAuthenticated ? showAlert && <Customalert data={{ title: "Session Expired", message: "Your Session Is Expired, Please Sign In Again" }} type={"warn"} handleClose={() => { setShowAlert(false); navigate("/admin/login") }} /> : null}

      <Routes>
        <Route path={'/'} element={<Homepage />} />
        <Route path={'/about'} element={<Aboutpage />} />
        <Route path={'/contact'} element={<Contactpage />} />
        <Route path={'/privacy'} element={<Privacypage />} />
        <Route path={'/terms'} element={<Termscondition />} />
        <Route path={'/admin/login'} element={<Login />} />
        <Route path='*' element={<Homepage />} />

        <Route
          path={'admin/dashboard/:id'}
          element={
            <PrivateRoute isAdminAuthenticated={userinfo.isAuthenticated}>
              <Layout />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App
