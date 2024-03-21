const express = require("express")
const app = express()
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const methodOverride = require("method-override");
const connectDatabase = require("./config/database")
const Blog = require("./models/Blog")

connectDatabase()

const port = 5008
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home")
})

//display 
app.get("/blogs",async (req,res)=>{
  const blogs = await Blog.find({})
    res.render("blogs/index",{blogs})
})

//create blog
app.get("/blogs/new",(req,res)=>{
    res.render("blogs/new")
})


app.post("/blogs",async (req,res)=>{
    
    const {title, description, image} = req.body
    const newBlog = {title, description, image, id: uuidv4()}
    const blog = new Blog({
      title, 
      description, 
      image
    })

    await blog.save()
    res.redirect('/blogs')
})

//show specific
app.get("/blogs/:id", async (req,res) => {
  const {id} = req.params
 
  const foundBlog = await Blog.findById(id)

  res.render("blogs/show",{foundBlog})
})

// edit  blog
app.get("/blogs/:id/edit",async (req,res)=>{
  const {id} = req.params
  const foundBlog = await Blog.findById(id)

  res.render("blogs/edit",{foundBlog})
})

//update blog
app.patch("/blogs/:id",async (req,res)=>{
 
  const {id} = req.params
  const {title, description, image} = req.body
  

  await Blog.findByIdAndUpdate(id,{title, description, image})

  res.redirect("/blogs")
})

//delete  blog
app.delete("/blogs/:id",async (req,res)=>{
 
  const {id} = req.params
  await Blog.findByIdAndDelete(id)
  res.redirect("/blogs")
})

app.listen(port,() => {
    console.log(`Server listening at port ${port}`);
})