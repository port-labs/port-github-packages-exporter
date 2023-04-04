import {Octokit} from "@octokit/rest";

const createOctokitClient = (token) =>
    new Octokit({
        auth: token,
    });

export default createOctokitClient;
