import { Link } from "react-router-dom";

const Archive = ({userInfo, articles}) => {
    return (
        <div className="archive">
            <ul className="archive-list">
                {Object.values(articles).map((article, index) => {
                    return (
                    <li key={index}>
                        <Link to = {'/' + userInfo["profile-name"] + '/' + index}>
                            {article["title"]}
                        </Link>
                    </li>)
                })}
            </ul>
        </div>
    );
}

export default Archive;