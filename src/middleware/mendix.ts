import {MendixSdkClient} from "mendixplatformsdk";
import {GlobalArguments} from "../cli";

export const mendixSdkClientMiddleware = (args: GlobalArguments): GlobalArguments => {
    args.client = new MendixSdkClient(args.username, args.apikey);
    return args;
};
