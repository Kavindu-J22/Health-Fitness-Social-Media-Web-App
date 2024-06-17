# instagram-api-springboot
instagram api by using springboot


## Live App Link
https://instagram-api-springboot-production.up.railway.app/api



# Api Docs



## Create New User

```javascript
try {
    const res = await fetch(`https://instagram-api-springboot-production.up.railway.app/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    console.log("Signup :- ",user)
    
  } catch (error) {
    console.log("catch error ", error);
  }
```


##### password should be atleast 8 char
##### username and email should be uniq


## Signin User

```javascript
  try {
    const res = await fetch(`https://instagram-api-springboot-production.up.railway.app/signin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    });
    const token = res.headers.get("Authorization");

   
    console.log("token from header :- ", token);
    
  } catch (error) {
    console.log("catch error ", error);
  }
```

##### Note: In Basic Auth provide {email, password} for login





## Base URL : https://instagram-api-springboot-production.up.railway.app


### Note: you need to provide this header in each bellow api call

```javascript

headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwtToken,
},

```

## create new Post

```javascript
end point: "api/posts/create"

body:

{
    "caption":"first post",
    "image":"https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=600",
    "location":"kolkata"
}
method:POST,

```

## get one post By Id

```javascript
{
    end point:  /api/posts/{postId},
    method: GET
}
```


## Like Post
```javascript
{
    end point: /api/posts/like/{postId}
    method: PUT
}
```

## Unlike Post
```javascript
{
    end point: /api/posts/unlike/{postId}
    method: PUT
}
```

## Delete Post
```javascript
{
    end point : /api/posts/delete/{postId}
    method: DELETE
}
```

## create comment
```javascript

{

    end Point: api/comments/create/{postId},

    body: {
        "content":"nice post budy"
    },
    mehod:POST
}
```

## Like Comment
```javascript
{
    end point: /api/comments/like/{commentId}
    method: PUT
}
```

## Unike Comment
```javascript
{
    end point: /api/comments/unlike/{commentId}
    method: PUT
}
```

## Creat Story

```javascript
{
    end point: /api/stories/create,
    method: POST
}
```

## Follow User

```javascript

{
    end point: /api/users/follow/{userId},
    method:PUT
}
```

##### note: provide that user id which you want to follow

## Unfollow User

```javascript
{
    end point: /api/users/unfollow/{userId} 
    method:PUT
}
```
##### note: provide that user id which you want to unfollow


## Find User By Id
```javascript
{
    end Point: api/users/m/{userIds}
    method:GET
}
```
##### note: here in userIds you have can provide multiple user ids like this "api/users/m/1,2,3" it will return all the users according ids



## find Story By UserId
```javascript
{
    end point : /api/stories/{userId}
    method: GET'
}
```



## get following users post
```javascript
{
    end point : /api/posts/following/{userIds}
    method: GET
}
```

##### note: in userIds you have to provide all the userIds whome you are following


## Get Req User Profile
```javascript
{
    end point : /api/users/req
    method : GET
}
```

## Find user By username

```javascript
{
    end point : /api/users/username/{username}
    method : GET
}
```

## Save Post
```javascript
{
    end point : /api/posts/save_post/{postId}
    method: PUT
}

```

## Unsave Post
```javascript
{
    end point : /api/posts/unsave_post/{postId}
    method: PUT
}
```

## Search User
```javascript
{
    end point : /api/users/search?q={query}
    method: GET
}
```

## Edit Profile
```javascript
{
    end point : /api/users/account/edit
    method: PUT
    body
        {
            id:"",
            bio:"",
            username:"",
            mobile:"",
            gender:"",
            name:"",
            website:""
        }
}
```






