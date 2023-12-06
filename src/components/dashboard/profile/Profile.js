import { useDispatch } from "react-redux";
import { logout } from "../../login/AuthSlice";


export const Profile = () => {
    const dispatch = useDispatch();

    const onLogout = ()=> {
        dispatch(logout());
    }
    return (
        <div>
            <button className="border-2 hover:bg-accent hover:text-white border-accent rounded-full py-2 px-6 " onClick={onLogout}>Log out</button>
        </div>
    )
}