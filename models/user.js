const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [
        {
            type: Schema.Types.ArrayId,
            ref: 'Thought'
        }
      ],
    friends: [
        {
            type: Schema.Types.ArrayId,
            ref: 'User'
        }
    ]
    },
    { 
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
  );