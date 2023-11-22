function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getFetch(url) { // https://www.johnlivingston.io/blog/aync-await-fetch
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
      }
    })
    .then(json => json)
    .catch(error => {
      return error
    })
}

let json;

function getStats() {
  getFetch("https://api.meower.org/statistics").then((results) => {
    json = results;

    document.getElementById("posts").setAttribute("data-value", json.posts);
    document.getElementById("users").setAttribute("data-value", json.users);
    document.getElementById("chats").setAttribute("data-value", json.chats);
    setTimeout(getStats, 2000)
  })
}

getStats()
