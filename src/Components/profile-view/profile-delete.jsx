import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const ProfileDelete = ({ user, token, storedToken }) => {
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(storedToken);

        fetch(`https://movieapi-lcrt.onrender.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${storedToken}`},
            body: JSON.stringify({password: confirmPassword})
        })
        .then(
            alert ('Delete Successful'),
            console.log('Delete Successful'),
                localStorage.setItem("user", null),
                localStorage.setItem("token", null),
                window.location.reload()
    )  
        .catch((err) => {
            alert ('Something went wrong');
            console.error(err);
        }) 
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </Form.Group>
        <Button variant="primary" type="submit" >DELETE</Button>
        </Form>
    )
}