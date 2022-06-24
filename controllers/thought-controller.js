const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('__v')
            .select('thoughtText')
            .select('username')
            .select('createdAt')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('__v')
            .select('thoughtText')
            .select('username')
            .select('createdAt')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id.' });
                    return;
                  }
                  res.json(dbThoughtData);
            })
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true},
            {runValidators: true}
        ).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message:'No user with this id.'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.status(400).json(err))
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            {$pull: {reactions: { reactionId: params.reactionId}} },
            {new: true}
        ).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id.'})
            }
        }).catch(err => res.status(404).json(err))
    }
};

module.exports = thoughtController;