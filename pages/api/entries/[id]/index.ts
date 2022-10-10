import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry } from "../../../../models";
import { IEntry } from "../../../../models/Entry";

type Data = { message: string } | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		return res
			.status(400)
			.json({ message: `The id: ${id} is not a valid id ` });
	}

	switch (req.method) {
		case "PUT":
			return updateEntry(req, res);

		default:
			res.status(400).json({ message: "Method does not exist" });
	}
}

async function updateEntry(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id } = req.query;

	await db.connect();

	const entryToUpdate = await Entry.findById(id);

	if (!entryToUpdate) {
		res.status(400).json({
			message: "There is not any entry with id:" + id,
		});
	}

	const {
		description = entryToUpdate?.description,
		status = entryToUpdate?.status,
	} = req.body;

	const updatedEntry = await Entry.findByIdAndUpdate(
		id,
		{ description, status },
		{ runValidators: true, new: true }
	);

	res.status(200).json(updatedEntry!);
}
