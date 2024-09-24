import * as cheerio from 'cheerio';
const URL = 'https://hianime.to'

const animeByGenre = async (page: number | undefined, genre: string) => {
    try {
        console.log(genre);

        const $ = await cheerio.fromURL(`https://hianime.to/genre/${genre}?page=${page}`);
        const data = $.extract({
            genre: [
                {
                    selector: '.film_list-wrap .flw-item',
                    value: (el) => {
                        const img = $(el).find('img').attr('data-src')
                        const latestEpisodeUrl = URL + $(el).find('a').attr('href')
                        const animeUrl = URL + $(el).find('.film-name a').attr('href')
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
            topAiring: [{
                selector: '.anif-block-ul ul li',
                value: (el) => {
                    const img = $(el).find('.film-poster img').attr('data-src')
                    const name = $(el).find('.film-name a').text()
                    const url = URL + $(el).find('.film-name a').attr('href')
                    const captions = $(el).find('.tick-sub').text()
                    const dub = $(el).find('.tick-dub').text()
                    const type = $(el).find('.tick')
                        .contents()
                        .filter((_, e) => e.type === 'text')
                        .last()
                        .text().trim()
                    const episodes = $(el).find('.tick-eps').text()

                    const details = { captions, dub, episodes, url, type }


                    return { img, name, details }
                },
            }],
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


export { animeByGenre }