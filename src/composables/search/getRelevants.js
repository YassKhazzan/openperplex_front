const getRelevants = (data) => {
    try {
        // Check if the returned data has the 'followUp' field and handle it
        if (data && data.followUp && data.followUp.length > 0) {
            return data.followUp;
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
    }
}


export default getRelevants;