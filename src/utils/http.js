const http = {};
http.get = (url) => {
  return fetch(`http://localhost:8080/api${url}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .catch(err => err)
}
http.post = (url, data) => {
  return fetch(`http://localhost:8080/api${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => ({
    code: 0,
    err
  }))
}

export default http;
