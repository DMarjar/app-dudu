export type Profile = {
    id_user: string;
    username?: string;
    gender: string;
    level: number;
    current_xp: number;
    xp_limit: number;
    wizard_title?: string;
    unlock_level?: number;
    completed_missions: number;
    canceled_missions: number;
    failed_missions: number;
    id_reward?: number;
}