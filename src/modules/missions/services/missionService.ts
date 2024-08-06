import axiosInstance from "@/config/axiosConfig";
import {SearchRequest} from "@/modules/missions/types/SearchRequest";

const searchMissions = async (body: SearchRequest) => {
    try {
        return await axiosInstance.post("/search_mission", body);
    } catch (error) {
        console.error(error);
        throw Error("Error searching missions: " + error);
    }
}

const createMission = async (body: any) => {
    try {
        return await axiosInstance.post("/insert_mission", body);
    } catch (error) {
        console.error(error);
        throw Error("Error creating mission: " + error);
    }
}

export default {
    searchMissions,
    createMission,
}