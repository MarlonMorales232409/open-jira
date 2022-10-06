interface SeedData {
	entries: SeedEntry[];
}

interface SeedEntry {
	description: string;
	createdAt: number;
	status: string;
}

export const SeedData: SeedData = {
	entries: [
		{
			description: "Pending: Work in make my own Bussnise",
			createdAt: Date.now(),
			status: "pending",
		},
		{
			description: "In-Progress: Work in make my own Bussnise",
			createdAt: Date.now() + 1000000,
			status: "in-progress",
		},
		{
			description: "Finished: Work in make my own Bussnise",
			createdAt: Date.now() * 25,
			status: "finished",
		},
	],
};
