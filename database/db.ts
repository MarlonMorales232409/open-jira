import mongoose from "mongoose";

/*
Mongo DB status connection
 * 0 = disconnect
 * 1 = connect
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
	isConnected: 0,
};

export const connect = async () => {
	if (mongoConnection.isConnected) {
		console.log("Already connected");
		return;
	}

	if (mongoose.connections.length > 1) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;

		// If Mongo is connected (isConnected status = 1) we gonna use that connection
		if (mongoConnection.isConnected === 1) {
			console.log("Using previus connection");
			return;
		}

		// Other wise we disconnect mongo
		await mongoose.disconnect();
	}

	// We rise a new mongo connection

	await mongoose.connect(process.env.MONGO_URL || "");
	mongoConnection.isConnected = 1;
	console.log("connected to MongoDB on", process.env.MONGO_URL);
};

export const disconnect = async () => {
	// Mongo connection never will be lost in development enviroment
	if (process.env.NODE_ENV === "development") return;

	// If there is not an open connection, do not anything and just return
	if (mongoConnection.isConnected === 0) return;

	// Other wise it going to discconect from mongo
	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
	console.log("Disconnected from MongoDB");
};
