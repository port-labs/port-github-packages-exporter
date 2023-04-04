import createOctokitClient from "./github/createOctokitClient.js";
import getToken from "./port/cli/getToken.js";
import listAllPackages from "./github/listPackages.js";
import buildPackageEntity from "./port/buildPackageEntity.js";
import upsertEntity from "./port/cli/upsertEntity.js";

(async () => {
    const {
        GITHUB_TOKEN,
        GITHUB_ORG,
        PORT_API_URL,
        PORT_CLIENT_ID,
        PORT_CLIENT_SECRET,
        PORT_GITHUB_PACKAGES_BLUEPRINT
    } = process.env

    const githubOctokitClient = createOctokitClient(GITHUB_TOKEN)
    const portToken = (await getToken(PORT_API_URL, PORT_CLIENT_ID, PORT_CLIENT_SECRET)).data.accessToken;

    const githubPackages = await listAllPackages(githubOctokitClient, GITHUB_ORG)

    for (const githubPackage of githubPackages) {
        try {
            const currentPackageEntity = buildPackageEntity(githubPackage, PORT_GITHUB_PACKAGES_BLUEPRINT)
            await upsertEntity(currentPackageEntity, portToken, PORT_API_URL);
        } catch (error) {
            console.log(`Error exporting package: ${githubPackage.name}, error: ${error}`)
        }
    }

})();
