import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "88ad7c9f-6477-4532-a167-db495ec1536b"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                return res.data;
            });
    },
    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`);
    },
    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`);
    },
    auth() {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`);
    },
    userId(userId) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`);
    }
};

