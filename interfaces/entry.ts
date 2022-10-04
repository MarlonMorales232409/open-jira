export interface Entry {
	_id: string;
	description: string;
	createdAt: number;
	status: EntiesStatus;
}

export type EntiesStatus = "pending" | "in-progress" | "finished";
