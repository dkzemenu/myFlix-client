import React from 'react';
import {useState} from 'react';

export const ProfileSettings =({storedUser}) => {

    const [username, setUsername] = useState(storedUser.Username);
    const [password, setPassword] = useState(storedUser.Password);
    const [email, setEmail] = useState (storedUser.email);
    const [birthday, setBirthday] = useState(storedUser.birthday);
    const handleSubmit = (event) => {
        event.preventDefault();

        const data ={
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://movieapi-lcrt.onrender.com/users/${storedUser.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
        }).then((res) => (res.json())
        ).then((result) => {
            if (result.Username) {
                alert ("Success")
                localStorage.setItem("user", null)
                localStorage.setItem("token", null)
                onChanging (result.user, result.token)
            } 
        }).catch((err) => {
            if (!username) {
                alert("Enter a new username")
            } else {
                alert("Something went wrong" + err)
            };
            if (!password) {
                alert("Enter a new password")
            } else {
                alert("Something went wrong" + err)
            };
            if (!email) {
                alert("Enter a new email")
            } else {
                alert("Something went wrong" + err)
            };
            if (!birthday) {
                alert("Enter a new birthday")
            } else {
                alert("Something went wrong" + err)
            }
        })
     };
     return(
        <>
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Username:</label>
                <input 
                    type='text'
                    name='Username'
                    defaultValue={storedUser.Username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input 
                    type='password'
                    name='password'
                    defaultValue={storedUser.Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Email:</label>
                <input 
                    type='email'
                    name='email'
                    defaultValue={storedUser.email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Birthday:</label>
                <input 
                    type='date'
                    name='birthday'
                    defaultValue={storedUser.Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </form>
            <button type="submit" variant='primary'>Update</button>
        </div>
        </>
    )
}