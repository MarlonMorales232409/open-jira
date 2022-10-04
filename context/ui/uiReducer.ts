import { UiState } from "./UIProvider";

// Always define what actions will be used by my reducer
type UIActionType =
	| { type: "UI - Open Menu" }
	| { type: "UI - Close Menu" }
	| { type: "UI - Set Adding New Entry"; payload: boolean }
	| { type: "UI - Is Dragging"; payload: boolean };

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

		case "UI - Set Adding New Entry":
			return {
				...state,
				isAddingEntry: action.payload,
			};

		case "UI - Is Dragging":
			return {
				...state,
				isDragging: action.payload,
			};

		default:
			return state;
	}
};
