import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";

const ProfileImage = ({profileData}) => {
    return (
        profileData?.image
        ?<img src={profileData.image.url} alt="Uploaded"/>
        :  <FontAwesomeIcon icon={fortawesome.faUserLarge} />
    );
}
export default ProfileImage;