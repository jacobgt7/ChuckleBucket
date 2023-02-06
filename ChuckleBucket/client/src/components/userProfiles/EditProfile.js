import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { getAllDisplayNames, getUserById, updateUser } from "../../modules/userProfileManager";


const EditProfile = ({ userData }) => {
    const [displayName, setDisplayName] = useState("");
    const [initialDisplayName, setInitialDisplayName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [displayNameInvalid, setDisplayNameInvalid] = useState(false);
    const [allDisplayNames, setAllDisplayNames] = useState([]);
    const [firstNameInvalid, setFirstNameInvalid] = useState(false);
    const [lastNameInvalid, setLastNameInvalid] = useState(false);


    const navigate = useNavigate();

    const getUserProfile = () => {
        getUserById(userData.id)
            .then(userProfileData => {
                setDisplayName(userProfileData.displayName);
                setInitialDisplayName(userProfileData.displayName);
                setFirstName(userProfileData.firstName);
                setLastName(userProfileData.lastName);
                if (userProfileData.imageLocation) {
                    setImageLocation(userProfileData.imageLocation);
                }
            });
    }

    const getDisplayNames = () => {
        getAllDisplayNames()
            .then(displayNamesData => {
                setAllDisplayNames(displayNamesData)
            })
    }

    useEffect(() => {
        getUserProfile();
        getDisplayNames();
    }, [])

    const handleDisplayNameInput = (event) => {
        setDisplayNameInvalid(false);
        setDisplayName(event.target.value);
    }

    const handleFirstNameInput = (event) => {
        setFirstNameInvalid(false);
        setFirstName(event.target.value);
    }

    const handleLastNameInput = (event) => {
        setLastNameInvalid(false);
        setLastName(event.target.value);
    }

    const handleImageLocationInput = (event) => {
        setImageLocation(event.target.value);
    }

    const handleSave = (event) => {
        event.preventDefault()

        const mathcingDisplayName = allDisplayNames.find(dn => dn === displayName && dn !== initialDisplayName);
        if (mathcingDisplayName) {
            setDisplayNameInvalid(true);
            return null;
        }

        if (firstName.trim().length === 0) {
            setFirstNameInvalid(true);
            return null;
        }

        if (lastName.trim().length === 0) {
            setLastNameInvalid(true);
            return null;
        }

        updateUser(userData.id, {
            id: userData.id,
            displayName: displayName,
            firstName: firstName,
            lastName: lastName,
            imageLocation: imageLocation
        }).then(() => {
            navigate("/profile");
        })
    }

    return (
        <>
            <h1>Edit Profile</h1>
            <Form>
                <FormGroup>
                    <Label for="displayNameInput">Display Name</Label>
                    <Input id="displayNameInput"
                        name="displayName"
                        value={displayName}
                        invalid={displayNameInvalid}
                        onChange={handleDisplayNameInput}></Input>
                    <FormFeedback>Display name already taken. Try Another.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="firstNameInput">First Name</Label>
                    <Input id="firstNameInput"
                        name="firstName"
                        value={firstName}
                        invalid={firstNameInvalid}
                        onChange={handleFirstNameInput}></Input>
                    <FormFeedback>Must have a first name.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="lastNameInput">Last Name</Label>
                    <Input id="lastNameInput"
                        name="lastName"
                        value={lastName}
                        invalid={lastNameInvalid}
                        onChange={handleLastNameInput}></Input>
                    <FormFeedback>Must have a last name.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="imageLocationInput">Profile Image Url</Label>
                    <Input id="imageLocationInput"
                        name="imageLocation"
                        value={imageLocation}
                        onChange={handleImageLocationInput}></Input>
                </FormGroup>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={() => { navigate("/profile") }}>Cancel</Button>
            </Form>
        </>
    )
}

export default EditProfile;