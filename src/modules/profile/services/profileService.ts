import {axiosUsersApiInstance} from "@/config/axiosConfig";
import {getUserId} from "@/utils/getTokenInformation";

const getProfile = async () => {
    try {
        const requestBody = {
            id_user: getUserId()
        }
        return await axiosUsersApiInstance.post("/get_profile", requestBody);
    } catch (error) {
        console.error(error);
        throw Error("Error getting profile: " + error);
    }
}

const deleteUserProfile = async () => {
    try {
        const sub = getUserId();
        const requestBody = {
            sub,
            id_user: sub,  //id_user es el mismo que sub
        };
        const response = await axiosUsersApiInstance.post("/delete_user_profile", {
        data: requestBody
         });
         
        return response;
    } catch (error) {
        console.error("Error deleting profile: ", error);
        throw new Error("Error deleting profile: " + error);
    }
};

export default {
    getProfile,
    deleteUserProfile
}