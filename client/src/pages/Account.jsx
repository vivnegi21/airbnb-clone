import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav.jsx';

const AccountLayout = () => {
    return (
        <div>
            <AccountNav />
            <Outlet/>
        </div>
    )
}

export default AccountLayout