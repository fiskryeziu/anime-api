// All the scraper functions we'll be ether here
// or multiple files in services folder

const scrapeAnime = async () => {
    try {
        // scrape logic goes here 

    } catch (error) {
        let message
        if (error instanceof Error) {
            message = error.message
        }
        throw String(message)
    }
};


export { scrapeAnime }




