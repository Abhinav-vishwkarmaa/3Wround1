import mongoose from 'mongoose';

const claimHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  claimedPoints: Number,
  claimedAt: { type: Date, default: Date.now }
});
console.log('ClaimHistory model defined');

const ClaimHistory = mongoose.model('ClaimHistory', claimHistorySchema);

export default ClaimHistory;
