import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramList from "./pages/ProgramList";
import AppHead from "./components/AppHead";

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
        </>
    )}

export default App;