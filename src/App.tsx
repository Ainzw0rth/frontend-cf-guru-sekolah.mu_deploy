import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramList from "./pages/ProgramList";
import Profile from "./pages/Profile";

// Components
import RootLayout from "./layout/RootLayout";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <RootLayout/>,
        children: [
            {path: '/', element: <Home/>},
            {path: '/program', element: <ProgramList/>},
            {path: '/program/:id', element: <ProgramDetail/>},
            {path: '/profile', element: <Profile/>},
            {path: '/login', element: <Login/>}
            
        ]
    },
])

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )}

export default App;