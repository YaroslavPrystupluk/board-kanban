import { FC } from "react";
import { Card } from "react-bootstrap";
import { intlFormatDistance } from "date-fns";
import { Iissues } from "../../model/Iissues";
import { Draggable } from "react-beautiful-dnd";

import { CardWrapp } from "./styledCardItem";

interface CardissueProps {
	issue: Iissues;
	index: number;
}

const Cardissue: FC<CardissueProps> = ({ issue, index }) => {
	// const today = new Date();
	// const updatedate = new Date(issue.updated_at);
	// const diffInMs = today.getTime() - updatedate.getTime();
	// const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	// const date =
	// 	diffInDays > 0 ? `opened ${diffInDays} days ago` : `opened ${updatedate.toLocaleDateString()}`;

	// const getRelativeTimeString = (date: Date | number, lang = navigator.language) => {
	// 	// Отримуєм час мілісекундах якщо число в мілісекундах то берем число, якщо ми отримали обєкт дата то застосовуєм data.getTime
	// 	const timeMs = typeof date === "number" ? date : date.getTime();

	// 	//Визначаєм різницю в секундах з часом який зараз
	// 	const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

	// 	//Маив який має мінутуб часБ день, тиждень, місяць, рік
	// 	const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

	// 	// юніти які ми використовуєм в форматуванні (rtf.format(1, units ="second"))
	// 	const units: Intl.RelativeTimeFormatUnit[] = [
	// 		"second",
	// 		"minute",
	// 		"hour",
	// 		"day",
	// 		"week",
	// 		"month",
	// 		"year",
	// 	];

	// 	//Визначаєм індех units який будем використовувати шукаєм індекси якщо менше 60 буде секунди більше буде хвилина і так далі
	// 	const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

	// 	//Перевіряєм unitIndex на теперішнє значення якщо 0 то будем брати завжди брати 1 і ділити на 1 сек
	// 	const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

	// 	const rtf = new Intl.RelativeTimeFormat(lang, {
	// 		numeric: "auto",
	// 	});

	// 	return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
	// };
	// const date = getRelativeTimeString(new Date(issue.updated_at), "en");

	// За допомогою бібліотеки npm install date-fns --save
	const date = intlFormatDistance(new Date(issue.updated_at), Date.now(), {
		locale: "en",
		numeric: "always",
		// style: "long",
		// localeMatcher: "lookup",
	});

	return (
		<Draggable draggableId={`${issue.id.toString()}`} key={issue.id} index={index}>
			{(provided, snapshot) => (
				<CardWrapp
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<Card.Body
						style={{
							borderRadius: "10px",
							background: snapshot.isDragging ? "#49bcf8" : "#eaf4fc",
						}}>
						<Card.Title>{issue.title}</Card.Title>
						<Card.Text>
							#{issue.number} {date}
						</Card.Text>
						<Card.Text>
							{issue.user.type} | Comments: {issue.comments}
						</Card.Text>
						<Card.Text>State: {issue.state}</Card.Text>
					</Card.Body>
				</CardWrapp>
			)}
		</Draggable>
	);
};

export default Cardissue;
