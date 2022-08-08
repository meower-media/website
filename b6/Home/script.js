

function CreatePost(user, time, post, profile_pic) {
  const template = document.createElement("div");

  template.innerHTML = `             <li class="post_changes">
                  <div style=" display: table-row; min-width: 517px; margin: 0 auto;">
                    <div id="top" class="top" style="z-index: 0;   border-radius: 3;
  overflow: hidden; width: ${500 + post.length}"> </div>
                    <div class="svelte-6zv9mh" style="background: None;">
                      <div style="" class="  post-header svelte-1t5kxgf"><button class="pfp svelte-1t5kxgf"><span class="pfp-container svelte-ss20c8"><span class="online svelte-ss20c8"></span> <span class="pfp svelte-ss20c8"><img alt="${user}'s profile picture" title="${user}'s profile picture" src="https://svelte.meower.org/assets/icon_16.e5e55f53.svg" draggable="false" class="svelte-ss20c8" width="auto" height="100%"></span></span></button>

                        <div style="" class="creator svelte-1t5kxgf">
                          <h2 class="creator svelte-1t5kxgf" style="">${user}</h2> <span title="${time}" class="date svelte-190wm28">8/4/2022, 6:31:53 PM</span>

                        </div>
                        <p style=""> ${post} </p>
                      </div>

                    </div>
                  </div>

                </li>
  `.trim();

  return template.firstChild
}


/*
async function GetUserData() {
  var postli = []
  await a=fetch('https://api.meower.org/home?page=1')
    .then((response) => response.json())
    .then(async (data) => {
      var post = null

      for (post in data.index) {

        await a = fetch(`https://api.meower.org/posts?id=${data.index[post]}`)
          .then((response) => response.json())
          .then(async (data) => {
            await fetch(`https://api.meower.org/users/${data.u}`)
              .then((response) => response.json())
              .then((data2) => {

                console.log(data2)

                var Post = CreatePost(data.u, "Time is in your local timezone (UTC+-5). 12-hour time: 8/5/2022, 1:57:54 AM 24-hour time: 8/5/2022, 01:57:54 ISO: 2022-08-05T06:57:54.000Z", data.p, `https://raw.githubusercontent.com/meower-media-co/Meower-Assets/main/PFP/icon_${data2.pfp_data}.svg`)

                postli.prepend(Post);
              })
          })
      }
    });
  return postli
}

for (post in GetUserData()) {
  posts.append(post)
}
*/
function on_ready() {
 const posts = document.getElementById("a")
 fetch('https://api.meower.org/home?page=1')
    .then((response) => response.json())
    .then( (data) => {
      var post = null

      for (post in data.index) {

          a = fetch(`https://api.meower.org/posts?id=${data.index[post]}`)
          .then((response) => response.json())
          .then((data) => {
            fetch(`https://api.meower.org/users/${data.u}`)
              .then((response) => response.json())
              .then((data2) => {

                console.log(data2)
                var Post = CreatePost(data.u, "Time is in your local timezone (UTC+-5). 12-hour time: 8/5/2022, 1:57:54 AM 24-hour time: 8/5/2022, 01:57:54 ISO: 2022-08-05T06:57:54.000Z", data.p, `https://raw.githubusercontent.com/meower-media-co/Meower-Assets/main/PFP/icon_${data2.pfp_data}.svg`)

                
                posts.append(Post);
              })
          })
      }
    });
}


document.onload = on_ready
