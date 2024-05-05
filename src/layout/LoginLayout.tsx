import AppHead from "../components/AppHead"

const LoginLayout = ({children} : {children: React.ReactNode}) => {
    return (
    <>
        <div className="flex justify-center">
            <AppHead />
        </div>
        <div className="max-w-screen-sm mx-auto h-full">
            {children}
        </div>
    </>
    )
}

export default LoginLayout;