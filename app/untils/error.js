const ERROR_CODE = {
    'NOT_FOUND': 4001,
    'EXIST': 4002,
}

const ERROR_MSG = {
    1001: '请重新获取',
    4001: '未找到数据',
}

function codeDeal(err) {
    let code = err.code || err.status
    if (err.status == 401){
        code = 1001
    }
    return code
}

let errorFormat = function (err) {
    let code = codeDeal(err)
    let massage = ''
    if (err.status.toString().length == 3) {
        massage = ERROR_MSG[code] || err.message || 'unknown error'
    } else {
        massage = err.message || ERROR_MSG[code] || 'unknown error'
    }

    return {
        status: err.status,
        code: code,
        message: massage,
        errors: err.errors || [],
        data: {},
    }
}

module.exports = { errorFormat,ERROR_CODE }