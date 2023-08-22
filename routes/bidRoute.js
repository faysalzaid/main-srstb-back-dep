const express = require('express')
const path = require('path');
const route = express.Router()
const bidModel = require('../models/bidModel')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const verifyjwt = require('../middlewares/verifyJwt')
const adminRoute = require('../middlewares/adminMiddleware');
const awardLetterModel = require('../models/awardLetterModel');
const { equal } = require('assert');
require('dotenv').config()
    // const verifyJwt = require('../middlewares/verifyJwt');
    // const { upload } = require('../imageMiddleware')
    // const { clientModel, validate } = require('../models/clientModel')
    // const moment = require('moment')
    // require('moment/locale/af') 
    // moment.locale('af');




route.get('/', verifyjwt, async(req, res) => {
    try {
        const bid = await bidModel.findAll({
            include: { model: awardLetterModel },
            order: [
                ['fullname', 'ASC']
            ]
        })
        const bidCount = await bidModel.count()
        const approvedBids = await bidModel.count({ where: { status: "approved" } })
        const processingBids = await bidModel.count({ where: { status: "processing" } })
        const rejectedBids = await bidModel.count({ where: { status: "rejected" } })
            // console.log(`${path.join(__dirname+'/pictures')}`);
        res.json({ bid: bid, count: bidCount, approved: approvedBids, processing: processingBids, rejected: rejectedBids })
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})






route.get('/:id', verifyjwt, async(req, res) => {

    const id = req.params.id
    try {
        const bid = await bidModel.findOne({ where: { id }, include: { model: awardLetterModel } })
        if (!bid) return res.send({ error: "bid Not Found" })
        res.json(bid)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})
route.get('/name/:fullname', verifyjwt, async(req, res) => {

    const fullname = req.params.fullname
    try {
        const bid = await bidModel.findOne({ where: { fullname } })
        if (!bid) return res.send({ error: "bid Not Found" })
        res.json(bid)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})

route.post('/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const bid = await bidModel.findOne({ where: { id } })
        if (!bid) return res.send({ error: 'bid Not Found' })
        let bidUserPicD
        let performaD
        let licenseD
        let proposalD
        let companydocD
        if (!req.files) {
            bid.fullname = data.fullname
            bid.phone = data.phone
            bid.status = data.status
            bid.amount = parseFloat(data.amount)
            bid.UserId = data.UserId
            bid.score = data.score
            bid.description = data.description
            bid.ProjectId = data.ProjectId
            await bid.save()
            return res.json(bid)
        }
        if (req.files && req.files.bidUserPic) {
            const bidUserPic = req.files.bidUserPic
            const savedBidUserPic = `${crypto.randomBytes(5).toString('hex')}${bidUserPic.name}`
            bidUserPic.mv(`./public/profiles/${savedBidUserPic}`)
            const bidUserPicUrl = `${process.env.PROFILE_URL}/${savedBidUserPic}`
            bidUserPicD = bidUserPicUrl
        } else {
            bidUserPicD = data.bidUserPic
        }
        if (req.files && req.files.license) {
            const license = req.files.license
            const savedLicense = `${crypto.randomBytes(5).toString('hex')}${license.name}`
            license.mv(`./public/docs/${savedLicense}`)
            const savedLicenseUrl = `${process.env.DOC_URL}/${savedLicense}`
            licenseD = savedLicenseUrl
        } else {
            licenseD = data.license
        }
        if (req.files && req.files.performa) {
            const performa = req.files.performa
            const savedPerforma = `${crypto.randomBytes(5).toString('hex')}${performa.name}`
            performa.mv(`./public/docs/${savedPerforma}`)
            savedPerformaUrl = `${process.env.DOC_URL}/${savedPerforma}`
            performaD = savedPerformaUrl
        } else {
            performaD = data.performa
        }
        if (req.files && req.files.proposal) {
            const proposal = req.files.proposal
            const savedProposal = `${crypto.randomBytes(5).toString('hex')}${proposal.name}`
            proposal.mv(`./public/docs/${savedProposal}`)
            const savedProposalUrl = `${process.env.DOC_URL}/${savedProposal}`
            proposalD = savedProposalUrl
        } else {
            proposalD = data.proposal
        }
        if (req.files && req.files.companydoc) {
            const companydoc = req.files.companydoc
            const savedCompanyDoc = `${crypto.randomBytes(5).toString('hex')}${companydoc.name}`
            companydoc.mv(`./public/docs/${savedCompanyDoc}`)
            const savedCompanyDocUrl = `${process.env.DOC_URL}/${savedCompanyDoc}`
            companydocD = savedCompanyDocUrl
        } else {
            companydocD = data.companydoc
        }

        await bid.update({
            fullname: data.fullname,
            phone: data.phone,
            license: licenseD,
            performa: performaD,
            proposal: proposalD,
            companydoc: companydocD,
            status: data.status,
            amount: parseFloat(data.amount),
            CompanyId: data.CompanyId,
            UserId: data.UserId,
            score: data.score,
            description: data.description,
            ProjectId: data.ProjectId,
            bidUserPic: bidUserPicD
        }, { where: { id } });
        return res.json(bid)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})


route.delete('/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    try {
        const bid = await bidModel.findOne({ where: { id } })
        if (!bid) return res.send({ error: "bid Not Found" })
        if (bid.selected) return res.json({ error: "This bid is selected as a winner bid, select another bid then delete it" })
        await bid.destroy()
        res.send('Successfully deleted')
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.post('/evaluate/:id', verifyjwt, async(req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const bid = await bidModel.findOne({ where: { id } })
        if (!bid) return res.send({ error: "bid Not Found" })

        bid.evaluationStatus = data.evaluationStatus
        bid.score = data.score
        if (req.files) {
            const file = req.files.evaluationFile
            console.log('this is evaluation file :::::::::::::::::::::::', req.files.evaluationFile);
            const savedEvFile = `${crypto.randomBytes(3).toString('hex')}${file.name}`
            file.mv(`./public/docs/${savedEvFile}`)
            const evFileUrl = `${process.env.DOC_URL}/${savedEvFile}`
            bid.evaluationFile = evFileUrl
            await bid.save()
        } else {
            await bid.save()
        }

        res.send(bid)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})



route.post('/', verifyjwt, async(req, res) => {

    const data = req.body
    try {
        if (req.files === null) return res.send({ error: "All docs are required" })

        const license = req.files.license
        const performa = req.files.performa
        const proposal = req.files.proposal
        const companydoc = req.files.companydoc
        const bidUserPic = req.files.bidUserPic
        const savedLicense = `${crypto.randomBytes(5).toString('hex')}${license.name}`
        const savedPerforma = `${crypto.randomBytes(5).toString('hex')}${performa.name}`
        const savedProposal = `${crypto.randomBytes(5).toString('hex')}${proposal.name}`
        const savedCompanyDoc = `${crypto.randomBytes(5).toString('hex')}${companydoc.name}`
        const savedBidUserPic = `${crypto.randomBytes(5).toString('hex')}${bidUserPic.name}`

        license.mv(`./public/docs/${savedLicense}`)
        performa.mv(`./public/docs/${savedPerforma}`)
        proposal.mv(`./public/docs/${savedProposal}`)
        companydoc.mv(`./public/docs/${savedCompanyDoc}`)
        bidUserPic.mv(`./public/profiles/${savedBidUserPic}`)

        const savedLicenseUrl = `${process.env.DOC_URL}/${savedLicense}`
        const savedPerformaUrl = `${process.env.DOC_URL}/${savedPerforma}`
        const savedProposalUrl = `${process.env.DOC_URL}/${savedProposal}`
        const savedCompanyDocUrl = `${process.env.DOC_URL}/${savedCompanyDoc}`

        const bidUserPicUrl = `${process.env.PROFILE_URL}/${savedBidUserPic}`
        const bid = await bidModel.create({
            fullname: data.fullname,
            phone: data.phone,
            license: savedLicenseUrl,
            performa: savedPerformaUrl,
            proposal: savedProposalUrl,
            companydoc: savedCompanyDocUrl,
            amount: parseFloat(data.amount),
            status: data.status,
            CompanyId: data.CompanyId,
            UserId: data.UserId,
            score: data.score,
            description: data.description,
            ProjectId: data.ProjectId,
            bidUserPic: bidUserPicUrl
        });
        res.json(bid)
    } catch (error) {
        const msg = error.errors ? error.errors[0].message : 'An error Ocurred'
        res.json({ error: msg })
    }
})





module.exports = route