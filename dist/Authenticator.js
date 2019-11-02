"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var v4_1 = __importDefault(require("uuid/v4"));
var API_ROOT = "https://authserver.mojang.com";
var USER_AGENT = "Lumia-Authenticator";
var DEFAULT_OPTIONS = { headers: { "Content-Type": "application/json", "User-Agent": USER_AGENT },
    simple: false, json: true, resolveWithFullResponse: true };
var Authenticator = /** @class */ (function () {
    function Authenticator() {
    }
    /**
     * Authenticates a user and returns mojangs authenticate response.
     * Use @see Authenticator#refresh if you already obtained an access token before.
     * @param username username
     * @param password password
     * @param clientId? client id - not required
     * @throws if invalid password
     */
    Authenticator.prototype.authenticate = function (username, password, clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, clientToken, body, options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = API_ROOT + "/authenticate";
                        clientToken = clientId || v4_1.default();
                        body = { username: username, password: password, clientToken: clientToken, agent: { name: "Minecraft", version: 1 } };
                        options = __assign(__assign({}, DEFAULT_OPTIONS), { body: body });
                        return [4 /*yield*/, request_promise_native_1.default.post(url, options)];
                    case 1:
                        res = _a.sent();
                        if (res.statusCode !== 200) {
                            throw new Error(res.body.errorMessage);
                        }
                        return [2 /*return*/, res.body];
                }
            });
        });
    };
    /**
     * Refreshes an already existing access token. This is preferred over storing username/password.
     * @param accessToken access Token
     * @param clientToken client ID
     */
    Authenticator.prototype.refresh = function (accessToken, clientToken) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = API_ROOT + "/refresh";
                        body = { accessToken: accessToken, clientToken: clientToken };
                        options = __assign(__assign({}, DEFAULT_OPTIONS), { body: body });
                        return [4 /*yield*/, request_promise_native_1.default.post(url, options)];
                    case 1:
                        res = _a.sent();
                        if (res.statusCode !== 200) {
                            throw new Error(res.body.errorMessage);
                        }
                        return [2 /*return*/, res.body];
                }
            });
        });
    };
    /**
     * Validates an given access token with client token.
     * See @see {https://wiki.vg/Authentication | Authentication Documentation } for more information
     * @param accessToken access token
     * @param clientToken client ID
     */
    Authenticator.prototype.validate = function (accessToken, clientToken) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = API_ROOT + "/validate";
                        body = { accessToken: accessToken, clientToken: clientToken };
                        options = __assign(__assign({}, DEFAULT_OPTIONS), { body: body });
                        return [4 /*yield*/, request_promise_native_1.default.post(url, options)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.statusCode === 204];
                }
            });
        });
    };
    /**
     * Invalidates all access tokens for a given account.
     * If you just want to invalidate one access token @see Authenticator#invalidate
     * @param username username
     * @param password password
     */
    Authenticator.prototype.signOut = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = API_ROOT + "/signout";
                        body = { username: username, password: password };
                        options = __assign(__assign({}, DEFAULT_OPTIONS), { body: body });
                        return [4 /*yield*/, request_promise_native_1.default.post(url, options)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.statusCode === 204];
                }
            });
        });
    };
    /**
     * Invalidates a specific token for a client ID
     * @param accessToken access token
     * @param clientToken client ID
     */
    Authenticator.prototype.invalidate = function (accessToken, clientToken) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = API_ROOT + "/invalidate";
                        body = { accessToken: accessToken, clientToken: clientToken };
                        options = __assign(__assign({}, DEFAULT_OPTIONS), { body: body });
                        return [4 /*yield*/, request_promise_native_1.default.post(url, options)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.statusCode === 204];
                }
            });
        });
    };
    return Authenticator;
}());
exports.Authenticator = Authenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BdXRoZW50aWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRkFBK0Q7QUFDL0QsK0NBQTJCO0FBSTNCLElBQU0sUUFBUSxHQUFHLCtCQUErQixDQUFDO0FBQ2pELElBQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDO0FBRXpDLElBQU0sZUFBZSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUU7SUFDMUYsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDO0FBRXBFO0lBQUE7SUFxR0EsQ0FBQztJQW5HRzs7Ozs7OztPQU9HO0lBQ0csb0NBQVksR0FBbEIsVUFBbUIsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLFFBQWlCOzs7Ozs7d0JBQzlELEdBQUcsR0FBRyxRQUFRLEdBQUcsZUFBZSxDQUFDO3dCQUVqQyxXQUFXLEdBQUcsUUFBUSxJQUFJLFlBQUksRUFBRSxDQUFDO3dCQUNqQyxJQUFJLEdBQXlCLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUcsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFFNUcsT0FBTyx5QkFBTyxlQUFlLEdBQUssRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7d0JBRXhCLHFCQUFNLGdDQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQXBELEdBQUcsR0FBaUIsU0FBZ0M7d0JBRTFELElBQUcsR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUM7NEJBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDMUM7d0JBRUQsc0JBQU8sR0FBRyxDQUFDLElBQUksRUFBQzs7OztLQUNuQjtJQUdEOzs7O09BSUc7SUFDRywrQkFBTyxHQUFiLFVBQWMsV0FBbUIsRUFBRSxXQUFtQjs7Ozs7O3dCQUM1QyxHQUFHLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQzt3QkFFNUIsSUFBSSxHQUFHLEVBQUUsV0FBVyxhQUFBLEVBQUUsV0FBVyxhQUFBLEVBQXFCLENBQUM7d0JBRXZELE9BQU8seUJBQU8sZUFBZSxHQUFLLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFBO3dCQUV2QixxQkFBTSxnQ0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUE7O3dCQUFwRCxHQUFHLEdBQWlCLFNBQWdDO3dCQUUxRCxJQUFHLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFDOzRCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQzFDO3dCQUVELHNCQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDbkI7SUFFRDs7Ozs7T0FLRztJQUNHLGdDQUFRLEdBQWQsVUFBZSxXQUFtQixFQUFFLFdBQW1COzs7Ozs7d0JBQzdDLEdBQUcsR0FBRyxRQUFRLEdBQUcsV0FBVyxDQUFDO3dCQUU3QixJQUFJLEdBQUcsRUFBRSxXQUFXLGFBQUEsRUFBRSxXQUFXLGFBQUEsRUFBc0IsQ0FBQzt3QkFFeEQsT0FBTyx5QkFBTyxlQUFlLEdBQU0sRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7d0JBRXpCLHFCQUFNLGdDQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQXBELEdBQUcsR0FBaUIsU0FBZ0M7d0JBRTFELHNCQUFPLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFDOzs7O0tBQ2pDO0lBRUQ7Ozs7O09BS0c7SUFDRywrQkFBTyxHQUFiLFVBQWMsUUFBZ0IsRUFBRSxRQUFnQjs7Ozs7O3dCQUN0QyxHQUFHLEdBQUcsUUFBUSxHQUFHLFVBQVUsQ0FBQzt3QkFFNUIsSUFBSSxHQUFHLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQXFCLENBQUM7d0JBRWpELE9BQU8seUJBQU8sZUFBZSxHQUFLLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFDO3dCQUV4QixxQkFBTSxnQ0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUE7O3dCQUFwRCxHQUFHLEdBQWlCLFNBQWdDO3dCQUUxRCxzQkFBTyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBQzs7OztLQUNqQztJQUVEOzs7O09BSUc7SUFDRyxrQ0FBVSxHQUFoQixVQUFpQixXQUFtQixFQUFFLFdBQW1COzs7Ozs7d0JBQy9DLEdBQUcsR0FBRyxRQUFRLEdBQUcsYUFBYSxDQUFDO3dCQUUvQixJQUFJLEdBQUcsRUFBRSxXQUFXLGFBQUEsRUFBRSxXQUFXLGFBQUEsRUFBd0IsQ0FBQzt3QkFFMUQsT0FBTyx5QkFBTyxlQUFlLEdBQUssRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7d0JBRXhCLHFCQUFNLGdDQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQXBELEdBQUcsR0FBaUIsU0FBZ0M7d0JBRTFELHNCQUFPLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFDOzs7O0tBQ2pDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBckdELElBcUdDO0FBR1Esc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCwgeyBGdWxsUmVzcG9uc2UgfSBmcm9tIFwicmVxdWVzdC1wcm9taXNlLW5hdGl2ZVwiO1xyXG5pbXBvcnQgdXVpZCBmcm9tIFwidXVpZC92NFwiO1xyXG5pbXBvcnQgeyBJQXV0aGVudGljYXRlUmVzcG9uc2UsIElSZWZyZXNoUmVxdWVzdCwgSVJlZnJlc2hSZXNwb25zZSxcclxuICAgIElBdXRoZW50aWNhdGVQYXlsb2FkLCBJVmFsaWRhdGVQYXlsb2FkLCBJSW52YWxpZGF0ZVJlcXVlc3QsIElTaWdub3V0UmVxdWVzdCB9IGZyb20gXCIuL1R5cGVzXCI7XHJcblxyXG5jb25zdCBBUElfUk9PVCA9IFwiaHR0cHM6Ly9hdXRoc2VydmVyLm1vamFuZy5jb21cIjtcclxuY29uc3QgVVNFUl9BR0VOVCA9IFwiTHVtaWEtQXV0aGVudGljYXRvclwiO1xyXG5cclxuY29uc3QgREVGQVVMVF9PUFRJT05TID0geyBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCBcIlVzZXItQWdlbnRcIjogVVNFUl9BR0VOVCB9LFxyXG4gICAgICAgICBzaW1wbGU6IGZhbHNlLCBqc29uOiB0cnVlLCByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSB9O1xyXG5cclxuY2xhc3MgQXV0aGVudGljYXRvciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRoZW50aWNhdGVzIGEgdXNlciBhbmQgcmV0dXJucyBtb2phbmdzIGF1dGhlbnRpY2F0ZSByZXNwb25zZS5cclxuICAgICAqIFVzZSBAc2VlIEF1dGhlbnRpY2F0b3IjcmVmcmVzaCBpZiB5b3UgYWxyZWFkeSBvYnRhaW5lZCBhbiBhY2Nlc3MgdG9rZW4gYmVmb3JlLlxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIHVzZXJuYW1lXHJcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgcGFzc3dvcmRcclxuICAgICAqIEBwYXJhbSBjbGllbnRJZD8gY2xpZW50IGlkIC0gbm90IHJlcXVpcmVkXHJcbiAgICAgKiBAdGhyb3dzIGlmIGludmFsaWQgcGFzc3dvcmRcclxuICAgICAqL1xyXG4gICAgYXN5bmMgYXV0aGVudGljYXRlKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGNsaWVudElkPzogc3RyaW5nKTogUHJvbWlzZTxJQXV0aGVudGljYXRlUmVzcG9uc2U+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSBBUElfUk9PVCArIFwiL2F1dGhlbnRpY2F0ZVwiO1xyXG5cclxuICAgICAgICBjb25zdCBjbGllbnRUb2tlbiA9IGNsaWVudElkIHx8IHV1aWQoKTtcclxuICAgICAgICBjb25zdCBib2R5OiBJQXV0aGVudGljYXRlUGF5bG9hZCA9IHsgdXNlcm5hbWUsIHBhc3N3b3JkLCBjbGllbnRUb2tlbiAsIGFnZW50OiB7IG5hbWU6IFwiTWluZWNyYWZ0XCIsIHZlcnNpb246IDEgfSB9O1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0gey4uLkRFRkFVTFRfT1BUSU9OUywgLi4ueyBib2R5IH19O1xyXG5cclxuICAgICAgICBjb25zdCByZXM6IEZ1bGxSZXNwb25zZSA9IGF3YWl0IHJlcXVlc3QucG9zdCh1cmwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZihyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5ib2R5LmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzLmJvZHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaGVzIGFuIGFscmVhZHkgZXhpc3RpbmcgYWNjZXNzIHRva2VuLiBUaGlzIGlzIHByZWZlcnJlZCBvdmVyIHN0b3JpbmcgdXNlcm5hbWUvcGFzc3dvcmQuXHJcbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gYWNjZXNzIFRva2VuXHJcbiAgICAgKiBAcGFyYW0gY2xpZW50VG9rZW4gY2xpZW50IElEXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHJlZnJlc2goYWNjZXNzVG9rZW46IHN0cmluZywgY2xpZW50VG9rZW46IHN0cmluZyk6IFByb21pc2U8SVJlZnJlc2hSZXNwb25zZT57XHJcbiAgICAgICAgY29uc3QgdXJsID0gQVBJX1JPT1QgKyBcIi9yZWZyZXNoXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB7IGFjY2Vzc1Rva2VuLCBjbGllbnRUb2tlbiB9IGFzIElSZWZyZXNoUmVxdWVzdDtcclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsuLi5ERUZBVUxUX09QVElPTlMsIC4uLnsgYm9keSB9fVxyXG5cclxuICAgICAgICBjb25zdCByZXM6IEZ1bGxSZXNwb25zZSA9IGF3YWl0IHJlcXVlc3QucG9zdCh1cmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLmJvZHkuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXMuYm9keTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlcyBhbiBnaXZlbiBhY2Nlc3MgdG9rZW4gd2l0aCBjbGllbnQgdG9rZW4uXHJcbiAgICAgKiBTZWUgQHNlZSB7aHR0cHM6Ly93aWtpLnZnL0F1dGhlbnRpY2F0aW9uIHwgQXV0aGVudGljYXRpb24gRG9jdW1lbnRhdGlvbiB9IGZvciBtb3JlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gYWNjZXNzIHRva2VuXHJcbiAgICAgKiBAcGFyYW0gY2xpZW50VG9rZW4gY2xpZW50IElEXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHZhbGlkYXRlKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGNsaWVudFRva2VuOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xyXG4gICAgICAgIGNvbnN0IHVybCA9IEFQSV9ST09UICsgXCIvdmFsaWRhdGVcIjtcclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgYWNjZXNzVG9rZW4sIGNsaWVudFRva2VuIH0gYXMgSVZhbGlkYXRlUGF5bG9hZDtcclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsuLi5ERUZBVUxUX09QVElPTlMsIC4uLiB7IGJvZHkgfX07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlczogRnVsbFJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdC5wb3N0KHVybCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzQ29kZSA9PT0gMjA0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52YWxpZGF0ZXMgYWxsIGFjY2VzcyB0b2tlbnMgZm9yIGEgZ2l2ZW4gYWNjb3VudC5cclxuICAgICAqIElmIHlvdSBqdXN0IHdhbnQgdG8gaW52YWxpZGF0ZSBvbmUgYWNjZXNzIHRva2VuIEBzZWUgQXV0aGVudGljYXRvciNpbnZhbGlkYXRlXHJcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgdXNlcm5hbWVcclxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBwYXNzd29yZFxyXG4gICAgICovXHJcbiAgICBhc3luYyBzaWduT3V0KHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSBBUElfUk9PVCArIFwiL3NpZ25vdXRcIjtcclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gYXMgSVNpZ25vdXRSZXF1ZXN0O1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0gey4uLkRFRkFVTFRfT1BUSU9OUywgLi4ueyBib2R5IH19O1xyXG5cclxuICAgICAgICBjb25zdCByZXM6IEZ1bGxSZXNwb25zZSA9IGF3YWl0IHJlcXVlc3QucG9zdCh1cmwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1c0NvZGUgPT09IDIwNDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEludmFsaWRhdGVzIGEgc3BlY2lmaWMgdG9rZW4gZm9yIGEgY2xpZW50IElEXHJcbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gYWNjZXNzIHRva2VuXHJcbiAgICAgKiBAcGFyYW0gY2xpZW50VG9rZW4gY2xpZW50IElEXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGludmFsaWRhdGUoYWNjZXNzVG9rZW46IHN0cmluZywgY2xpZW50VG9rZW46IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IEFQSV9ST09UICsgXCIvaW52YWxpZGF0ZVwiO1xyXG5cclxuICAgICAgICBjb25zdCBib2R5ID0geyBhY2Nlc3NUb2tlbiwgY2xpZW50VG9rZW4gfSBhcyBJSW52YWxpZGF0ZVJlcXVlc3Q7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7Li4uREVGQVVMVF9PUFRJT05TLCAuLi57IGJvZHkgfX07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlczogRnVsbFJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdC5wb3N0KHVybCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzQ29kZSA9PT0gMjA0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgQXV0aGVudGljYXRvciB9OyJdfQ==