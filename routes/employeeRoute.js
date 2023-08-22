const express = require('express')
const multer = require("multer");
const readXlsxFile = require("read-excel-file/node");
const route = express.Router()
const { employeeModel, validate } = require('../models/employeeModel')
const crypto = require('crypto');
const path = require('path');
const verifyJwt = require('../middlewares/verifyJwt');
const jobOffer = require('../models/jobOfferLetterModel');
const medicalAllowance = require('../models/medicalAllowanceModel')
const appraisalModel = require('../models/appraisalModels')
const agreementModel = require('../models/agreementModel')
const monthlytimesheetModel = require('../models/monthlytimesheetModel')
    // bcrypt = require('bcrypt')
    // const jwt = require('jsonwebtoken')

// const moment = require('moment')
// require('moment/locale/af')
// moment.locale('af');



route.get('/', verifyJwt, async(req, res) => {
    try {
        const empl = await employeeModel.findAll()
        res.json(empl)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})




route.get('/:id', verifyJwt, async(req, res) => {

    const id = req.params.id
    try {
        const Employee = await employeeModel.findOne({ where: { id }, include: [jobOffer, agreementModel, medicalAllowance, appraisalModel, monthlytimesheetModel] })
        if (!Employee) return res.send({ error: "Employee Not Found" })
        res.json(Employee)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyJwt, async(req, res) => {
    const err = validate(req.body)
    if (err) return res.send({ error: 'Data is requried' })
    const id = req.params.id
    const data = req.body
    try {
        const Employee = await employeeModel.findOne({ where: { id } })
        if (!Employee) return res.send({ error: 'Employee Not Found' })
        if (!req.files) {
            Employee.name = data.name
            Employee.email = data.email
            Employee.phone = data.phone
            Employee.status = data.status
            Employee.DepartmentId = data.DepartmentId
            Employee.DesignationId = data.DesignationId
            Employee.hiredDate = data.hiredDate
            Employee.ssn = data.ssn
            Employee.passportNo = data.passportNo
            Employee.contactPhone = data.contactPhone
            Employee.nationality = data.nationality
            Employee.address = data.address
            Employee.birthday = data.birthday
            Employee.AreaId = data.AreaId
            Employee.postCode = data.postCode
            Employee.save()
            return res.send(Employee)
        } else if (req.files && req.files.image) {
            const profilepic = req.files.image
                // console.log('this is profile pic' profilepic);
            const savedProfile = `${crypto.randomBytes(3).toString('hex')}${profilepic.name}`
            profilepic.mv(`./public/employees/${savedProfile}`)
            const empProfilePic = `${process.env.EMPLOYEE_URL}/${savedProfile}`
            Employee.name = data.name
            Employee.email = data.email
            Employee.phone = data.phone
            Employee.status = data.status
            Employee.image = empProfilePic
            Employee.DepartmentId = data.DepartmentId
            Employee.DesignationId = data.DesignationId
            Employee.hiredDate = data.hiredDate
            Employee.ssn = data.ssn
            Employee.passportNo = data.passportNo
            Employee.contactPhone = data.contactPhone
            Employee.nationality = data.nationality
            Employee.address = data.address
            Employee.birthday = data.birthday
            Employee.AreaId = data.AreaId
            Employee.postCode = data.postCode
            Employee.save()
            return res.send(Employee)
        }

    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.get('/delete/:id', verifyJwt, async(req, res) => {
    const id = req.params.id
    try {
        const Employee = await employeeModel.findOne({ where: { id } })
        if (!Employee) return res.send({ error: "Employee Not Found" })
        await Employee.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.post('/', verifyJwt, async(req, res) => {
    const err = validate(req.body)
        // console.log('ERRORR::::::::::', err);
    if (err) return res.send({ error: 'Data is requried' })
    const data = req.body

    const semployee = await employeeModel.findOne({ where: { name: data.name } })
    if (semployee) return res.send({ error: "Employee with this name already exists" })
    if (!req.files) {
        try {
            const Employee = await employeeModel.create({
                name: data.name,
                email: data.email,
                phone: data.phone,
                status: data.status,
                DepartmentId: data.DepartmentId,
                DesignationId: data.DesignationId,
                hiredDate: data.hiredDate,
                ssn: data.ssn,
                passportNo: data.passportNo,
                contactPhone: data.contactPhone,
                nationality: data.nationality,
                address: data.address,
                birthday: data.birthday,
                AreaId: data.AreaId,
                postCode: data.postCode
            });
            res.json(Employee)
        } catch (e) {
            res.send({ error: e.message });
        }
    } else if (req.files && req.files.image) {
        try {
            const profilepic = req.files.image
                // console.log('this is profile pic', profilepic);
            const savedProfile = `${crypto.randomBytes(3).toString('hex')}${profilepic.name}`
            profilepic.mv(`./public/employees/${savedProfile}`)
            const empProfilePic = `${process.env.EMPLOYEE_URL}/${savedProfile}`
            const Employee = await employeeModel.create({
                name: data.name,
                email: data.email,
                phone: data.phone,
                status: data.status,
                image: empProfilePic,
                DepartmentId: data.DepartmentId,
                DesignationId: data.DesignationId,
                hiredDate: data.hiredDate,
                ssn: data.ssn,
                passportNo: data.passportNo,
                contactPhone: data.contactPhone,
                nationality: data.nationality,
                address: data.address,
                birthday: data.birthday,
                postCode: data.postCode,
                AreaId: data.AreaId
            });
            res.json(Employee)
        } catch (e) {
            res.send({ error: e.message });
        }
    }

})








route.post('/upload/file', verifyJwt, async(req, res) => {
    try {
        if (req.files && req.files.file) {
            const extname = path.extname(req.files.file.name)
            if (extname == '.xlsx') {
                const upfile = req.files.file
                const savedFile = `${crypto.randomBytes(5).toString('hex')}${upfile.name}`
                await upfile.mv(`./public/excel/${savedFile}`)
                const fpath = `./public/excel/${savedFile}`
                    // console.log('the file url :', fpath);

                await readXlsxFile(fpath).then(async(rows) => {
                    // skip header
                    // rows.shift();

                    let employeesList = [];
                    // console.log('Rows::::', rows);
                    // return
                    rows.forEach((row, index) => {
                        if (index === 0) return
                            // console.log(row[0], ":::::::::")
                        let emplo = {
                            // id: row[0],
                            name: row[1],
                            email: row[2],
                            phone: row[3],
                            status: row[4],
                            ssn: row[5],
                            passportNo: row[6],
                            contactPhone: row[7],
                            nationality: row[8],
                            address: row[9],
                            postCode: row[10],

                        };
                        // console.log('Employeeeeeeeees||||||||||', emplo);
                        employeesList.push(emplo);
                    });
                    // console.log('the employee list', employeesList);
                    await employeeModel.bulkCreate(employeesList)
                        .then(() => {
                            return res.status(200).json(employeesList);
                        })
                        .catch((error) => {
                            return res.status(500).send({
                                message: "Fail to import data into database!",
                                error: error.message,
                            });
                        });
                });
            } else {
                return res.json({ error: "Excel file is required" })
            }

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.files.file.name,
        });
    }









})



module.exports = route