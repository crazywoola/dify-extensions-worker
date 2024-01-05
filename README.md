# Dify Extension Workers

> Simplicity is the ultimate sophistication. - Leonardo da Vinci

![img](./assets/simplicity.png)
## Description

### What is this repository for?

This is designed to use [API-based Extension](https://docs.dify.ai/advanced/extension/api_based_extension) in [Dify](https://dify.ai/).

It includes the following features to make sure your application is secure and reliable.

- [x] Bearer token authentication
- [x] Schema validation
- [x] Deploy to [Cloudflare Workers](https://workers.cloudflare.com/)

### Tools used

- [Hono](https://hono.dev/) - Fast, Lightweight, Web-standards, Runs on any JavaScript runtime.
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference.

## Usage

### Development

You can run the following commands to start the development server.

Open this page in browser http://localhost:8787 to see the result. If you would like to have swagger ui to test the API, please follow [this](https://github.com/honojs/middleware/tree/main/packages/swagger-ui) instruction.

```
npm install
npm run dev
```

### Deployment

You should be able to access the workers.dev domain after deploying to Cloudflare Workers.

```
npm run deploy
```

## License

[MIT](./LICENSE.md)