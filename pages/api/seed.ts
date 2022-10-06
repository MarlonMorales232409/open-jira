import { NextApiRequest, NextApiResponse } from "next";
import { db, SeedData } from "../../database";
import { Entry } from "../../models";

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (process.env.NODE_ENV === "production") {
		res.status(401).json({
			message: "You have not access to this endpoit",
		});
	}

	await db.connect();
	await Entry.deleteMany();
	await Entry.insertMany(SeedData.entries);

	await db.disconnect();

	res.status(200).json({ message: "Process was successfully" });
}
