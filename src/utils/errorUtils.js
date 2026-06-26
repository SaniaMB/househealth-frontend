export function getErrorMessage(error) {

    // fetch() errors
    if (error instanceof Error) {
        return error.message;
    }

    // Axios-style backend errors (kept for future compatibility)
    const data = error.response?.data;

    if (data?.errors) {
        return Object.values(data.errors)[0];
    }

    if (data?.message) {
        return data.message;
    }

    return "Something went wrong. Please try again.";
}