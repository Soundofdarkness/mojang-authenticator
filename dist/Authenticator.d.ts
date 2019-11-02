import { IAuthenticateResponse, IRefreshResponse } from "./Types";
declare class Authenticator {
    /**
     * Authenticates a user and returns mojangs authenticate response.
     * Use @see Authenticator#refresh if you already obtained an access token before.
     * @param username username
     * @param password password
     * @param clientId? client id - not required
     * @throws if invalid password
     */
    authenticate(username: string, password: string, clientId?: string): Promise<IAuthenticateResponse>;
    /**
     * Refreshes an already existing access token. This is preferred over storing username/password.
     * @param accessToken access Token
     * @param clientToken client ID
     */
    refresh(accessToken: string, clientToken: string): Promise<IRefreshResponse>;
    /**
     * Validates an given access token with client token.
     * See @see {https://wiki.vg/Authentication | Authentication Documentation } for more information
     * @param accessToken access token
     * @param clientToken client ID
     */
    validate(accessToken: string, clientToken: string): Promise<boolean>;
    /**
     * Invalidates all access tokens for a given account.
     * If you just want to invalidate one access token @see Authenticator#invalidate
     * @param username username
     * @param password password
     */
    signOut(username: string, password: string): Promise<boolean>;
    /**
     * Invalidates a specific token for a client ID
     * @param accessToken access token
     * @param clientToken client ID
     */
    invalidate(accessToken: string, clientToken: string): Promise<boolean>;
}
export { Authenticator };
//# sourceMappingURL=Authenticator.d.ts.map