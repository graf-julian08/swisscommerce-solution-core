import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function getPublishableKey({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const apiKeyService = container.resolve(Modules.API_KEY);

    const apiKeys = await apiKeyService.listApiKeys({ title: "Webshop" });

    if (apiKeys.length > 0) {
        // The token is actually in the 'token' field for verify, but for public use we use the token.
        // Wait, for Publishable Keys, the 'token' property IS the key usually starting with pk_.
        logger.info(`PUBLISHABLE_KEY=${apiKeys[0].token}`);
    } else {
        logger.info("No 'Webshop' key found.");
    }
}
