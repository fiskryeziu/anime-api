import * as cheerio from 'cheerio';

// All the scraper functions we'll be either here
// or multiple files in services folder


const scrapeAnime = async () => {
    try {
        // scrape logic goes here 
        const $ = await cheerio.fromURL('https://hianime.to/home');


        const data = $.extract({
            spotlight: [
                {
                    selector: '.deslide-wrap #slider .swiper-wrapper .swiper-slide',
                    value: (el) => {
                        const img = $(el).find('img').attr('data-src')

                        const spotlightText = $(el).find('.desi-sub-text').text()
                        const detailsData = $(el).find('.sc-detail').children('.scd-item').filter(function() {
                            return !$(this).find('.tick-item').length;
                        }).map(function() {
                            return $(this).text().trim();
                        }).get();

                        const episodes = $(el).find('.sc-detail .tick-item').eq(0).text()
                        const captions = $(el).find('.sc-detail .tick-item').eq(1).text()


                        const details = {
                            type: detailsData[0] || '',
                            duration: detailsData[1] || '',
                            date: detailsData[2] || '',
                            quality: detailsData[3] || '',
                            episodes: episodes || '',
                            captions: captions || ''
                        };
                        return { imgSrc: img, spotlightRanking: spotlightText, details }
                    }
                }
            ]

        })


        return { data }
    } catch (error) {
        let message
        if (error instanceof Error) {
            message = error.message
        }
        throw String(message)
    }
};


export { scrapeAnime }




