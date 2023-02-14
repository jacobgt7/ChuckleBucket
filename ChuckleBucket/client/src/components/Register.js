import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { login, register } from "../modules/authManager";
import "./forms.css";

export default function Register({ setUserData }) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [displayName, setDisplayName] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, displayName, email, imageLocation };
            register(userProfile, password).then(() => {
                login(email, password)
                    .then((userProfile) => {
                        const userDataObj = {
                            id: userProfile.id,
                            userRole: userProfile?.userRole?.name
                        }
                        setUserData(userDataObj)
                        navigate("/")
                    })
            });
        }
    };

    return (
        <>
            <h1 className="margin-bottom">New User Registration</h1>
            <Form onSubmit={registerClick} className="side-margins">
                <fieldset>
                    <FormGroup className="form-group">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            autoFocus
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            autoFocus
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                            id="displayName"
                            type="text"
                            autoFocus
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="imageLocation">Profile Picture URL</Label>
                        <Input
                            id="imageLocation"
                            type="text"
                            onChange={(e) => setImageLocation(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button>Register</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </>
    );
}
