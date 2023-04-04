import axios from 'axios';

const upsertEntity = (entity, token, api_url) =>
    axios({
        method: 'post',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        url: `${api_url}/v1/blueprints/${entity.blueprint}/entities?upsert=true&merge=true`,
        data: entity,
    });

export default upsertEntity;
