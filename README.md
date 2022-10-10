# User-Posts-Comments-backend-server
Backend server to manage users and authentication for posts and comments - please, refere to readme.md

Exam one
## Using Express ,mongodb, mongoose
create express application with three modules (User && Posts && Comments)
User has (name ,email,password "hash password" ,age ,phone)
posts has (title ,content,createdBy=> ref to user model , comments =>Array of ID ref to comment model )
Comments has (content, createdBy=> ref to user model)

## APIS CRUD Operation For User module
1- sign in (send token)
2- sign up (hash password)
3-Change password  (user must be logged in)(Get user ID from token)
4- update account   (user must be logged in)(Get user ID from token)
5- delete account (with posts and comments created by this account) (user must be logged in)(Get user ID from token)
 

## APIS CRUD Operation For Post module
1- add post (user must be logged in)(Get user ID from token)
2- update post  (user must be logged in)(Get user ID from token) (post owner only)
3- Get all posts (with created by details and comments details using populate) (user must be logged in)
4- Get user posts (with created by details and comments details using populate) (user must be logged in)(Get user ID from token)
5- Delete Post  (user must be logged in)(Get user ID from token) (post owner only)


## APIS CRUD Operation For Comment module
1- Add Comment  (user must be logged in)(Get user ID from token)
2- Update comment (user must be logged in)(Get user ID from token) (comment owner only)
3- Delete comment (user must be logged in)(Get user ID from token) (comment owner and post owner)

