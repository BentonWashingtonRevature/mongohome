const { ObjectId } = require('bson');
const { Schema, model, default: mongoose } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {type: Schema.Types.ObjectId, default: ObjectId.new},
    reactionBody: {type: String, required: true, maxlength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const thoughtSchema = new Schema(
    {
     thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
     },
     createdAt: {
        type: Date,
        default: Date.now
     },
     username: {
        type: String,
        required: true
     },
     reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that gets retrieves the length of the user's friends array field on query
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;