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
                {articles.length === 0 ?
                    <div>You currently haven't composed any articles.</div> :
                    Object.values(articles).map((article, index) => {
                        return (
                            <li className="archive-link-item" key={index}>
                                <Link to={'/' + userInfo["profileName"] + '/' + article._id} state={ article._id }>
                                        {article["title"]}
                                </Link>
                            </li>)
                    })
                }
                
            </ul>
        </div>
    );
}

export default Archive;