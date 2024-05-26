import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { isLoggedIn } from "./utils/authUtils";

// Pages
import HomePage from "./pages/HomePage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import ProgramListPage from "./pages/ProgramListPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import LoginPage from "./pages/LoginPage";
import ActivityPage from "./pages/ActivityPage";
import DashboardListPage from "./pages/DashboardListPage";
import DashboardPage from "./pages/DashboardPage";
import PendingPage from "./pages/PendingPage";

// Components
import RootLayout from "./layout/RootLayout";
import LoginLayout from "./layout/LoginLayout";

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
            {path: '/activity/:id', element: <ActivityPage/>},
            {path: '/dashboard', element: <DashboardListPage/>},
            {path: '/dashboard/:id', element: <DashboardPage/>},
            {path: '/pending-task', element: <PendingPage/>},
            {path: '/pending_task', element: <PendingPage/>}
        ]
    },
])

const App = () => {
    return (
        <>
        {
            isLoggedIn() 
                ? 
            <RouterProvider router={router} />
                : 
            <LoginLayout>
                <LoginPage />
            </LoginLayout>
        }        
        </>
    )}

export default App;