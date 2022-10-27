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

		case "GET":
			return getEntry(req, res);

		case "DELETE":
			return deleteEntry(req, res);

		default:
			res.status(400).json({ message: "Method does not exist" });
	}
}

async function getEntry(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;

	db.connect();

	try {
		const entry = await Entry.findById(id);
		return res.status(200).json(entry);
	} catch (error) {
		return res.status(400).json({ message: `No enties with id ${id}}` });
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

	try {
		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			{ description, status },
			{ runValidators: true, new: true }
		);
		res.status(200).json(updatedEntry!);
	} catch (error: any) {
		res.status(400).json(error);
	}
}

async function deleteEntry(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;

	db.connect();

	try {
		const entry = await Entry.findByIdAndDelete(id);
		res.status(200).json(entry);
	} catch (error) {
		res.status(400).json({ message: `Bad request` });
	}
}
