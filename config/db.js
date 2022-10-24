import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://oluchi21:oluchi2106@cluster0.dqnf9mg.mongodb.net/vhee?retryWrites=true&w=majority", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
		})

		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(`Error: ${error}`)
		process.exit(1)
	}
}

export default connectDB