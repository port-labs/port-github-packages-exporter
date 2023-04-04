const buildPackageEntity = (githubPackage, blueprint) => ({
    identifier: githubPackage.id.toString(),
    title: githubPackage.name,
    blueprint,
    properties: {
        packageType: githubPackage.package_type,
        visibility: githubPackage.visibility,
        createdAt: githubPackage.created_at,
        link: githubPackage.html_url,
        latestVersionTags:
            githubPackage.versions[0]?.metadata?.container?.tags ??
            githubPackage.versions[0]?.metadata?.docker?.tags ??
            githubPackage.versions[0].name,
        latestVersionLink: githubPackage.versions[0].html_url,
        latestVersionCreatedAt: githubPackage.versions[0].created_at
    }
})

export default buildPackageEntity;
