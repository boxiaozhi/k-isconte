const { ERROR_CODE } = require("../untils/error")

const Software = require("../models/software")
const SoftwareRecord = require("../models/softwareRecord")
const SoftwareTag = require("../models/softwareTag")

class SoftwareController {
    constructor() {
    }

    async sync(ctx) {
        ctx.verifyParams({
            f: {type: "string", required: false, default: false},
        })
        let force = Boolean(ctx.request.body.f)
        let resSoftware = await Software.sync({force: force})
        let resRecord = await SoftwareRecord.sync({force: force})
        let resTag = await SoftwareTag.sync({force: force})
        ctx.body = {
            status: 200,
            message: '',
            data: {
                software: !!resSoftware,
                record: !!resRecord,
                tag: !!resTag,
            },
        }
    }

    /**
     * 获取标签列表
     * @param ctx
     * @returns {Promise<void>}
     */
    async tagList(ctx) {
        let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1;
        let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 15;
        let offset = (page - 1) * pageSize;
        let limit = offset + pageSize;

        let total = await SoftwareTag.count()
        let res = await SoftwareTag.findAll({
            order: [
                ['id', 'DESC']
            ],
            offset: offset,
            limit: limit,
        })
        ctx.body = {
            status: 200,
            message: '',
            data: {
                total: total,
                start: offset,
                end: limit,
                records: res,
            },
        }
    }

    /**
     * 添加标签
     * @param ctx
     * @returns {Promise<void>}
     */
    async addTag(ctx) {
        ctx.verifyParams({
            name: {type: "string", required: true, default: false},
        })
        let name = (ctx.request.body.name).trim()
        let [user, created] = await SoftwareTag.findOrCreate({
            where: {
                name: name
            }
        })
        ctx.body = {
            status: 200,
            message: '',
            data: {
                res: created,
                user: user,
            },
        }
    }

    /**
     * 修改标签
     * @param ctx
     * @returns {Promise<void>}
     */
    async editTag(ctx) {
        ctx.verifyParams({
            id: {type: "id", required: true, default: false},
            name: {type: "string", required: true, default: false},
        })
        let id = parseInt(ctx.params.id)
        let name = (ctx.request.body.name).trim()

        let idRes = await SoftwareTag.findOne({
            where: {
                id: id
            }
        });
        if (!idRes) {
            ctx.throw(
                200,
                '',
                {
                    code: ERROR_CODE.NOT_FOUND,
                    errors: [
                        {
                            message: 'id 不存在',
                        }
                    ]
                }
            )
        }
        let nameRes = await SoftwareTag.findOne({
            where: {
                name: name,
            }
        });
        if (nameRes && nameRes.id != id) {
            ctx.throw(
                200,
                '标签名已存在',
                {
                    code: ERROR_CODE.EXIST,
                }
            )
        }

        idRes.name = name
        let updateRes = await idRes.save()
        ctx.body = {
            status: 200,
            message: '',
            data: {
                res: updateRes,
            },
        }
    }

    /**
     * 软件列表
     * @param ctx
     * @returns {Promise<void>}
     */
    async softwareList(ctx) {
        let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1;
        let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 15;
        let offset = (page - 1) * pageSize;
        let limit = offset + pageSize;

        let total = await Software.count()
        let res = await Software.findAll({
            order: [
                ['id', 'DESC']
            ],
            offset: offset,
            limit: limit,
        })
        ctx.body = {
            status: 200,
            message: '',
            data: {
                total: total,
                start: offset,
                end: limit,
                records: res,
            },
        }
    }

    /**
     * 添加软件信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async addTag(ctx) {
        ctx.verifyParams({
            name: {type: "string", required: true},
            alias: {type: "string", required: false, default: ''},
            code: {type: "string", required: true},
            tag_ids: { type: 'array', required: false, default: [] },
            rules: { type: 'object', required: true },
        })
        let name = (ctx.request.body.name).trim()
        let [user, created] = await SoftwareTag.findOrCreate({
            where: {
                name: name
            }
        })
        ctx.body = {
            status: 200,
            message: '',
            data: {
                res: created,
                user: user,
            },
        }
    }
}

module.exports = new SoftwareController();