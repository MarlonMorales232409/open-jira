import { formatDistanceToNow } from "date-fns";

export const getDistanceFromNow = (date: number) => {
	const fromNow = formatDistanceToNow(date);

	return `${fromNow} ago`;
};
