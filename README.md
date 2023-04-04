# port-github-packages-exporter

## Setup

### Port

Create the following `package` blueprint, using the following definition:

```json
{
  "identifier": "package",
  "description": "This blueprint represents a GitHub package in our software catalog",
  "title": "Package",
  "icon": "Package",
  "schema": {
    "properties": {
      "packageType": {
        "type": "string",
        "title": "Package Type",
        "enum": [
          "npm",
          "maven",
          "rubygems",
          "docker",
          "nuget",
          "container"
        ]
      },
      "visibility": {
        "type": "string",
        "title": "Visibility",
        "enum": [
          "public",
          "private",
          "internal"
        ]
      },
      "createdAt": {
        "type": "string",
        "title": "Created At",
        "format": "date-time"
      },
      "link": {
        "type": "string",
        "title": "Link",
        "format": "url"
      },
      "latestVersionTags": {
        "title": "Latest Version Tags",
        "type": "array"
      },
      "latestVersionCreatedAt": {
        "type": "string",
        "title": "Latest Version Created At",
        "format": "date-time"
      },
      "latestVersionLink": {
        "title": "Latest Version Link",
        "type": "string",
        "format": "url"
      }
    },
    "required": []
  },
  "mirrorProperties": {},
  "calculationProperties": {},
  "relations": {}
}
```

### CircleCI

* Set up a `github-port` [CircleCI context](https://circleci.com/docs/contexts/) with the following environment variables:

  - PORT_CLIENT_ID
  - PORT_CLIENT_SECRET
  - GITHUB_TOKEN (with `read:packages` scope)

* Set up a CircleCI project based on a copy of this repository.
