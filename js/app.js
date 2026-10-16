let cl = console.log();

let posts = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit"
  },
  {
    userId: 5,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae"
  }
];

const PORT = 3000;
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// GET API
app.get('/api/posts', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error while fetching posts',
      error: err.message
    });
  }
});

//get api fetch to single post

app.get("/api/posts/:id", (req,res)=>{
    try{
        const id = Number(req.params.id);
        const singlePosts = posts.find(p => p.id === id)
        if(!singlePosts){
            return res.status(404).json({
                success : false,
                message : "single post data not found!!!"
            })
        }
        res.status(200).json({
            success : true,
            body : singlePosts,
            message : "single posts data fetched successfully !!!"
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message :"something went wrong !!!",
            error : err.message
        })
    }
})

//create api
app.post("/api/posts", (req, res) => {
  try {
    let newPost = {
      id: Date.now().toString(),
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    }

    posts.push(newPost)

    res.status(201).json({
      success: true,
      body: newPost,
      message: "Post created successfully !!!"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: " Something went wrong !!!!",
      error: err.message
    })
  }
})

// update api
app.patch("/api/posts/:id", (req, res) =>{
  try{
    let updatepost = posts.find(post => post.id == req.params.id);

    if(!updatepost){
      return res.status(404).json({
        success: false,
        message: "Post not found !!!!"
      })
    }

    updatepost.userId = req.body.userId;
    updatepost.title = req.body.title;
    updatepost.body = req.body.body;

    res.status(200).json({
      success: true,
      body: updatepost,
      message: "Post  fetched updated successfully !!!!",
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "Something went wrong !!!!",
      error: err.message
    })
  }
})

// delete api
app.delete("/api/posts/:id", (req, res)=>{
  try{
    let getIndex = posts.findIndex(post => post.id == req.params.id);

    if(getIndex === -1){
      return res.status(404).json({
        success: false,
        message: "Post not found !!!!"
      })
    }
    let deletedPost = posts.splice(getIndex, 1);

    res.status(200).json({
      success: true,
      body: deletedPost[0],
      message: "Post  fetched deleted successfully !!!!",
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "Something went wrong !!!!",
      error: err.message
    })
  }
})

// Start server
app.listen(PORT, () => {
  cl(`Server is running on PORT ${PORT}`);
});