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

const cancelMission = async (body: any) => {
    try {
        return await axiosInstance.put("/cancel_mission", body);
    } catch (error) {
        console.error(error);
        throw Error("Error canceling mission: " + error);
    }
}

const completeMission = async (body: any) => {
    try {
        return await axiosInstance.put("/complete_mission", body);
    } catch (error) {
        console.error(error);
        throw Error("Error completing mission: " + error);
    }
}

export default {
    searchMissions,
    createMission,
    cancelMission,
    completeMission
}