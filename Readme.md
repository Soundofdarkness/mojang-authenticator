# Mojang Authenticator
![npm (scoped)](https://img.shields.io/npm/v/@lumia/mojang-authenticator?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@lumia/mojang-authenticator?style=for-the-badge)
## Installation

```
npm install @lumia/mojang-authenticator
```

## Usage Example

```ts
import { Authenticator } from "@lumia/mojang-authenticator"

(async () => {
    const auth = new Authenticator();
    const res = await auth.authenticate("your-username", "your-password");
    console.log(res);
})();

```

## License

[MIT License](/License)