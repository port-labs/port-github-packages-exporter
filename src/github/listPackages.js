const paginatePackage = async (octokit, org, packageType) =>
    octokit.paginate(
        octokit.rest.packages.listPackagesForOrganization,
        {
            org,
            package_type: packageType,
        },
        (response) => response.data);

const paginatePackageVersion = async (octokit, org, packageType, packageName) =>
    octokit.paginate(
        octokit.rest.packages.getAllPackageVersionsForPackageOwnedByOrg,
        {
            org,
            package_type: packageType,
            package_name: packageName,
            state: 'active',
            per_page: 100,
        },
        (response) =>
            response.data.filter(
                (packageVer) =>
                    (packageVer?.metadata?.container?.tags ?? [0]).length > 0 &&
                    ((packageVer?.metadata?.docker?.tags) ?? [0]).length > 0
            )
    );

const listAllPackages = async (octokit, org, packageTypes = ['npm', 'maven', 'rubygems', 'docker', 'nuget', 'container']) => {
    const resources = await Promise.all(
        packageTypes.map(async (packageType) =>
            (
                await Promise.all(
                    (
                        await paginatePackage(octokit, org, packageType)
                    ).map(async (githubPackage) => ({
                        ...githubPackage,
                        versions: await paginatePackageVersion(octokit, org, packageType, githubPackage.name)
                    })),
                )
            ).flat(),
        ),
    );

    return resources.flat();
}


export default listAllPackages;
