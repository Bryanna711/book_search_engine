const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return User.find().populate('book');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('book');
        },
    },


    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user_id },
                    {
                        $addToSet: { savedbooks: input },
                    },
                    {
                        new: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { input }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedbooks: input } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
},