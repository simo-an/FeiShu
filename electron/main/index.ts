import EasyCustomerClient from "./client";
import {isDev} from "./utils/is";
import {join} from "path";

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(__dirname, '../..')
process.env.PUBLIC = isDev ? join(process.env.DIST, '../public') : process.env.DIST


new EasyCustomerClient().createClient()