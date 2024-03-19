import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import ProgramListPage from "./pages/ProgramListPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/LoginPage";
import ActivityPage from "./pages/ActivityPage";

// Components
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <RootLayout/>,
        children: [
            {path: '/', element: <HomePage/>},
            {path: '/program', element: <ProgramListPage/>},
            {path: '/program/:id', element: <ProgramDetailPage/>},
            {path: '/profile', element: <ProfilePage/>},
            {path: '/login', element: <LoginPage/>},
            {path: '/schedule', element: <SchedulePage/>},
            {path: '/activity/:id', element: <ActivityPage/>}
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