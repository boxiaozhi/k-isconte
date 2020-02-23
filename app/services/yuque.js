const rp = require('request-promise')

class YuqueService {
    constructor() {
        this.baseUrl = 'https://www.yuque.com/api/v2'
        this.baseHeader = {
            'User-Agent': 'K-ISCONTE',
            'X-Auth-Token': process.env.YUQUE_TOKEN
        }
    }

    /**
     * 仓库文档列表
     * @param params
     * @returns {Promise<void|any>}
     */
    async docs(params) {
        let uri = this.baseUrl + '/repos' + params.namespace + '/docs'
        let options = {
            method: 'GET',
            uri: uri,
            headers: this.baseHeader
        }
        return rp(options)
            .catch(function (err) {
                return err
            });
    }

    /**
     * 文档详情
     * @param params
     * @returns {Promise<void|any>}
     */
    async docDetail(params) {
        let uri = this.baseUrl + '/repos' + params.namespace + '/docs/'+ params.id
        let options = {
            method: 'GET',
            uri: uri,
            headers: this.baseHeader
        }
        return rp(options)
            .catch(function (err) {
                return err
            });
    }
}

module.exports = new YuqueService();