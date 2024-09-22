import * as cheerio from 'cheerio';
const URL = 'https://hianime.to'

const scrapeAnime = async () => {
    // TODO: this will get called on the client side
    // const offset = new Date().getTimezoneOffset()
    // const date = $(el).data('date')
    // const data = await fetch(`${URL}/ajax/schedule/list?tzOffset=${offset}&date=${date}`)
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
            newOnZoro: [
                {
                    selector: '.film_list-wrap:eq(1) .flw-item',
                    value: (el) => {
                        const img = $(el).find('img').attr('data-src')
                        const latestEpisodeUrl = URL + $(el).find('a').attr('href')
                        const animeUrl = URL + $(el).find('.film-name a').attr('href')
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
                        const latestEpisodeUrl = URL + $(el).find('a').attr('href')
                        const animeUrl = URL + $(el).find('.film-name a').attr('href')
                        const url = { latestEpisodeUrl, animeUrl }

                        const name = $(el).find('.film-name').text()
                        const type = $(el).find('.film-detail .fd-infor span:first').text()
                        const startDate = $(el).find('.film-detail .fd-infor .fdi-duration').text()
                        const details = { name, type, startDate, }

                        return { img, url, details }
                    },
                }
            ],
            rankToday: [{
                selector: '.tab-content #top-viewed-day .ulclear li',
                value: (el) => {
                    const img = $(el).find('.film-poster img').attr('data-src')
                    const name = $(el).find('.film-name a').text()
                    const url = URL + $(el).find('.film-name a').attr('href')
                    const captions = $(el).find('.tick-sub').text()
                    const dub = $(el).find('.tick-dub').text()
                    const episodes = $(el).find('.tick-eps').text()

                    const details = { captions, dub, episodes, url }


                    return { img, name, details }
                },
            }],
            rankWeek: [{
                selector: '.tab-content #top-viewed-week .ulclear li',
                value: (el) => {
                    const img = $(el).find('.film-poster img').attr('data-src')
                    const name = $(el).find('.film-name a').text()
                    const url = URL + $(el).find('.film-name a').attr('href')
                    const captions = $(el).find('.tick-sub').text()
                    const dub = $(el).find('.tick-dub').text()
                    const episodes = $(el).find('.tick-eps').text()

                    const details = { captions, dub, episodes, url }


                    return { img, name, details }
                },
            }],
            rankMonth: [{
                selector: '.tab-content #top-viewed-month .ulclear li',
                value: (el) => {
                    const img = $(el).find('.film-poster img').attr('data-src')
                    const name = $(el).find('.film-name a').text()
                    const url = URL + $(el).find('.film-name a').attr('href')
                    const captions = $(el).find('.tick-sub').text()
                    const dub = $(el).find('.tick-dub').text()
                    const episodes = $(el).find('.tick-eps').text()

                    const details = { captions, dub, episodes, url }


                    return { img, name, details }
                },
            }],
            trendingPosts: [
                {
                    selector: '.connecting-list .item',
                    value: (el) => {
                        const tag = $(el).find('.gi-top .ztag span:eq(0)').text()
                        const postedTime = $(el).find('.gi-top .ztag span:eq(1)').text()
                        const comments = $(el).find('.gi-stats').text().trim()
                        const postTitle = $(el).find('.item-name a').text()
                        const subject = $(el).find('.subject').text().replace(/\s+/g, ' ').trim();
                        const avatar = $(el).find('.profile-avatar img').attr('src')
                        const username = $(el).find('.profile-avatar img').attr('alt')
                        const badge = $(el).find('.user-name span').text()

                        return { tag, postedTime, comments, postTitle, subject, avatar, username, badge }
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




