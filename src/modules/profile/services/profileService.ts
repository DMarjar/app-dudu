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

export default {
    getProfile,
}