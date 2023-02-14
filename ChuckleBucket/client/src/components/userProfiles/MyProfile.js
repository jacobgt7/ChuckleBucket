import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getUserById } from "../../modules/userProfileManager";
import "./userProfiles.css";


const MyProfile = ({ userData }) => {
    const [userProfile, setUserProfile] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(userData.id)
            .then(profileData => {
                setUserProfile(profileData);
            })
    }, [userData])

    return (
        <>
            <h1 className="page-top margin-bottom">My Profile</h1>
            <div className="myProfileContainer side-margins">
                <img className="profileImg" src={userProfile.imageLocation ? userProfile.imageLocation
                    : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
                    alt="Profile picture"></img>
                <Table>
                    <tbody className="profileInfoTable">
                        <tr className="underline">
                            <th>Display Name:</th>
                            <td>{userProfile.displayName}</td>
                        </tr>
                        <tr className="underline">
                            <th>Full Name:</th>
                            <td>{`${userProfile.firstName} ${userProfile.lastName}`}</td>
                        </tr>
                        <tr className="underline">
                            <th>Email:</th>
                            <td>{userProfile.email}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button className="margin-bottom"
                    onClick={() => { navigate("/profile/edit") }}>Edit</Button>
            </div>
        </>
    )
}

export default MyProfile;