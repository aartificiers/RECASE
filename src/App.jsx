import { useCallback, useEffect, useState } from 'react';
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
import Jodipage from './Pages/Common/Jodipage/Jodipage';
import Panelpage from './Pages/Common/Panelpage/Panelpage';


// const hasRequiredRole = (user, requiredRole) => {
//   return user && user.role === requiredRole;
// };

// const PrivateRoute = ({ isAdminAuthenticated, requiredRole, children }) => {
//   const userinfo = useSelector(state => state.user);

//   if (!isAdminAuthenticated) {
//     return <Navigate replace to={'/admin/login'} />;
//   }

//   if (requiredRole && !hasRequiredRole(userinfo.user, requiredRole)) {
//     return <Navigate replace to={'/admin/dashboard/games'} />;
//   }

//   return <>{children}</>;
// };

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
  const [route, setRoute] = useState('/');

  const handleChange = useCallback((newRoute) => {
    setRoute(newRoute);
  }, []);


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
        navigate('/admin/dashboard/dash');
      } else {
        dispatch(addUser({ isAuthenticated: false, user: {} }));
        setLoading(false);
      }
    }
    if (userinfo.isAuthenticated && isPageReload()) {
      return undefined;
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

      <Routes >
        <Route key={"homesd"} path={'/'} element={<Homepage />} />
        <Route key={"about"} path={'/about'} element={<Aboutpage />} />
        <Route key={"contactsd"} path={'/contact'} element={<Contactpage />} />
        <Route key={"priv"} path={'/privacy'} element={<Privacypage />} />
        <Route key={"terms"} path={'/terms'} element={<Termscondition />} />
        <Route key={"log"} path={'/admin/login'} element={<Login />} />
        <Route key={"admin"} path={'/admin'} element={<Login />} />
        <Route key={"jodi"} path={'/home/jodi/:id'} element={<Jodipage />} />
        <Route key={"panel"} path={'/home/panel/:id'} element={<Panelpage />} />


        <Route
          path={'admin/dashboard/:page'}
          key={"adminDash"}
          element={
            <PrivateRoute isAdminAuthenticated={userinfo.isAuthenticated}>
              <Layout />
            </PrivateRoute>
          }
        />
        <Route
          path={'admin/dashboard/:page/:id'}
          key={"adminjodipannel"}
          element={
            <PrivateRoute isAdminAuthenticated={userinfo.isAuthenticated}>
              <Layout />
            </PrivateRoute>
          }
        />
        <Route key={"all"} path='*' element={<Homepage />} />
        <Route key={"adminall"} path='admin/dashboard/*' element={<Login />} />

      </Routes>
    </div>
  )
}

export default App
