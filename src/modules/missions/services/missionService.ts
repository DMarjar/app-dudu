import axios from "axios";
import {Mission} from "@/modules/missions/types/Mission";
import {SearchRequest} from "@/modules/missions/types/SearchRequest";

const searchMissions = async (body: SearchRequest) => {
    try {
        const response = await axios.post("https://iza19c120k.execute-api.us-east-2.amazonaws.com/Prod/search_mission", body);
        return response.data;
    } catch (error) {
        console.error(error);
        throw Error("Error searching missions: " + error);
    }
}

export default {
    searchMissions,
}