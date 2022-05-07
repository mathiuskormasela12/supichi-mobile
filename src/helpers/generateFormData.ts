// ========== Generate Form Data

export const generateFormData = (data: any) => {
	const body = new FormData();
	for (let prop in data) {
		body.append(prop, data[prop]);
	}

	return body;
};
