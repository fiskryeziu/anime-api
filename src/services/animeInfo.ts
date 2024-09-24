
import * as cheerio from 'cheerio';

const animeInfo = async (detailsUrl: string) => {
    try {
        // TODO: add a detailUrl and watchUrl property on every data obj.
        //  thus will get used to get the animeInfo

        const $ = await cheerio.fromURL(`https://hianime.to/${detailsUrl}`);
        const data = $.extract({
            info: {
                selector: '#ani_detail .anis-content',
                value(el) {
                    const img = $(el).find('.film-poster img ').attr('src')
                    const name = $(el).find('.film-name ').text()


                    const pg = $(el).find('.tick-pg').text()
                    const quality = $(el).find('.tick-qulity').text()
                    const captions = $(el).find('.tick-sub').text()
                    const dub = $(el).find('.tick-dub').text()
                    const type = $(el).find('.tick .item:eq(0)').text()
                    const duration = $(el).find('.tick .item:eq(1)').text()
                    const desc = $(el).find('.film-description').text().trim();
                    const details = { pg, quality, captions, dub, type, duration, desc }


                    const japaneseName = $(el).find('.item-title:eq(1) .name').text()
                    const synonyms = $(el).find('.item-title:eq(2) .name').text()
                    const aired = $(el).find('.item-title:eq(3) .name').text()
                    const premiered = $(el).find('.item-title:eq(4) .name').text()
                    const durationInfo = $(el).find('.item-title:eq(5) .name').text()
                    const status = $(el).find('.item-title:eq(6) .name').text()
                    const malScore = $(el).find('.item-title:eq(7) .name').text()
                    const genre = $(el).find('.item-list').children('a').map(function() {
                        const url = $(this).attr('href')
                        const name = $(this).text()
                        return { url, name }

                    }).get()
                    const studios = $(el).find('.item-title:eq(8) a').text()
                    const producers = $(el).find('.item-title:eq(9)').children('a').map(function() {
                        const name = $(this).text()
                        return name.trim()
                    }).get()

                    const info = {
                        japaneseName,
                        synonyms,
                        aired,
                        premiered,
                        durationInfo,
                        status,
                        malScore,
                        genre,
                        studios,
                        producers
                    }

                    return { img, name, details, info }
                },
            }
            ,
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


export { animeInfo }
