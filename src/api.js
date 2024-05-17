const BASE_URL = ""

export const fetchPets = async () => {
    try {
        const response = await fetch();
        const data = await response.json();
        return data.animals;
    } catch (error) {
        console.error('Error fetching pets: ', error);
        throw error;
    }};