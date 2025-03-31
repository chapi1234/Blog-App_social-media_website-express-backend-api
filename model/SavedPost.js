const SavedPostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    savedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("SavedPost", SavedPostSchema);
  