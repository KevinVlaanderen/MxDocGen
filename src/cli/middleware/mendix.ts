import {GlobalArguments} from "../cli";
import {createMendixSdkClient} from "../../index";

export const mendixSdkClientMiddleware = (args: GlobalArguments) => {
    args.client = createMendixSdkClient(args.username, args.apikey);
    return args;
};
