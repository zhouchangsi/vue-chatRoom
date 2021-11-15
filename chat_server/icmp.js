const ICMP = require('icmp')
const ping = require("net-ping");
const { NetworkProtocol } = require("net-ping");


let ip = ""
let domain = "wwww.jd.com"

exports.pingOption = {
    networkProtocol: ping.NetworkProtocol["1"], // 协议
    packetSize: 16, // 发送包的大小
    retries: 1, // 重试次数
    sessionId: (process.pid % 65535), // 独一无二的session Id
    timeout: 2000, // 超时时间
    ttl: 128 // 生存时间值
}

exports.ping = function (domain, pingOption) {
    let session = ping.createSession(pingOption);
    ICMP.send('www.jd.com', "this is a message")
        .then(obj => {
            ip = obj.ip
        })
        .then(() => {
            session.pingHost(ip, function (error, target, sent, rcvd) {
                let ms = rcvd - sent
                if (error) {
                    console.log(target + ": " + error.toString());

                } else {
                    console.log("======================================")
                    console.log(`网络协议:\t${pingOption.networkProtocol}`)
                    console.log(`发送包的大小:\t${pingOption.packetSize} 字节`)
                    console.log(`重试次数:\t${pingOption.retries}`)
                    console.log(`session id:\t${pingOption.sessionId}`)
                    console.log(`超时时间:\t${pingOption.timeout} 毫秒`)
                    console.log(`生存时间值:\t${pingOption.ttl}`)
                    console.log(`${target} 响应时间:${ms}毫秒`);
                    console.log("======================================")
                }
            });


        })
        .catch(err => console.log(err))
}