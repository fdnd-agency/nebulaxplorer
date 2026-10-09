// export const csr = false;

export const actions = {
	subscribe: async ({ request }) => {
		const formData = await request.formData();
        const email = formData.get("email");
        console.log(email);
	}
};