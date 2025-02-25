import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	spotifyToken: String,
	refreshToken: String,
	tokenTime: Date,
	country: {
		type: String,
		default: 'None',
	},
});

export type UserSchemaType = mongoose.InferSchemaType<typeof userSchema>;

export default mongoose.model<UserSchemaType>('User', userSchema);
