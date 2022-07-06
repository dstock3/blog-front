import Prompt from './Prompt';
import Sidebar from './Sidebar';
import '../style/compose.css'
import { useState } from 'react';

const Compose = ({userInfo, articles, theme}) => {
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [imgDesc, setImgDesc] = useState("")
    const [date, setDate] = useState("")
    const [content, setContent] = useState("")
    const [message, setMessage] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await fetch('https://stormy-waters-34046.herokuapp.com/article/compose', {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    img: img,
                    imgDesc: imgDesc,
                    date: date,
                    content: content
                })
            })

            let resJson = await res.json();

            if (res.status === 200) {
                setTitle("")
                setImg("")
                setImgDesc("")
                setDate("")
                setContent("")
                setMessage("Article created successfully");
            } else {
                setMessage("Some error occurred")
            }
        } catch(err) {
            console.log(err);
        }
    }

    if (userInfo) {
        return (
            <main className={"compose-page " }>
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />

                <form className={"composeForm " + theme.main} action="" method="POST">
                    <div className="compose-subcontainer compose-title">
                        <label className="compose-label" for="title">Title:</label>
                        <input className="compose-title-input" type="text" for="title"></input>
                    </div>

                    <div className="compose-subcontainer compose-body">
                        <label className="compose-label"for="content">Content:</label>
                        <textarea className="compose-content-input" type="text" for="content" rows="25"></textarea>
                    </div>

                    <div className="compose-subcontainer compose-options">
                        <button className="submit-btn">Submit</button>
                    </div>
                </form>
            </main>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default Compose;