import { quotes, users } from "./fakedb.js";
import {randomBytes} from 'crypto';

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    quotes: () => {
      return quotes;
    },
    user: (_, args) => {
      console.log(args);
      return users.find((user) => user.id === args.id);
    },
  },
  User: {
    quotes: (user) => {
      return quotes.filter((quote) => quote.by === user.id);
    },
  },
  Mutation: {
    addNewUserDummy : (_, {userNew}) => {
        console.log(userNew);
        const id = randomBytes(5).toString('hex')
        users.push({
            id,
            ...userNew
        });
        
        return users.find(user => user.id === id);
    }
  }
};

export default resolvers;
