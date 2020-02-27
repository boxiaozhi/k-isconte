const rp = require('request-promise')

class OneService {
    constructor() {
        this.baseUrl = 'http://m.wufazhuce.com'
    }

    async getToken() {
        var uri = this.baseUrl+'/one'
        var cookiejar = rp.jar()
        let options = {
            uri: uri,
            jar: cookiejar,
        }
        let token = ''
        return rp(options)
            .then(function (htmlString) {
                var cookieStr = cookiejar.getCookieString(uri)
                const tokenArr = htmlString.match(/One\.token[\s]*=[\s]*'([0-9a-z]*)'/i)
                token = tokenArr[1]
                return new Promise((resolve) => {
                    resolve({token: token, cookieStr: cookieStr})
                })
            })
            .catch(function (err) {
                return err
            });
    }

    /**
     * 获取列表
     * @param type  类型：one | article | music | movie
     * @param id    以此 ID 为起点倒序查询
     * @returns {Promise<T>}
     */
    async ajaxlist(type, id) {
        var uri = this.baseUrl+'/'+type+'/ajaxlist/'+id
        let res = await this.getToken()
        let token = res.token
        let cookiesStr = res.cookieStr
        var cookiejar = rp.jar();
        cookiejar.setCookie(cookiesStr, uri)
        let options = {
            uri: uri,
            qs: {
                _token: token
            },
            jar: cookiejar,
        }
        console.log(options)
        return rp(options)
            .then(function (json) {
                return new Promise((resolve) => {
                    resolve(json)
                })
            })
            .catch(function (err) {
                return err
            });
    }
}

module.exports = new OneService();