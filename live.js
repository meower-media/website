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

function addLoop(amt, index, type) {
  setTimeout(() => {
    let i = index;
    i++;
    if (i <= amt) {
      if (type == "posts") {
        document.getElementById(type).setAttribute("data-value", i);
      }
      if (type == "users") {
        document.getElementById(type).setAttribute("data-value", i);
      }
      if (type == "chats") {
        document.getElementById(type).setAttribute("data-value", i);
      }
      addLoop(amt, i, type)
    }
  }, 500)
}

function getStats() {
  getFetch("https://api.meower.org/statistics").then((results) => {
    json = results;

    if (document.getElementById("posts").getAttribute("data-value") == "fetching...") {
      document.getElementById("posts").setAttribute("data-value", json.posts);
      document.getElementById("users").setAttribute("data-value", json.users);
      document.getElementById("chats").setAttribute("data-value", json.chats);
    }
    else {
      addLoop(json.posts, parseInt(document.getElementById("posts").getAttribute("data-value"), 10), "posts");
      addLoop(json.users, parseInt(document.getElementById("users").getAttribute("data-value"), 10), "users");
      addLoop(json.chats, parseInt(document.getElementById("chats").getAttribute("data-value"), 10), "chats");
    }
    setTimeout(getStats, 2000)
  })
}

getStats()
