const rp = require('request-promise')
const cheerio = require('cheerio')

class DoubanService {
    constructor() {
        this.baseUrl = 'https://www.douban.com'
        this.loginUrl = 'https://accounts.douban.com'
        this.movieUrl = 'https://movie.douban.com'
        this.accountUrl = 'https://accounts.douban.com'
        this.commonHeaders = {
            Host: 'accounts.douban.com',
            Origin: 'https://accounts.douban.com',
            Referer: 'https://accounts.douban.com/passport/login',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }

    /**
     * 登录
     * @returns {Promise<T>}
     */
    async login() {
        var uri = this.loginUrl+'/j/mobile/login/basic'
        var cookiejar = rp.jar()
        let options = {
            method: 'POST',
            uri: uri,
            jar: cookiejar,
            formData: {
                ck: '',
                name: process.env.DOUBAN_USERNAME,
                password: process.env.DOUBAN_PASSWORD,
                remember: 'false',
                ticket: '',
            },
            headers: {
                Host: 'accounts.douban.com',
                Origin: 'https://accounts.douban.com',
                Referer: 'https://accounts.douban.com/passport/login',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }
        return rp(options)
            .then(function (response) {
                var cookieStr = cookiejar.getCookieString(uri)
                return new Promise((resolve) => {
                    resolve({cookieStr: cookieStr})
                })
            })
            .catch(function (err) {
                return err
            });
    }

    /**
     * 【账号信息】页面
     * @returns {Promise<T>}
     */
    async accountHtml() {
        var uri = this.accountUrl+'/passport/setting'
        let res = await this.login()
        let cookiesStr = res.cookieStr
        var cookiejar = rp.jar();
        cookiejar.setCookie(cookiesStr, uri)
        let options = {
            method: 'GET',
            uri: uri,
            jar: cookiejar,
        }
        return rp(options)
            .then(function (html) {
                return new Promise((resolve) => {
                    resolve(html)
                })
            })
            .catch(function (err) {
                return err
            });
    }

    /**
     * 【看过】页面
     * @param params
     * @returns {Promise<T>}
     */
    async movieCollect(params) {
        let uri = this.movieUrl+'/people/'+params.id+'/collect'
        let options = {
            method: 'GET',
            uri: uri,
            qs: params,
        }
        return rp(options)
            .then(function (html) {
                return new Promise((resolve) => {
                    resolve(html)
                })
            })
            .catch(function (err) {
                return err
            });
    }

    /**
     * 【看过】页面，内容格式化
     * @param html
     * @returns {Promise<[]>}
     */
    async movieDataFormat(html) {
        var data = []
        let res = {}
        let $ = cheerio.load(html)
        let items = $('#wrapper .article .item')

        for (let i = 0; i < items.length; i++) {
            let item = items[i]

            let infoDom = $(item).find('.info')
            let picDom = $(item).find('.pic')
            let titleDom = $(infoDom).find('li.title a')
            let introDom = $(infoDom).find('li.intro')
            let linkDom = $(picDom).find('a')
            let dateDom = $(infoDom).find('li > span.date')
            let picSrcDom = $(picDom).find('a > img')

            let titleValue = $(titleDom).text().replace(/<em>|<\/em>|\s{3,}/gi, '')
            let introValue = $(introDom).text()
            let linkValue = $(linkDom).attr('href')
            let dateValue = $(dateDom).text().replace(/\s/gi, '')
            let picSrcValue = $(picSrcDom).attr('src')

            data.push({
                title: titleValue,
                intro: introValue,
                link: linkValue,
                date: dateValue,
                pic: picSrcValue,
            })
        }

        let numberStr = $('#wrapper #content .mode .subject-num').text().replace(/\s/gi, '')
        let numberArr = numberStr.split('/')
        let total = parseInt(numberArr[1])
        let startEnd = numberArr[0].split('-')
        let start = parseInt(startEnd[0])
        let end = parseInt(startEnd[1])
        res.total = total
        res.start = start
        res.end = end
        res.data = data
        return res
    }

    /**
     * 个人主页
     * @param params
     * @returns {Promise<T>}
     */
    async people(params) {
        var uri = this.baseUrl+'/people/'+params.id+'/'
        let options = {
            method: 'GET',
            uri: uri,
            headers: {
                "Accept": " text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Encoding": " gzip",
                "Accept-Language": " zh-CN,zh;q=0.9,en;q=0.8,fr;q=0.7,ja;q=0.6,th;q=0.5,zh-TW;q=0.4",
                "User-Agent": " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
            },
            gzip: true,
        }
        return rp(options)
            .then(function (html) {
                return new Promise((resolve) => {
                    resolve(html)
                })
            })
            .catch(function (err) {
                return err
            });
    }

    /**
     * 个人主页，内容格式化
     * @param html
     * @returns {Promise<[]>}
     */
    async peopleDataFormat(html) {
        let $ = cheerio.load(html, {
            decodeEntities: false
        })
        let contentDom = $('#wrapper #content')
        let profileDom = $(contentDom).find('#db-usr-profile')
        let avatarDom = $(profileDom).find('.pic a img')
        let infoDom = $(profileDom).find('.info')
        let asideDom = $(contentDom).find('.aside')
        let infoboxDom = $(asideDom).find('.infobox')
        let baseInfoDom = $(asideDom).find('#profile .infobox .basic-info')

        let avatarValue = $(avatarDom).attr('src')
        let nickNameValue = $(infoDom).find('h1').html()
        if(nickNameValue) {
            nickNameValue = nickNameValue.replace(/<div[\s\S]*<\/div>|[\s]{2,}/gi, '')
        }
        let signatureValue = $(infoDom).find('h1 #display').text()

        let movieCountDom = $(contentDom).find('#movie .pl a')
        let movieDoValue = 0
        let movieWishValue = 0
        let movieCollectValue = 0
        for(let i = 0; i < movieCountDom.length; i++) {
            let text = $(movieCountDom[i]).text()
            if(/在看/g.test(text)) {
                movieDoValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
            if(/想看/g.test(text)) {
                movieWishValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
            if(/看过/g.test(text)) {
                movieCollectValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
        }

        let bookDoValue = 0
        let bookWishValue = 0
        let bookCollectValue = 0
        let bookCountDom = $(contentDom).find('#book .pl a')
        for(let i = 0; i < bookCountDom.length; i++) {
            let text = $(bookCountDom[i]).text()
            if(/在读/g.test(text)) {
                bookDoValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
            if(/想读/g.test(text)) {
                bookWishValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
            if(/读过/g.test(text)) {
                bookCollectValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
        }

        let musicDoValue = 0
        let musicWishValue = 0
        let musicCollectValue = 0
        let musicCountDom = $(contentDom).find('#music .pl a')
        for(let i = 0; i < musicCountDom.length; i++) {
            let text = $(musicCountDom[i]).text()
            if(/在听/g.test(text)) {
                musicDoValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
            if(/想听/g.test(text)) {
                musicWishValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
            if(/听过/g.test(text)) {
                musicCollectValue = parseInt(text.replace(/[^0-9]/gi, ''))
            }
        }

        let locationValue = $(baseInfoDom).find('.user-info a').text()
        let idCreateTime = $(baseInfoDom).find('.user-info .pl').text()
        let idCreateTimeArr = idCreateTime.split(/[\s]+/)
        let idValue = idCreateTimeArr[0]
        let createTimeValue = idCreateTimeArr[1]
        if(createTimeValue) {
            createTimeValue = createTimeValue.replace('加入', '')
        }
        let introValue = $(infoboxDom).find('.user-intro #intro_display').text()

        return {
            id: idValue,
            avatar: avatarValue,
            nickName: nickNameValue,
            signature: signatureValue,
            intro: introValue,
            location: locationValue,
            createTime: createTimeValue,
            movie: {
                do: movieDoValue,
                wish: movieWishValue,
                collect: movieCollectValue,
            },
            book: {
                do: bookDoValue,
                wish: bookWishValue,
                collect: bookCollectValue,
            },
            music: {
                do: musicDoValue,
                wish: musicWishValue,
                collect: musicCollectValue,
            }
        }
    }

    async statuses() {
        var uri = this.baseUrl+'/people/'+params.id+'/statuses'
        let options = {
            method: 'GET',
            uri: uri,
            headers: {
                "Accept": " text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Encoding": " gzip",
                "Accept-Language": " zh-CN,zh;q=0.9,en;q=0.8,fr;q=0.7,ja;q=0.6,th;q=0.5,zh-TW;q=0.4",
                "User-Agent": " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
            },
            gzip: true,
        }
        return rp(options)
            .then(function (html) {
                return new Promise((resolve) => {
                    resolve(html)
                })
            })
            .catch(function (err) {
                return err
            });
    }
}

module.exports = new DoubanService();