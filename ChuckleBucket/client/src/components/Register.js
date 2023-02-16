import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { login, register } from "../modules/authManager";
import "./forms.css";
import { getAllDisplayNames } from "../modules/userProfileManager";

export default function Register({ setUserData }) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstNameInvalid, setFirstNameInvalid] = useState(false);
    const [lastNameInvalid, setLastNameInvalid] = useState(false);
    const [displayNameInvalid, setDisplayNameInvalid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [allDisplayNames, setAllDisplayNames] = useState([]);

    useEffect(() => {
        getAllDisplayNames()
            .then(displayNamesData => {
                setAllDisplayNames(displayNamesData);
            })
    }, [])

    const validEmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const registerClick = (e) => {
        e.preventDefault();
        if (firstName?.trim().length === 0) {
            setFirstNameInvalid(true);
        } else if (lastName?.trim().length === 0) {
            setLastNameInvalid(true);
        } else if (displayName?.trim().lenth === 0 || displayName === allDisplayNames.find(dn => dn === displayName)) {
            setDisplayNameInvalid(true);
        } else if (!validEmailRegex.test(email)) {
            setEmailInvalid(true);
        } else if (password?.trim().length < 8) {
            setPasswordInvalid(true);
        } else if (password && password !== confirmPassword) {
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
            <h1 className="margin-bottom page-top">New User Registration</h1>
            <Form onSubmit={registerClick} className="side-margins">
                <fieldset>
                    <FormGroup className="form-group">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            autoFocus
                            invalid={firstNameInvalid}
                            onChange={(e) => {
                                setFirstNameInvalid(false)
                                setFirstName(e.target.value)
                            }}
                        />
                        <FormFeedback>Cannot be empty</FormFeedback>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            autoFocus
                            invalid={lastNameInvalid}
                            onChange={(e) => {
                                setLastNameInvalid(false)
                                setLastName(e.target.value)
                            }}
                        />
                        <FormFeedback>Cannot be empty</FormFeedback>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                            id="displayName"
                            type="text"
                            invalid={displayNameInvalid}
                            autoFocus
                            onChange={(e) => {
                                setDisplayNameInvalid(false)
                                setDisplayName(e.target.value)
                            }}
                        />
                        <FormFeedback>Display name already taken! Try another.</FormFeedback>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            invalid={emailInvalid}
                            onChange={(e) => {
                                setEmailInvalid(false)
                                setEmail(e.target.value)
                            }}
                        />
                        <FormFeedback>Must be a valid email address.</FormFeedback>
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
                            invalid={passwordInvalid}
                            onChange={(e) => {
                                setPasswordInvalid(false)
                                setPassword(e.target.value)
                            }}
                        />
                        <FormFeedback>Must be at least 8 characters long.</FormFeedback>
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
