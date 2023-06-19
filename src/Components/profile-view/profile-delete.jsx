import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const ProfileDelete = ({ storedUser, token }) => {
    const [username, setUsername] = useState(storedUser.Username);
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch(`https://movieapi-lcrt.onrender.com/users/${storedUser.Username}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify(data)
        })
        .then ((response) => response.json())
        .then((data) => 
            { 
            alert ('Delete Successful');
            console.log('Delete Successful');
                setUser(null);
                localStorage.setItem("user", null);
                localStorage.setItem("token", null);
        })  
        .catch((err) => {
            alert ('Something went wrong');
            console.error(err);
        }) 
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
        <Button variant="primary" type="submit" >DELETE</Button>
        </Form>
    )
}