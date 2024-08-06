import axiosInstance from "@/config/axiosConfig";
import {SearchRequest} from "@/modules/missions/types/SearchRequest";

const searchMissions = async (body: SearchRequest) => {
    try {
        const response = await axiosInstance.post("/search_mission", body);
        return response.data;
    } catch (error) {
        console.error(error);
        throw Error("Error searching missions: " + error);
    }
}

export default {
    searchMissions,
}