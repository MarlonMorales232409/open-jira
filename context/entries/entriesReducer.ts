import { Entry } from "../../interfaces";
import { EntriesState } from "./EntriesProvider";

// Always define what actions will be used by my reducer
type EntriesActionType =
	| { type: "[Entry] - New Entry"; payload: Entry }
	| { type: "[Entry] - Update Entry Status"; payload: Entry }
	| { type: "[Entry] - Refresh Entries"; payload: Entry[] };

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		case "[Entry] - New Entry":
			return {
				...state,
				entries: [...state.entries, action.payload],
			};

		case "[Entry] - Update Entry Status":
			return {
				...state,
				entries: state.entries.map((entry) => {
					if (entry._id === action.payload._id) {
						entry.status = action.payload.status;
						entry.description = action.payload.description;
					}

					return entry;
				}),
			};

		case "[Entry] - Refresh Entries":
			return {
				...state,
				entries: [...action.payload],
			};
		default:
			return state;
	}
};
