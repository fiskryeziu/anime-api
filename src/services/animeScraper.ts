import * as cheerio from 'cheerio';

const scrapeAnime = async () => {
    try {
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

                        const captions = $(el).find('.sc-detail .tick-item').eq(0).text()
                        const dubEp = $(el).find('.sc-detail .tick-item').eq(1).text()


                        const details = {
                            type: detailsData[0] || '',
                            duration: detailsData[1] || '',
                            date: detailsData[2] || '',
                            quality: detailsData[3] || '',
                            captions: captions || '',
                            dubEp: dubEp || ''
                        };
                        return { imgSrc: img, spotlightRanking: spotlightText, details }
                    }
                }
            ],
            trending: [
                {
                    selector: '#anime-trending .trending-list .swiper-wrapper .swiper-slide',
                    value: (el) => {
                        const img = $(el).find('img').attr('data-src')
                        const trendingRank = $(el).find('.item .number span').text()

                        return { img, trendingRank }
                    }
                },
            ],
            latestEp: [
                {
                    selector: '.film_list-wrap:first .flw-item',
                    value: (el) => {
                        const img = $(el).find('img').attr('data-src')
                        const latestEpisodeUrl = 'https://hianime.to' + $(el).find('a').attr('href')
                        const animeUrl = 'https://hianime.to' + $(el).find('.film-name a').attr('href')
                        const url = { latestEpisodeUrl, animeUrl }

                        const name = $(el).find('.film-name').text()
                        const type = $(el).find('.film-detail .fd-infor span:first').text()
                        const duration = $(el).find('.fdi-duration').text()
                        const captions = $(el).find('.film-poster .tick-sub').text()
                        const dubEp = $(el).find('.film-poster .tick-dub').text()
                        const episodes = $(el).find('.film-poster .tick-eps').text()
                        const details = { name, type, duration, captions, dubEp, episodes }

                        return { img, url, details }
                    },
                }

            ],
            newOnZoro: [
                {
                    selector: '.film_list-wrap:eq(1) .flw-item',
                    value: (el) => {
                        const img = $(el).find('img').attr('data-src')
                        const latestEpisodeUrl = 'https://hianime.to' + $(el).find('a').attr('href')
                        const animeUrl = 'https://hianime.to' + $(el).find('.film-name a').attr('href')
                        const url = { latestEpisodeUrl, animeUrl }

                        const name = $(el).find('.film-name').text()
                        const type = $(el).find('.film-detail .fd-infor span:first').text()
                        const duration = $(el).find('.fdi-duration').text()
                        const captions = $(el).find('.film-poster .tick-sub').text()
                        const episodes = $(el).find('.film-poster .tick-dub').text()
                        const details = { name, type, duration, captions, episodes }

                        return { img, url, details }

                    },
                }

            ],
            topUpComing: [
                {
                    selector: '.film_list-wrap:eq(2) .flw-item',
                    value: (el) => {
                        const img = $(el).find('img').attr('data-src')
                        const latestEpisodeUrl = 'https://hianime.to' + $(el).find('a').attr('href')
                        const animeUrl = 'https://hianime.to' + $(el).find('.film-name a').attr('href')
                        const url = { latestEpisodeUrl, animeUrl }

                        const name = $(el).find('.film-name').text()
                        const type = $(el).find('.film-detail .fd-infor span:first').text()
                        const startDate = $(el).find('.film-detail .fd-infor .fdi-duration').text()
                        const details = { name, type, startDate, }

                        return { img, url, details }
                    },
                }
            ],
            // schedule: [
            //     {
            //         selector: '',
            //         value: () => { }
            //     }
            // ]

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




