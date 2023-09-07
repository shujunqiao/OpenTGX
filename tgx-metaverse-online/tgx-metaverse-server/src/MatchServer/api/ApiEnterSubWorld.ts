import { ApiCall } from "tsrpc";
import { ReqEnterSubWorld, ResEnterSubWorld } from "../../shared/protocols/matchServer/PtlEnterSubWorld";
import { UserDB } from "../UserDB";
import { matchServer } from "../../matchServer";
import { TokenUtils } from "../../TokenUtils";

export async function ApiEnterSubWorld(call: ApiCall<ReqEnterSubWorld, ResEnterSubWorld>) {
    let req = call.req;
    let info = UserDB.getUserInfoByToken(req.token);
    if (!info) {
        call.error('INVALID_TOKEN');
        return;
    }

    let worldServers = matchServer.getPublicSubWorldServers(req.subWorldId);
    if (!worldServers || !worldServers.length) {
        call.error('OUT_OF_SERVICE');
        return;
    }

    let uid = info.uid;
    let url = worldServers[0].url;
    let time = Math.floor(Date.now() / 1000);

    let token = TokenUtils.genWorldServerLoginToken(uid, url, time);

    UserDB.updateUserData(info.token,{subWorldId:req.subWorldId});

    call.succ({ worldServerUrl: url, token: token, time: time });
}