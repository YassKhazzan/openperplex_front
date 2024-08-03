const getSources = (data) => {
    try {
        let results = [];
        if (data && data.length > 0) {
            let i = 0;

            for(let i = 0; i < 7; i++) {
                if (data[i] && data[i].link) {
                    results.push(data[i]);
                }
            }
        }
        return results;
    } catch (e) {
        console.log(e);
    }

}


export default getSources;