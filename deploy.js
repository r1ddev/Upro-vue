var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
    user: "netcom",
    // Password optional, prompted if none given
    password: "xd)F37L-",
    host: "netcom.ftp.tools",
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/your-pro.ru/www/",
    include: ["*", "**/*"],      // this would upload everything except dot files
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true
};
 
ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));