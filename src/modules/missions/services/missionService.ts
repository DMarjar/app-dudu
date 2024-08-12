import {axiosMissionApiInstance} from "@/config/axiosConfig";
import {SearchRequest} from "@/modules/missions/types/SearchRequest";

const searchMissions = async (body: SearchRequest) => {
    try {
        return await axiosMissionApiInstance.post("/search_mission", body);
    } catch (error) {
        console.error(error);
        throw Error("Error searching missions: " + error);
    }
}

const createMission = async (body: any) => {
    try {
        return await axiosMissionApiInstance.post("/insert_mission", body);
    } catch (error) {
        console.error(error);
        throw Error("Error creating mission: " + error);
    }
}

const cancelMission = async (body: any) => {
    try {
        return await axiosMissionApiInstance.put("/cancel_mission", body);
    } catch (error) {
        console.error(error);
        throw Error("Error canceling mission: " + error);
    }
}

const completeMission = async (body: any) => {
    try {
        return await axiosMissionApiInstance.put("/complete_mission", body);
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