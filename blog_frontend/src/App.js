import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./LoginRoutes.css";
import "./UserAccount.css";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import { Spin } from "antd";
import { Navbar } from "./Components/AuthRoutes/Navbar";
import { LandingPage } from "./Pages/NotLoginPages/LandingPage";

let Login = lazy(() => import("./Components/AuthRoutes/Login"));
let Signup = lazy(() => import("./Components/AuthRoutes/Signup"));
let ForgetPassword = lazy(() => import("./Components/AuthRoutes/ForgetPassword"),);
let Profile = lazy(() => import("./Pages/LoginPages/ProfilePage"));
let EditProfile = lazy(() => import("./Pages/LoginPages/EditProfilePage"));
let Dashboard = lazy(() => import("./Pages/LoginPages/DashboardPage"));
let UserAccount = lazy(() => import("./Pages/LoginPages/UserAccountPage"));
let PrivateRoute = lazy(() => import("./Components/LoginComponents/PrivateRoute"));
let About = lazy(() => import("./Pages/NotLoginPages/AboutPage"));
let Support = lazy(() => import("./Pages/NotLoginPages/SupportPage"));
let Download = lazy(() => import("./Pages/NotLoginPages/DownloadPage"));
let Help = lazy(() => import("./Pages/NotLoginPages/HelpPage"));

export const details = createContext();
export const themeContext = createContext();
const colors = {
  dark: {
    // balckground : "black",
    backgroundImage: "linear-gradient(to bottom, #8751f1, #000000)",
    color: "white",
  },
  light: {
    // background : "white",
    backgroundImage: "linear-gradient(to bottom, #8751f1, #ffffff)",
    color: "black",
  },
};

function App() {
  const [theme, setTheme] = useState("light");
  const [isLogin, setIsLogin] = useState(() =>
    Boolean(localStorage.getItem("Token")),
  );
  let loginData = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    Object.assign(document.body.style, colors[theme]);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme, colors }}>
      <details.Provider value={{ isLogin, setIsLogin, loginData }}>
        <div className="App michroma-regular">
          <BrowserRouter>
            <Routes>
              <Route path="" Component={Navbar}>
                <Route path="/" Component={LandingPage}>
                  <Route path="/signup" element={ <Suspense fallback={<Spin size="large" />}>
                                                    <Signup />
                                                  </Suspense>}
                  />
                  <Route path="/" element={ <Suspense fallback={<Spin size="large" />}>
                                              <Login />
                                            </Suspense>}
                  />
                  <Route path="/forgotpassword" element={ <Suspense fallback={<Spin size="large" />}>
                                                            <ForgetPassword />
                                                          </Suspense>}
                  />
                </Route>
                <Route path="/about" Component={About} />
                <Route path="/support" Component={Support} />
                <Route path="/download" Component={Download} />
                <Route path="/help" Component={Help} />
                <Route path="/dashboard" element={<PrivateRoute>
                                                    <Dashboard />
                                                  </PrivateRoute>}
                />
                <Route path="/profile" element={<PrivateRoute>
                                                  <Profile />
                                                </PrivateRoute>}
                />
                <Route path="/editprofile" element={<PrivateRoute>
                                                      <EditProfile />
                                                    </PrivateRoute>}
                />
                <Route path="/useraccount/:userId" element={<PrivateRoute>
                                                              <UserAccount />
                                                            </PrivateRoute> }
                />
              </Route>

              <Route path="*" Component={<h1>PAGE NOT FOUND</h1>} />
            </Routes>
          </BrowserRouter>
        </div>
      </details.Provider>
    </themeContext.Provider>
  );
}

export default App;
