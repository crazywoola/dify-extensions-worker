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

```bash
npm install
npm run dev
```

### Deployment

You should be able to access the workers.dev domain after deploying to Cloudflare Workers.

```
npm run deploy
```

### In Dify Console

### Example

```
name: <your-extension-name>
api_endpoint: https://<your-subdomain>.workers.dev/endpoint
api_key: <your-token> <this is set in the wrangler.toml> 
```

#### Example send to Endpoint

This is an example of sending a check request to the endpoint.

```json
{
    "point": "ping",
}
```

This is an example of sending a query request to the endpoint.
```json
{
    "point": "app.external_data_tool.query",
    "params": {
        "app_id": "61248ab4-1125-45be-ae32-0ce91334d021",
        "tool_variable": "breaking_bad_quotes",
        "inputs": {
            "count": 5
        },
        "query": "Display the quotes in markdown quote"
    }
}
```
## License

[MIT](./LICENSE.md)