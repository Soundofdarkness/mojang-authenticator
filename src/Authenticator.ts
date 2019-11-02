import request, { FullResponse } from "request-promise-native";
import uuid from "uuid/v4";
import { IAuthenticateResponse, IRefreshRequest, IRefreshResponse,
    IAuthenticatePayload, IValidatePayload, IInvalidateRequest, ISignoutRequest } from "./Types";

const API_ROOT = "https://authserver.mojang.com";
const USER_AGENT = "Lumia-Authenticator";

const DEFAULT_OPTIONS = { headers: { "Content-Type": "application/json", "User-Agent": USER_AGENT },
         simple: false, json: true, resolveWithFullResponse: true };

class Authenticator {

    /**
     * Authenticates a user and returns mojangs authenticate response.
     * Use @see Authenticator#refresh if you already obtained an access token before.
     * @param username username
     * @param password password
     * @param clientId? client id - not required
     * @throws if invalid password
     */
    async authenticate(username: string, password: string, clientId?: string): Promise<IAuthenticateResponse> {
        const url = API_ROOT + "/authenticate";

        const clientToken = clientId || uuid();
        const body: IAuthenticatePayload = { username, password, clientToken , agent: { name: "Minecraft", version: 1 } };

        const options = {...DEFAULT_OPTIONS, ...{ body }};

        const res: FullResponse = await request.post(url, options);

        if(res.statusCode !== 200){
            throw new Error(res.body.errorMessage);
        }

        return res.body;
    }


    /**
     * Refreshes an already existing access token. This is preferred over storing username/password.
     * @param accessToken access Token
     * @param clientToken client ID
     */
    async refresh(accessToken: string, clientToken: string): Promise<IRefreshResponse>{
        const url = API_ROOT + "/refresh";

        const body = { accessToken, clientToken } as IRefreshRequest;

        const options = {...DEFAULT_OPTIONS, ...{ body }}

        const res: FullResponse = await request.post(url, options);
        
        if(res.statusCode !== 200){
            throw new Error(res.body.errorMessage);
        }

        return res.body;
    }

    /**
     * Validates an given access token with client token.
     * See @see {https://wiki.vg/Authentication | Authentication Documentation } for more information
     * @param accessToken access token
     * @param clientToken client ID
     */
    async validate(accessToken: string, clientToken: string): Promise<boolean>{
        const url = API_ROOT + "/validate";

        const body = { accessToken, clientToken } as IValidatePayload;

        const options = {...DEFAULT_OPTIONS, ... { body }};

        const res: FullResponse = await request.post(url, options);

        return res.statusCode === 204;
    }

    /**
     * Invalidates all access tokens for a given account.
     * If you just want to invalidate one access token @see Authenticator#invalidate
     * @param username username
     * @param password password
     */
    async signOut(username: string, password: string): Promise<boolean> {
        const url = API_ROOT + "/signout";

        const body = { username, password } as ISignoutRequest;

        const options = {...DEFAULT_OPTIONS, ...{ body }};

        const res: FullResponse = await request.post(url, options);

        return res.statusCode === 204;
    }

    /**
     * Invalidates a specific token for a client ID
     * @param accessToken access token
     * @param clientToken client ID
     */
    async invalidate(accessToken: string, clientToken: string): Promise<boolean> {
        const url = API_ROOT + "/invalidate";

        const body = { accessToken, clientToken } as IInvalidateRequest;

        const options = {...DEFAULT_OPTIONS, ...{ body }};

        const res: FullResponse = await request.post(url, options);

        return res.statusCode === 204;
    }
}


export { Authenticator };