import { UiState } from "./UIProvider";

// Always define what actions will be used by my reducer
type UIActionType = { type: "UI - Open Menu" } | { type: "UI - Close Menu" };

export const uiReducer = (state: UiState, action: UIActionType): UiState => {
	switch (action.type) {
		case "UI - Open Menu":
			return {
				...state,
				sideMenuOpen: true,
			};

		case "UI - Close Menu":
			return {
				...state,
				sideMenuOpen: false,
			};

		default:
			return state;
	}
};
