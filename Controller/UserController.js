const {EMAIL, PASSWORD} = require("../Config/UserInfo")
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const userModel = require("../Models/UserModel");

const getUser = async (req, res) => {
    try {
        const user = await userModel.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message : "Fetch Api Request Faild" })
    }
};

const register = async (req, res) => {
    const {userName, userEmail, userMessage} = req.body;

    const dbuserModel = new userModel({
        userName : userName,
        userEmail : userEmail,
        userMessage : userMessage
    });
    try {
        const existuser = await userModel.findOne({
            userName : userName,
        });
        if(existuser){
            return res.status(400).json({ message : "User already exist, try again" })
        }
        await dbuserModel.save();
        let config = {
            service : "gmail",
            auth : {
                user : EMAIL,
                pass : PASSWORD,
            }
        };
        let transport = await nodemailer.createTransport(config);
        let mailGenarator = new Mailgen({
            theme : "default",
            product : {
                name : "kaosar Ahamed",
                link : "https://kaosarahamed.online"
            }
        });
        let response = {
            body : {
                name : "Kaosar Theory",
                intro : "Registration Process",
                table : {
                    data : [
                        {
                            Message : "YOu have Sucessfully registration our web application. Now Login to continue..."
                        }
                    ]
                },
                outro : "Looking Forward To You"
            }
        };
        let mail = await mailGenarator.generate(response);
        let message = {
            from : EMAIL,
            to : userEmail,
            subject : "Registration Gateway",
            html : mail
        };
        transport.sendMail(message).then(() => {
            return res.status(200).json({ message : "User Registration Sucessfull, Please check your email" });
        }).catch((err) => {
            return res.status(500).json(err)
        })
    } catch (error) {
        res.status(500).json({ message : "User Registration Faild" })
    }
};


module.exports = {getUser, register};