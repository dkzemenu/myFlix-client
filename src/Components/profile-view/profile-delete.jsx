import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const ProfileDelete = ({ storedUser, token }) => {
const [confirmPassword, setConfirmPassword] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`https://movieapi-lcrt.onrender.com/users/${storedUser}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
        })
        .then(
            alert ('Delete Successful'),
            console.log('Delete Successful'),
                localStorage.setItem("user", null),
                localStorage.setItem("token", null),
                // window.location.reload()
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