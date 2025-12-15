import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function checkProducts({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const productModuleService = container.resolve(Modules.PRODUCT);

    const [products, count] = await productModuleService.listAndCountProducts({});

    logger.info(`Found ${count} products in the database.`);
    products.forEach(p => {
        logger.info(`- ${p.title} (${p.id})`);
    });
}
