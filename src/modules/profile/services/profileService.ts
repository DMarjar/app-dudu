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


const deleteUserProfile = async (body:any) => {
    try {
        return await axiosUsersApiInstance.post("/delete_user_profile", body)
    } catch (error) {
        console.error("Error deleting profile: ", error);
        throw new Error("Error deleting profile: " + error);
    }
}

const updateProfile = async (body: any) => {
    try {
        return await axiosUsersApiInstance.put("/update_profile", body);
    } catch (error) {
        console.error(error);
        throw Error("Error updating profile: " + error);
    }
}

export default {
    getProfile,
    deleteUserProfile,
    updateProfile
}