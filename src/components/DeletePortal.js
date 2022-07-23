import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';

const DeletePortal = ({userInfo, toDelete, setToDelete}) => {
    const [message, setMessage] = useState("")
    const nav = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log(userInfo)

        try {
            let token = localStorage.getItem('user')

            let res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"] + "/delete", {
                
                method: "DELETE",
                body: JSON.stringify({ userId: userInfo._id }),
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });

            let resJson = await res.json();

            if (res.status === 200) {
                nav('/');
            } else {
                console.log(res)
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    if (!toDelete) return null
    return ReactDOM.createPortal(
        <form onSubmit={handleDelete} className="confirmDelete" action="" method="DELETE">
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="delete-user-prompt">
                Are you sure you want to delete your account?
            </div>
            <button onClick={handleDelete}>Confirm</button>
            <button onClick={() => setToDelete(false)}>Cancel</button>
        </form>,
        document.getElementById('user-delete-modal')
    )
}

export default DeletePortal


