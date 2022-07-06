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
                console.log(res.body)
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
            <main className="compose-page">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />

                <form onSubmit={handleSubmit} className={"composeForm " + theme.main} action="" method="POST">
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                    <div className="compose-subcontainer compose-title">
                        <label className="compose-label" htmlFor="title">Title:</label>
                        <input className="compose-title-input" value={title} type="text" htmlFor="title" name="title" onChange={(e) => setTitle(e.target.value)}></input>
                    </div>

                    <div className="compose-subcontainer compose-date">
                        <label className="compose-label" htmlFor="date">Date:</label>
                        <input className="compose-title-input" value={date} type="text" htmlFor="date" name="date" onChange={(e) => setDate(e.target.value)}></input>
                    </div>

                    <div className="compose-subcontainer compose-img">
                        <label className="compose-label" htmlFor="img">Image:</label>
                        <input className="compose-title-input" value={img} type="text" htmlFor="img" name="img" onChange={(e) => setImg(e.target.value)}></input>
                    </div>

                    <div className="compose-subcontainer compose-img-desc">
                        <label className="compose-label" htmlFor="imgDesc">Image Caption:</label>
                        <input className="compose-title-input" value={imgDesc} type="text" htmlFor="imgDesc" name="imgDesc" onChange={(e) => setImgDesc(e.target.value)}></input>
                    </div>

                    <div className="compose-subcontainer compose-body">
                        <label className="compose-label" htmlFor="content">Content:</label>
                        <textarea className="compose-content-input" type="text" value={content} name="content" htmlFor="content" rows="25" onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>

                    <div className="compose-subcontainer compose-options">
                        <button type="submit" className="submit-btn">Submit</button>
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