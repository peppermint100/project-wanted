
### UX
1. Login, Register, Authentication
- login register from modal
- click outside of modal disappear modal
2. Post wanted Role, Skills
3. CRUD Post
- create post from another route
4. See all post from home
- sort posts by role and skills
- apply for a project as role
5. update mypage with modal


### Pages
- home(login, register, posts, sortby, navbar)
- createPost
- updatePost
- readPost

### Schema
1. User
- id
- username
- email
- password
- role(project manager, developer, designer)
- skills
- descriptions
#### relations
- posts

2. Post
- id
- title
- content
- wantedRoles(contains how many pm or dev needed)
- wantedSkills
- isDone  

#### relations

3. Application
- id
- isAccepted

#### relations
- post
- appliedUsers

### APIs
1. Auth
- login
- register
- checkAuth

2. Post
- create
- update
- delete
- read
- readByWantedRoles
- readByWantedSkills
- apply
- 


3. User
- update my info
- 


