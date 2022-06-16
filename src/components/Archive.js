import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Archive = ({userInfo, articles, mode}) => {
    const [thisClass, setThisClass] = useState({list: null})

    useEffect(()=> {
        if (mode === "archive-main") {
            setThisClass({list: "main-archive-list"})
        }
    }, [mode])

    return (
        <div className="archive" id={mode}>
            {mode ?
                <h2 className="archive-head">Archive</h2> :
                null
            }
            <ul className={"archive-list " + thisClass.list}>
                {Object.values(articles).map((article, index) => {
                    return (
                        <li className="archive-link-item" key={index}>
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