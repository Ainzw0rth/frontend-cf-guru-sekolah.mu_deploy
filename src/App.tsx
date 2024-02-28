import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramList from "./pages/ProgramList";

// Components
import AppHead from "./components/AppHead";
import BottomNav from "./components/BottomNav";

const router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/program', element: <ProgramList/>},
    {path: '/program/:id', element: <ProgramDetail/>}
])

const App = () => {
    return (
        <>
            <AppHead/>
            <RouterProvider router={router} />
            <BottomNav/>
        </>
    )}

export default App;