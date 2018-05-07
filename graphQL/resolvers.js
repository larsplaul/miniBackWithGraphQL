
const userFacade = require("../facades/userFacade");
const loginFacade = require("../facades/loginFacade")
const blogFacade = require("../facades/blogFacade")

const {DateTime} = require("@okgrow/graphql-scalars");

//Resolver map
module.exports = resolvers = {
  DateTime,
  Query: {
    getUserByUserName:  (root, { userName }) => {
      return userFacade.findByUsername(userName);
    },
    getUserById: (root, {userId}) =>{
      return userFacade.findById(userId);
    } ,
    getAllUsers : () => {
      return userFacade.getAllUsers();
    },
    loginForFriends: (root, {input}) => {
       //const res = await loginFacade(input.userName,input.password,input.longitude,input.latitude,input.distance);
       return loginFacade(input.userName,input.password,input.longitude,input.latitude,input.distance);
    },
    findBlogByID: (root, {id}) => {
      return blogFacade.findBlog(id);
    },
    findBlogsByAuthor: (root, {authorId}) => {
      return blogFacade.findBlogsByAuthor(authorId);
    },
    getAllBlogs : () =>{
      return blogFacade.getAllBlogs();
    }
  },
  Mutation : {
    createUser: (root,{input})=>{
      const firstName = input.firstName;
      const lastName = input.lastName;
      const userName = input.userName;
      const password = input.password;
      return userFacade.addUser(firstName,lastName,userName,password);
    },
    createLocationBlog: (root, {input}) => {
      const info = input.info;
      const latitude = input.latitude;
      const longitude = input.longitude;
      const author = input.author;
      return blogFacade.addLocationBlog(author,info,longitude,latitude);
    },
    likeLocationBlog: (root, {blogId,userId}) => {
      return blogFacade.likeBlog(blogId,userId);
    }

  }
};
