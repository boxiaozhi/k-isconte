const rp = require('request-promise')
const cheerio = require('cheerio')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

class SoftwareService {
    constructor() {
        this.sougouUrl = 'http://xiazai.sogou.com/detail'
    }

    async sogou(params) {
        try{
            const adapter = new FileSync(global.basePath +'/db/lowdb/software_sougou.json');
            const db = low(adapter);
            // db.defaults({
            //     data: []
            // }).write()
            let setting = db.get('data')
                .find({ name: params.name})
                .value();

            console.log(setting)
            let uri = this.sougouUrl+setting.url
            console.log(uri)
            let options = {
                method: 'GET',
                uri: uri,
                headers: {
                    Host: 'xiazai.sogou.com',
                    Origin: 'xiazai.sogou.com',
                    Referer: 'xiazai.sogou.com',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                }
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
        } catch (e) {
            console.log('e:', e)
        }

    }

    async sogouFormat(html) {
        let data = {}
        data.source = 'sougou'
        let $ = cheerio.load(html)
        let mainDom = $('.wrap .main_box')
        let infoDom = mainDom.find('.soft_intro_info')
        let txtDom = mainDom.find('.soft_intro_txt')

        let version = infoDom.find('.info_version').text()
        let date = infoDom.find('.info_date').text()
        let size = infoDom.find('.info_size').text()
        let site = txtDom.find('.intro_website a').text()

        data.version = version
        data.updateDate = date
        data.size = size
        data.site = site
        for(let index in data) {
            data[index] = data[index].replace(/.*?：/gi, '')
        }
        return data
    }
}

module.exports = new SoftwareService();