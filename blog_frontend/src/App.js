import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './LoginRoutes.css';
import './UserAccount.css';
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Home } from './Components/AuthRoutes/Home';
import { FrontPage } from './Components/AuthRoutes/FrontPage';


let Login=lazy(() => import('./Components/AuthRoutes/Login'));
let Signup=lazy(() => import('./Components/AuthRoutes/Signup'));
let Profile=lazy(() => import('./Components/LoginRoutes/Profile'));
let Dashboard=lazy(() => import('./Components/LoginRoutes/Dashboard'));
let UserAccount=lazy(() => import('./Components/LoginRoutes/UserAccount'));
let PrivateRoute=lazy(() => import('./Components/LoginRoutes/PrivateRoute'));


export const details=createContext();
export const themeContext=createContext();
const colors={
    dark: {
        background : "black",
        color : "white",
    },
    light: {
        background : "white",
        color : "black",
    }
}


function App() {
    const [theme,setTheme]=useState("light");
    const [isLogin,setIsLogin]=useState(() => Boolean(localStorage.getItem("Token")));
    let loginData=JSON.parse(localStorage.getItem("User"));
    
    useEffect(() => {
        Object.assign(document.body.style,colors[theme]);
    },[theme]);
  
    return (
    <themeContext.Provider value={{theme,setTheme,colors}}>   
    <details.Provider value={{isLogin,setIsLogin,loginData}}>
        <div className="App michroma-regular">
            <BrowserRouter>
                <Routes>
                    <Route path='' Component={Home}>
                        <Route path='/' Component={FrontPage}>
                            <Route path='/signup' element={ <Suspense fallback={<Spin size="large" />}>
                                                                <Signup />
                                                            </Suspense> }/>
                            <Route path='/' element={   <Suspense fallback={<Spin size="large" />}>
                                                            <Login />
                                                        </Suspense> }/>
                        </Route>
                        <Route path='/dashboard' element={  <PrivateRoute>
                                                                <Dashboard />
                                                            </PrivateRoute> } />
                        <Route path='/profile' element={    <PrivateRoute>
                                                                <Profile />
                                                            </PrivateRoute> } />
                        <Route path='/useraccount/:userId' element={    <PrivateRoute>
                                                                            <UserAccount />
                                                                        </PrivateRoute> } />
                                                    
                    </Route>
                               
                    <Route path='*' Component={<h1>PAGE NOT FOUND</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    </details.Provider>
    </themeContext.Provider> 
  );
}

export default App;
