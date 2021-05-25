const api = process.env.REACT_APP_API_URL+"voteme";
const userDetails = (localStorage.userDetails) ? JSON.parse(localStorage.userDetails) : '';
let token = userDetails != '' && userDetails.Data.AuthoToken;

const headers = {
    'Authorization': 'Bearer '+token
}


export const signup = (query) => 
    fetch(`${api}/signup`, { 
        method: 'post',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    .then((res) => res.json())
    .then((result) => result)


export const profile_update = (user_id, query) => 
    fetch(`${api}/${user_id}/profile`, { 
        method: 'post',
        headers: {
            ...headers,
            'cache-control' : 'no-cache',
        },
        body: query
    })
    .then((res) => res.json())
    .then((result) => result)    