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

export const give_vote = (query) => 
    fetch(`${api}/givevote`, { 
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

export const get_comments = (queryId, query) => 
    fetch(`${api}/${queryId}/getComments?${query}`, { 
        method: 'get',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((result) => result)

export const give_comment = (queryId, query) => 
    fetch(`${api}/${queryId}/createComments`, { 
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

export const give_comments_reply = (queryId, commentId, reply) => 
    fetch(`${api}/${queryId}/comment/${commentId}/reply`, { 
        method: 'post',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reply)
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
    
export const comment_likeordislike = (query, query_id, comment_id) => 
    fetch(`${api}/${query_id}/comment/${comment_id}/likeordislike/`, { 
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

export const visit_query = (query) => 
    fetch(`${api}/comment/likeordislike/`, { 
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
    
// {
    
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', `${api}/${query_id}/comment/${comment_id}/likeordislike/`);
//     xhr.setRequestHeader("Accept", "application/json");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.setRequestHeader("Authorization", "Bearer "+token);
//     xhr.send(JSON.stringify(query));

// }




    
