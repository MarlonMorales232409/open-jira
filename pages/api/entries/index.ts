import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getEntries(res);

		default:
			return res.status(400).json({ message: "Endpoint does not exist" });
	}
}

async function getEntries(res: NextApiResponse<Data>) {
	db.connect();
	const entries = await Entry.find().sort({ createAt: "ascending" });
	res.status(200).json(entries);
	db.disconnect();
}
