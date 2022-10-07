import axios from "axios";

export const entriesApi = axios.create({
	baseURL: "/api",
});
