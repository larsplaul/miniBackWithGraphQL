const {makeExecutableSchema} = require("graphql-tools");
const resolvers = require("./resolvers");
//const {DateTime} = require("@okgrow/graphql-scalars");

const typeDefs = `
type Job {
  type: String
  company: String
  companyUrl : String
}

scalar DateTime

type User {
  _id: ID
  firstName: String
  lastName: String
  userName : String
  job: [Job]
  created : DateTime
  lastUpdated : DateTime
}

input UserInput {
  firstName: String!
  lastName: String!
  userName : String!
  password : String!
}

input LoginInput {
  userName : String!
  password : String!
  longitude: Float!
  latitude: Float!
  distance : Int!
}

type Friend {
  userName : String!
  latitude: Float!
  longitude: Float!
}

type Friends {
  friends: [Friend]
}

type Position {
  longitude : Float!
  latitude : Float!
}

type LocationBlog {
  _id: ID!
  info : String!
  img : String
  pos : Position
  author : ID!
  likedBy : [ID]
  likedByCount : Int
  created : DateTime
  lastUpdated : DateTime
  slug: String
}

input LocationBlogInput {
  info : String!
  longitude : Float!
  latitude : Float!
  author : ID!
}

type Mutation {
  createLocationBlog(input: LocationBlogInput) : LocationBlog
  createUser(input: UserInput) : User
  likeLocationBlog(blogId: ID!,userId: ID!) : LocationBlog
}

type Query {
  getUserByUserName(userName: String!): User
  getUserById(userId: ID!): User
  getAllUsers : [User]
  getAllBlogs : [LocationBlog]
  loginForFriends(input : LoginInput!):Friends
  findBlogByID(id: ID!): LocationBlog
  findBlogsByAuthor(authorId: ID! ) : [LocationBlog]
}
`
const schema = makeExecutableSchema({typeDefs,resolvers});
module.exports =  {schema};