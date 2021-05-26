const api = process.env.REACT_APP_API_URL+"voteme";
const userDetails = (localStorage.userDetails) ? JSON.parse(localStorage.userDetails) : '';
let token = userDetails != '' && userDetails.Data.AuthoToken;

const headers = {
    'Authorization': 'Bearer '+token
}

export const categories_list = () => 
    fetch(`${api}/category`, { 
        method: 'get',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((result) => result)

export const create_poll = (query) =>
    fetch(`${api}/createpoll`, {
        method: 'post',
        headers: {
            ...headers,
        },
        body: query
    })
    .then((res) => res.json())
    .then((result) => result)


export const edit_query = (id, query) =>
    fetch(`${api}/editquery/${id}`, {
        method: 'put',
        headers: {
            ...headers,
        },
        body: query
    })
    .then((res) => res.json())
    .then((result) => result)

export const update_user_category = (query) => 
    fetch(`${api}/updateusercategory`, { 
        method: 'put',
        headers: {
            ...headers,
            'cache-control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    .then((res) => res.json())
    .then((result) => result)

export const get_query = (query) => 
    fetch(`${api}/query?${query}`, { 
        method: 'get',
        headers: {
            ...headers,
            'Accept': 'application/json,  text/plain, */*',
            'Content-Type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((result) => result)


export const get_query_by_id = (id) => 
    fetch(`${api}/querydetail/${id}`, { 
        method: 'get',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((result) => result)    

export const get_my_query = (query) => 
    fetch(`${api}/myquery?${query}`, { 
        method: 'get',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((result) => result)
    
export const likeordislike = (query, query_id) => 
    fetch(`${api}/${query_id}/likeordislike`, { 
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
    
