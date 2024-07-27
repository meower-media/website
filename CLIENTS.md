# Featured Client Requirements
Authored by: ShowierData9978 <contact@showierdata.xyz> on 4/18/24 (CT).

## Terms/Definitions

- Us/We - The Meower team

## Rules
- Clients created for malicious intent will not be featured
- If your client implements any kind of plugin/addon interface, any plugins that are featured (or in the repo) are considered to be part of the client.
- The Meower Team may, at it's sole discretion, choose whether or not a client should be featured
- The Meower Team may feature a client despite not complying with this RFC

## Guidelines

### Design Practices

- Cache chat and post data
- Use Cloudlink to get updates to cached information
- You should use the latest version of the API

### Vulnerabilities

If your client is discovered to have a vulnerability, you must fix said vulnerability as soon as possible, alert your client's users (if necessary), and have it removed from the list of featured clients if it won't be fixed in a reasonable amount of time.


### Feature Parity
To be featured, your client must have at least these features. 

- Sending, editing, and deleting posts
- Updating chats when `update_chat` is sent (or similar in the case of updates) 
- User profiles
	- Quotes
- Profile picture support
- Post/user reporting
- Chats:
    - Chat creation
    - Chat member management
- Logging in
- Signing up
- Home page
- Settings
	 - Quote
 	- Typing indicator
- Post reactions
- Post replies
- Profile pictures
- Searching users
- Searching posts
- Blocking users
- Typing indicator support that users must be able to disable
- CommonMark support 
- Image host whitelist, can be disabled by the user (with a warning before disabling)
    
    Current list of allowed image hosts:
    - https://meower.org/
    - https://http.meower.org/
    - https://assets.meower.org/
    - https://forums.meower.org/
    - https://go.meower.org/  
    - https://hedgedoc.meower.org/
    - https://docs.meower.org/
    - https://uploads.meower.org/ 
    - https://u.cubeupload.com/
    - https://cubeupload.com/
    - https://i.ibb.co/
    - https://media.tenor.com/
    - https://tenor.com/
    - https://c.tenor.com/
    - https://assets.scratch.mit.edu/
    - https://cdn2.scratch.mit.edu/
    - https://cdn.scratch.mit.edu/
    - https://uploads.scratch.mit.edu/
    - https://cdn.discordapp.com/
    - https://media.discordapp.net/
