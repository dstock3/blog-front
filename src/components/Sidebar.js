import Profile from './profile'
import Archive from './archive'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Profile />
            <Archive />
        </div>
    );
}

export default Sidebar;