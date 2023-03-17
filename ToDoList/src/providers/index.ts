import axios from "axios";

export const Api = axios.create({baseURL: 'http://192.168.100.13:3000/tasks'});