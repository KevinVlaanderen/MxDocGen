import {MendixSdkClient} from "mendixplatformsdk";
import {ClientArguments} from "../index";

export const mendixSdkClientMiddleware = (args: ClientArguments): ClientArguments => {
    args.client = new MendixSdkClient(args.username, args.apikey);
    return args;
};
