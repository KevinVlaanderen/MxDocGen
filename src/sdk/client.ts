import {MendixSdkClient} from "mendixplatformsdk";

export const createMendixSdkClient = (username: string, apiKey: string) => new MendixSdkClient(username, apiKey);
