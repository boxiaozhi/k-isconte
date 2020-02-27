const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

class AboutController {
    /**
     * 获取配置信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async setting(ctx) {
        const username = process.env.ADMIN_USERNAME;
        const adapter = new FileSync('./db/lowdb/user_setting.json');
        const db = low(adapter);

        console.log(username)
        db.defaults({
            setting: []
        }).write()
        let setting = db.get('setting')
            .find({ username: username})
            .value();
        delete setting.username
        ctx.body = {
            status: 200,
            message: '',
            data: setting
        }
    }
}

module.exports = new AboutController();