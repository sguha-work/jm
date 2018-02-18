var nodemailer = require('nodemailer');
var os = require('os');      /*For Email Functionality*/
var hbs = require('nodemailer-express-handlebars');
var path = require("path");
var atob = require('atob');

var gmailAccount = {
    user: 'jiya.tech.email@gmail.com',
    pass: atob('YWNoaWxsZXNoZWN0b3IqMQ==')
}
//! create reusable transporter object using the default SMTP transport
const mailer = {};

var getCurrentIp = function () {

    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses[0];

};


mailer.welcomeMail = function (email, done) {
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: gmailAccount
    });
    //   smtpTransport.use('complie', hbs({
    //     viewPath: __dirname,
    //     extName:'.hbs'
    //   }))

    smtpTransport.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: path.join(__dirname, '../views'),
            defaultLayout: 'welcome'
        },
        viewPath: path.join(__dirname, '../views'),
        extName: '.hbs'
    }));

    var mailOptions = {
        from: 'jiya.tech',
        to: email,
        //bcc: '',
        subject: 'Welcome Email',
        template: 'welcome',
        context: {
            username: 'balaji'
        }

    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log('Email sent: ' + info.response);
            done();

        }
    });
}

mailer.activationMail = function (email, token, done) {
    var address = getCurrentIp();
    var img_path_src = path.join(__dirname, '../views/images/top.png');
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: gmailAccount
    });

    smtpTransport.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: path.join(__dirname, '../views'),
            defaultLayout: 'activation'
        },
        viewPath: path.join(__dirname, '../views'),
        extName: '.hbs'
    }));

    var url = address + ':3200/activate/' + token;
    //var url = 'https://jiyatech.au-syd.mybluemix.net/activate/'+token;

    var mailOptions = {
        from: 'jiya.tech',
        to: email,
        //bcc: '',
        subject: 'Activation Email',
        template: 'activation',
        context: {
            username: 'balaji',
            URL: url
        }

    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log('Email sent: ' + info.response);
            smtpTransport.close();
            done();

        }
    });
}


mailer.accountCreationMail = function (email, password, token, done) {
    var address = getCurrentIp();
    var img_path_src = path.join(__dirname, '../views/images/top.png');
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: gmailAccount
    });

    smtpTransport.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: path.join(__dirname, '../views'),
            defaultLayout: 'acc_creation'
        },
        viewPath: path.join(__dirname, '../views'),
        extName: '.hbs'
    }));

    var url = address + ':3200/activate/' + token;
    //var url = 'https://jiyatech.au-syd.mybluemix.net/activate/'+token;

    var mailOptions = {
        from: 'jiya.tech',
        to: email,
        //bcc: '',
        subject: 'Account Creation Email',
        template: 'acc_creation',
        context: {
            email_Id: email,
            _password: password,
            URL: url
        }

    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log('Email sent: ' + info.response);
            smtpTransport.close();
            done();

        }
    });
}




mailer.reportMail = function (obj, done) {
    var address = getCurrentIp();
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: gmailAccount
    });

    var mailOptions = {
        from: 'jiya.tech',
        to: 'jiya.tech.email@gmail.com',
        subject: 'Abuse Mail',
        html: `<b><h3>JIYA</h3></b><br/>
               Hello <b>Admin</b>. The following post has been considered as an abuse by an user.<br>
               <b>Post Details</b><br>
               post : `+ obj.postContent + `,<br>Poster : ` + obj.poster + `,<br>Poster Email : ` + obj.posterEmail + `<br>
               <b>Reporter Details</b><br>
               Reporter : `+ obj.report.reporter + `,<br>Reporter Message : ` + obj.report.reportMsg

    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log('Email sent: ' + info.response);
            done(null, { success: true });

        }
    });
}

mailer.forgetPasswordMail = function (email, password, done) {
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: gmailAccount
    });
    //   smtpTransport.use('complie', hbs({
    //     viewPath: __dirname,
    //     extName:'.hbs'
    //   }))

    smtpTransport.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: path.join(__dirname, '../views'),
            defaultLayout: 'forgetPassword'
        },
        viewPath: path.join(__dirname, '../views'),
        extName: '.hbs'
    }));

    var mailOptions = {
        from: 'jiya.tech',
        to: email,
        //bcc: '',
        subject: 'Password request Email',
        template: 'forgetPassword',
        context: {
            email: email,
            password: password
        }

    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log('Email sent: ' + info.response);
            done();

        }
    });
}
module.exports = mailer;