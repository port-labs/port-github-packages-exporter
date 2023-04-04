import axios from "axios";

const getToken = (api_url, clientId, clientSecret) =>
    axios({
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        url: `${api_url}/v1/auth/access_token`,
        data: {
            clientId,
            clientSecret,
        },
    });

export default getToken;
