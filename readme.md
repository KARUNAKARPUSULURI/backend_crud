USERS -> 
[{},{},{}]
POSTS -> 
{
  Models : ["users.json", "posts.json"],
  Routes : ["usersRoute.js", "postRoute.js"]
}
FRONTEND : {
  node_modules : {...},
  public : {},
  src -> {
    app.jsx,
    main.jsx,
    app.css,
    index.css,
    Components - > {

    },
    Pages -> {
      ...
    },
    Data -> {
      ....
    },
    Services -> {
      ....
    },
    redux : {

    }
  }
  index.html,
  .env,
  .gitignore,
  .dockers,
  .nginx
}

router.get -> 
router.post

BACKEND -> {
  Models : {
    users.json,
    posts.json
  },
  Routes : {
    userRoutes : {
      usersRoutes.js -> get, post, put, delete
    },
    postRoutes : {
      postRoutes.js -> get, post, put, delete
    }
  },
  Controllers : {
    userControllers : {
      userController -> logic(get, post, put, delete)
    }
    postControllers: {
      postController -> logic(get, post, put, delete)
    }
  },
  server.js
}
