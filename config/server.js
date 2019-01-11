const options = require('../utils/commandOptions');

const { env } = process;

module.exports = {
    // service port
    port: options.port || env.Port || 9200,

    // mongodb address
    database: options.database || env.Database || 'postgresql://rm-uf6vxrx64o9a7zsh57o.pg.rds.aliyuncs.com:3432/web_demo',

    // jwt encryption secret
    jwtSecret: options.jwtSecret || env.JwtSecret || 'jwtSecret',

    // Maximize the number of groups
    maxGroupsCount: 3,

    // qiniu config
    qiniuAccessKey: options.qiniuAccessKey || env.QiniuAccessKey || '',
    qiniuSecretKey: options.qiniuSecretKey || env.QiniuSecretKey || '',
    qiniuBucket: options.qiniuBucket || env.QiniuBucket || '',
    qiniuUrlPrefix: options.qiniuUrlPrefix || env.QiniuUrlPrefix || '',

    allowOrigin: options.allowOrigin || env.AllowOrigin,

    // token expires time
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 7,

    // administrator user id
    administrator: options.administrator || env.Administrator || '',

    // default group name
    defaultGroupName: 'web_demo',
};