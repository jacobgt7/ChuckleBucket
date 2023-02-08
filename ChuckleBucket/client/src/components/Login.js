import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "../App.css";

export default function Login({ setUserData }) {
    let navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then((userProfile) => {
                const userDataObj = {
                    id: userProfile.id,
                    userRole: userProfile?.userRole?.name
                }
                setUserData(userDataObj)
                navigate("/")
            })
            .catch(() => alert("Login Failed"));
    };

    return (
        <>
            <h1 className="App-brand">Chuckle Bucket</h1>
            <Form onSubmit={loginSubmit} className="side-margins">
                <fieldset>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button>Login</Button>
                    </FormGroup>
                    <em>
                        Not registered? <Link to="register">Register</Link>
                    </em>
                </fieldset>
            </Form>
        </>
    );
}
