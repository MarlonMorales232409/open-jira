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

		case "POST":
			return postEntry(req, res);

		default:
			return res.status(400).json({ message: "Endpoint does not exist" });
	}
}

async function getEntries(res: NextApiResponse<Data>) {
	await db.connect();
	const entries = await Entry.find().sort({ createAt: "ascending" });
	res.status(200).json(entries);
	await db.disconnect();
}

async function postEntry(req: NextApiRequest, res: NextApiResponse) {
	const { description } = req.body;

	const newEntry = new Entry({
		description,
		createdAt: Date.now(),
	});

	try {
		await db.connect();
		await newEntry.save();
		res.status(201).json(newEntry);
		await db.disconnect();
		return res.status(201).json({ message: "sucsefully" });
	} catch (e) {
		await db.disconnect();
		return res
			.status(500)
			.json({
				message: "Somethong went wrong, please check the server logs",
			});
	}
}
