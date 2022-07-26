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
            let token = localStorage.getItem('user');

            let res
            if (img) {
                res = await fetch('https://stormy-waters-34046.herokuapp.com/article/compose', {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        img: img,
                        imgDesc: imgDesc,
                        date: date,
                        content: content
                    }),
                    headers: { 'Content-Type': 'application/json', "login-token" : token }
                })

            } else {
                res = await fetch('https://stormy-waters-34046.herokuapp.com/article/compose', {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        date: date,
                        content: content
                    }),
                    headers: { 'Content-Type': 'application/json', "login-token" : token }
                })
            }
            
            let resJson = await res.json();

            if (res.status === 200) {
                console.log(resJson)
                setTitle("")
                setImg("")
                setImgDesc("")
                setDate("")
                setContent("")
                setMessage("Article created successfully");
            } else {
                console.log(res)
                setMessage("Some error occurred")
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    if (userInfo) {
        return (
            <main className="compose-page">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />

                <form onSubmit={handleSubmit} className={"composeForm " + theme} action="" method="POST" encType="multipart/form-data">
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                    <div className="compose-subcontainer compose-title">
                        <label className="compose-label" htmlFor="title">Title:</label>
                        <input className="compose-title-input" value={title} type="text" htmlFor="title" name="title" onChange={(e) => setTitle(e.target.value)}></input>
                    </div>

                    <div className="compose-subcontainer compose-img">
                        <label className="upload-img-label" htmlFor="img">Image:</label>
                        <input className="upload-img-input" type="file" value={img} htmlFor="img" name="img" onChange={(e) => setImg(e.target.files[0])}></input>

                        <label className="compose-label" htmlFor="imgDesc">Image Caption (if applicable):</label>
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