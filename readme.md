## Description
- Web application for Seeking Side Project teammate by roles and skills

## Stacks
- React
- Typescript
- Redux
- Express
- TypeORM
- MySQL
- Styled Components
- Formik
- JWT

## Client
(https://github.com/peppermint100/project-wanted-client)

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
- applications 

2. Post
- id
- title
- content
- currentRolesOpenning
- wantedRoles(contains how many pm or dev needed)
- wantedSkills
- isDone  

#### relations
- Applications
- owner

3. Application
- id
- isAccepted
- role

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
- read all post
- read by post
- readByWantedSkills
- apply

3. User
- update my info
- 

## Pages
1. home(Login, register modal) => modal component needed
2. mypage
3. createpost
4. updatepost
5. readpost

## Todo
- [x] update status after create or update database
- [x] application management ux design
- [x] in posts.tsx show which position is recruiting in post
- [x] needed and recruited count in postdetail page


