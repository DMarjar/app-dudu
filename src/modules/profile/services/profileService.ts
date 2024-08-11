import { getUserId } from '@/utils/getTokenInformation';
import axios, { AxiosError } from 'axios';

const isAxiosError = (error: unknown): error is AxiosError => {
    return (error as AxiosError).isAxiosError !== undefined;
};

const getUserDetails = async () => {
    const token = localStorage.getItem('id_token');
    const userId = getUserId();
    if (!token || !userId) return null;

    try {
        console.log('Sending request with:', {
            url: 'https://3tpdypq2mc.execute-api.us-east-2.amazonaws.com/Prod/get_profile/',
            token,
            userId,
        });

        const response = await axios.post(
            'https://3tpdypq2mc.execute-api.us-east-2.amazonaws.com/Prod/get_profile/',
            { id_user: userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
    
        );

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error fetching user details:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                config: error.config,
            });
        } else {
            console.error("An unexpected error occurred:", error);
        }
        return null;
    }
};

export { getUserDetails };
