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
        document.getElementById(type).textContent = `Posts: ${i}`;
      }
      if (type == "users") {
        document.getElementById(type).textContent = `Users: ${i}`;
      }
      if (type == "chats") {
        document.getElementById(type).textContent = `Chats: ${i}`;
      }
      addLoop(amt, i, type)
    }
  }, 500)
}

function getStats() {
  getFetch("https://api.meower.org/statistics").then((results) => {
    json = results;

    if (document.getElementById("posts").textContent == "Posts: fetching...") {
      document.getElementById("posts").textContent = `Posts: ${json.posts}`;
      document.getElementById("users").textContent = `Users: ${json.users}`;
      document.getElementById("chats").textContent = `Chats: ${json.chats}`;
    }
    else {
      addLoop(json.posts, parseInt(document.getElementById("posts").textContent.split("Posts: ")[1], 10), "posts");
      addLoop(json.users, parseInt(document.getElementById("users").textContent.split("Users: ")[1], 10), "users");
      addLoop(json.chats, parseInt(document.getElementById("chats").textContent.split("Chats: ")[1], 10), "chats");
    }
    setTimeout(getStats, 2000)
  })
}

getStats()
