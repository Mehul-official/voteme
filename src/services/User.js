const api = process.env.REACT_APP_API_URL+"voteme";
let token = localStorage.token;

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const signup = (query) => 
    fetch(`${api}/signup`, { 
        method: 'post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    .then((res) => res.json())
    .then((result) => result)