import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';

export const ProfileSettings =({storedUser, token}) => {

    const [username, setUsername] = useState(storedUser.Username);
    const [password, setPassword] = useState(storedUser.Password);
    const [email, setEmail] = useState (storedUser.Email);
    const [birthday, setBirthday] = useState(storedUser.Birthday);
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
                // onChange(result.user, result.token)
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
        <Form onSubmit={handleSubmit}> 
        <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    defaultValue={storedUser.Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                />
        </Form.Group>
        <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    defaultValue={storedUser.Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
        </Form.Group>
        <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    defaultValue={storedUser.Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="birthday"
                    defaultValue={storedUser.Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
        </Form>
        {/* <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Username:</label>
                <input 
                    type='text'
                    name='Username'
                    defaultValue={storedUser.Username}
                    onChange={(e) => setUsername(e.target.value)}
                /> <br/> 
                <label>Password:</label>
                <input 
                    type='password'
                    name='password'
                    defaultValue={storedUser.Password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br/>
                <label>Email:</label>
                <input 
                    type='email'
                    name='email'
                    defaultValue={storedUser.Email}
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
            <button type="submit" variant='primary' onClick={handleSubmit}>Update</button>
        </div> */}
        </>
    )
}