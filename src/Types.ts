export interface IAuthenticatePayload {
    agent: {
        name: string;
        version: number;
    };
    username: string;
    password: string;
    clientToken?: string;
    requestUser?: boolean;
};

export interface IAuthenticateResponse {
    accessToken: string;
    clientToken: string;
    availableProfiles: IAuthenticateProfile[];
    selectedProfile: IAuthenticateProfile;
    user?: any;
};

export interface IAuthenticateProfile {
    agent: string;
    id: string;
    name: string;
    userId: string;
    createdAt: number;
    legacyProfile: boolean;
    suspended: boolean;
    paid: boolean;
}

export interface IRefreshRequest {
    accessToken: string;
    clientToken: string;
    requestUser?: boolean;
}

export interface IRefreshResponse {
    accessToken: string;
    clientToken: string;
    selectedProfile: {
        id: string;
        name: string;
    }
    user?: any;
}

export interface IValidatePayload {
    accessToken: string;
    clientToken: string;
}

export interface ISignoutRequest{
    username: string;
    password: string;
}

export interface IInvalidateRequest {
    accessToken: string;
    clientToken: string;
}