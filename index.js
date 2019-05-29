const { ApolloServer, gql } = require('apollo-server');

//  加入假資料
const users = [
  {
    id: 1,
    name: 'Fong',
    age: 23
  },
  {
    id: 2,
    name: 'Kevin',
    age: 40
  },
  {
    id: 3,
    name: 'Mary',
    age: 18
  }
];

//  GraphQL Schema 定義
/*
在 GraphQL Schema Definition 中，
可以用單行 " 或是多行 """ 來加入文件註釋 (會在文件中呈現)，
另外也可以用單行的 # 來表達單純的註釋 (不會在文件中呈現)。
習慣上 type definition 使用 """ 來多行註釋，
field 則是使用 " 來單行註釋。
*/
const typeDefs = gql`
  """
  使用者資訊
  """
  type User {
    "識別碼"
    id: ID
    "名字"
    name: String
    "年齡"
    age: Int
  }

  type Query {
    "A simple type for getting started!"
    hello: String
    "取得當下使用者"
    me: User
  }
`;

  // Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
  Query: {
    // 需注意名稱一定要對到 Schema 中 field 的名稱
    hello: () => 'world',
    me: ()=> users[0]
  }
};

// 3初始化 Web Server ，需傳入 typeDefs (Schema) 與 resolvers (Resolver)
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(process.env.PORT || 4000 ).then(({ url }) => {
  console.log(`? Server ready at ${url}`);
});