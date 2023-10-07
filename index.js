const express = require('express')
const session = require('express-session')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')
    // ROUTE IMPORTS
const userRoutes = require('./routes/userRouter')
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const companyRoute = require('./routes/companyRoute')
const projectRoute = require('./routes/projectRoute')
const taskRoute = require('./routes/taskRoute')
const departmentRoute = require('./routes/departmentRoute')
const designationRoute = require('./routes/designationRoute')
const employeeRoute = require('./routes/employeeRoute')
const budgetRoute = require('./routes/budgetRoute')
const bidRoute = require('./routes/bidRoute')
const slipRoute = require('./routes/slipRoute')
const areaRoute = require('./routes/areaRoute')
const contractTypeRoute = require('./routes/contractTypeRoute')
const chatRoute = require('./routes/chatRoute')
const contractRoute = require('./routes/contractRoute')
const attachmentRoute = require('./routes/attachmentRoute')
const invoiceRoute = require('./routes/invoiceRoute')
const paymentRoute = require('./routes/paymentRoute')
const paymentModeRoute = require('./routes/paymentModeRoute')
const leaveTypeRoute = require('./routes/leaveTypeRoute')
const leaveRoute = require('./routes/leaveRoute')
const payrolRoute = require('./routes/payrolRoute')
const candidateRoute = require('./routes/candidatesRoute')
const monthlytimesheetRoute = require('./routes/monthlyTimesheetRoute')
const settingsRoute = require('./routes/settingsRoute')
const jobOfferRoute = require('./routes/jobOfferRoute')
const agreementRoute = require('./routes/agreementRoute')
const medicalRoute = require('./routes/medicalAllowanceRoute')
const appraisalRoute = require('./routes/appraisalRoute')
const archiveRoute = require('./routes/archiveRoute')
const projectCommentRoute = require('./routes/projectCommentRoute')
const awardLetterRoute = require('./routes/awardLetterRoute')
const procurementRoute = require('./routes/procurementRoute')
const blogRoute = require('./routes/blogRoute')
const blogCategoryRoute = require('./routes/blogCategoryRoute')
const projectReportRoute = require('./routes/projectReportRoute')
const letterRequestRoute = require('./routes/letterRequestRoute')
const membersRoute = require('./routes/membersRoute')
    // End of route imports

// const axi = require('./axi/axi')
// END OF ROUTE IMPORTS
// MODELS URLS
const db = require('./database')
const CompanyModel = require('./models/companyModel')
const ProjectModel = require('./models/projectModel')
const { User } = require('./models/usersModel')
const taskModel = require('./models/taskModel')
const departmentModel = require('./models/departmentModel')
const { employeeModel } = require('./models/employeeModel')
const designationModel = require('./models/designationModel')
const budgetModel = require('./models/budgetModel')
const bidModel = require('./models/bidModel');
// const slipModel = require('./models/slipModel')
const areaModel = require('./models/areaModel')
const contractModel = require('./models/contractModel')
const contractTypeModel = require('./models/contractTypeModel')
const attachmentModel = require('./models/attachmentModel')
const invoiceModel = require('./models/invoiceModel')
const paymentModel = require('./models/paymentModel')
const paymentModeModel = require('./models/paymentModeModel')
const budgetTrackModel = require('./models/budgetTrackModel')
const LeaveModel = require('./models/leaveModel')
const LeaveTypeModel = require('./models/leaveTypeModel')
const PayrolModel = require('./models/payrolModel')
const CandidateModel = require('./models/candidatesModel')
const Monthlytimesheet = require('./models/monthlytimesheetModel')
const AgreementModel = require('./models/agreementModel')
// const AppraisalModel = require('./models/appraisalModels')
const JobOfferModel = require('./models/jobOfferLetterModel')
const MedicalAllowanceModel = require('./models/medicalAllowanceModel')
const SettingsModel = require('./models/settingsModel')
const arvhiveModel = require('./models/archiveModel')
const projectCommentModel = require('./models/projectCommentModel')
const awardLetterModel = require('./models/awardLetterModel')
const procurementModel = require('./models/procurementModel')
const BlogModel = require('./models/blogModel')
const BlogCategoryModel = require('./models/blogCategoryModel')
const projectReportModel = require('./models/projectReportModel')
const letterRequestModel = require('./models/letterRequestModel')
const membersModel = require('./models/membersModel')
// END OF MODELS URLS
require('dotenv').config()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const app = express()
const ejs = require('ejs')
const verifyJwt = require('./middlewares/verifyJwt')


// ASSOCIATIONS





User.hasMany(ProjectModel, { foreignKey: "engineer" }, { onDelete: "SET NULL", onUpdate: "cascade" })
departmentModel.hasMany(employeeModel, {
    onDelete: "SET NULL",
    onUpdate: "cascade"
})
designationModel.hasMany(employeeModel, {
    onDelete: "SET NULL",
    onUpdate: "cascade"
})
ProjectModel.hasMany(taskModel, { foreignKey: 'pid' }, {
    onDelete: "cascade",
    onUpdate: "cascade"
})
ProjectModel.hasMany(budgetModel, {
    onDelete: "SET NULL",
    onUpdate: "cascade"
})

User.hasOne(bidModel, {
    onDelete: 'cascade'
})

bidModel.hasOne(ProjectModel, {
    onDelete: 'SET NULL',
    onUpdate: "cascade"
})
bidModel.belongsTo(ProjectModel)

areaModel.hasMany(employeeModel, {
    onDelete: "SET NULL",
    onUpdate: "cascade"
})

ProjectModel.hasOne(invoiceModel, { onDelete: "SET NULL" })
User.hasOne(invoiceModel, { onDelete: "SET NULL" })

invoiceModel.hasMany(paymentModel, { onDelete: "SET NULL" })

ProjectModel.hasMany(bidModel, { foreignKey: 'ProjectId' }, { onDelete: "SET NULL", onUpdate: "cascade" })
// ProjectModel.hasOne(slipModel, { onDelete: 'cascade' })
// User.hasMany(slipModel, { onDelete: 'SET NULL' })
User.hasOne(contractModel, { onDelete: "SET NULL" })
ProjectModel.hasOne(contractModel, { onDelete: "SET NULL" })
contractTypeModel.hasOne(contractModel, { onDelete: "SET NULL" })
contractModel.hasMany(attachmentModel)
paymentModeModel.hasOne(invoiceModel)
User.hasOne(CompanyModel)
CompanyModel.hasMany(ProjectModel)
ProjectModel.belongsTo(CompanyModel)
budgetModel.hasMany(budgetTrackModel)
departmentModel.hasMany(LeaveModel)
employeeModel.hasMany(LeaveModel)
LeaveModel.belongsTo(employeeModel)
User.hasMany(LeaveModel, { foreignKey: 'checkedBy' })
User.hasMany(LeaveModel, { foreignKey: 'approvedBy' })
    // User.hasMany(LeaveModel, { foreignKey: 'approvedBy' })
LeaveTypeModel.hasMany(LeaveModel)
departmentModel.hasMany(PayrolModel)
employeeModel.hasMany(PayrolModel)
employeeModel.hasMany(Monthlytimesheet)
employeeModel.hasOne(JobOfferModel)
// employeeModel.hasMany(AppraisalModel)
employeeModel.hasMany(MedicalAllowanceModel)
employeeModel.hasOne(AgreementModel)
departmentModel.hasMany(arvhiveModel)
ProjectModel.hasMany(projectCommentModel)
projectCommentModel.belongsTo(ProjectModel)
bidModel.hasOne(awardLetterModel)
awardLetterModel.belongsTo(bidModel)
ProjectModel.hasOne(procurementModel)
procurementModel.belongsTo(ProjectModel)
departmentModel.hasOne(procurementModel)
BlogCategoryModel.hasOne(BlogModel)
BlogModel.belongsTo(BlogCategoryModel)
ProjectModel.hasMany(projectReportModel)
projectReportModel.belongsTo(ProjectModel)
User.hasMany(letterRequestModel)
letterRequestModel.belongsTo(User)
    // ENDOF ASSOCIATIONS



app.use(cors({
    // origin: `${process.env.MAIN_URL}`,
    credentials: true,
    origin: ["http://localhost:5173", process.env.MAIN_URL,'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add the allowed methods
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}))

app.use(fileUpload())
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', userRoutes)
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/companies', companyRoute)
app.use('/projects', projectRoute)
app.use('/tasks', taskRoute)
app.use('/departments', departmentRoute)
app.use('/designations', designationRoute)

app.use('/employees', employeeRoute)
app.use('/bids', bidRoute)
app.use('/chat', chatRoute)
app.use('/budget', budgetRoute)
app.use('/slip', slipRoute)
app.use('/area', areaRoute)
app.use('/contracttype', contractTypeRoute)
app.use('/contract', contractRoute)
app.use('/attachment', attachmentRoute)
app.use('/invoice', invoiceRoute)
app.use('/payment', paymentRoute)
app.use('/paymentmode', paymentModeRoute)
app.use('/leavetype', leaveTypeRoute)
app.use('/leave', leaveRoute)
app.use('/payrol', payrolRoute)
app.use('/candidates', candidateRoute)
app.use('/timesheet', monthlytimesheetRoute)
app.use('/settings', settingsRoute)
app.use('/joboffer', jobOfferRoute)
app.use('/agreement', agreementRoute)
app.use('/medical', medicalRoute)
// app.use('/appraisal', appraisalRoute)
app.use('/archive', archiveRoute)
app.use('/comment', projectCommentRoute)
app.use('/awardletter', awardLetterRoute)
app.use('/procurement', procurementRoute)
app.use('/blog', blogRoute)
app.use('/blogCategory', blogCategoryRoute)
app.use('/projectReport', projectReportRoute)
app.use('/requestLetter', letterRequestRoute)
app.use('/members',membersRoute)
    // END OF ROUTES          


// DB SYNC FUNC
// db.sync({ alter: true })

// END OF DB SYNC FUNC


// console.log('basedir is :', __dirname + '/public');

app.get('/', async(req, res) => {
    try {
        const prlist = await ProjectModel.findAll({ where: { status: 'open' } })
        res.json(prlist)
    } catch (error) {
        res.json({ error: error })
    }

})


app.get('/counts', async(req, res) => {
    const projectsCount = await ProjectModel.count()
    const projects = await ProjectModel.findAll()
    const activeProjectsCount = await ProjectModel.count({ where: { status: "active" } })
    const completedProjects = await ProjectModel.count({ where: { status: "completed" } })
    const countBids = await bidModel.count()
    res.send({ projects, projectsCount, activeProjectsCount, completedProjects, countBids })

})

app.post('/', async(req, res) => {

    const data = req.body
        // console.log('This is from server files  ', req.files);
    try {
        if (req.files === null) return res.send({ error: "All docs are required" }) 

        const license = req.files.license
        const performa = req.files.performa 
        const proposal = req.files.proposal
        const companydoc = req.files.companydoc
        const savedLicense = `${ crypto.randomBytes(5).toString('hex') }
        ${ license.name }
        `
        const savedPerforma = `
        ${ crypto.randomBytes(5).toString('hex') }
        ${ performa.name }
        `
        const savedProposal = `
        ${ crypto.randomBytes(5).toString('hex') }
        ${ proposal.name }
        `
        const savedCompanyDoc = `
        ${ crypto.randomBytes(5).toString('hex') }
        ${ companydoc.name }
        `
        license.mv(`./public/docs/ ${ savedLicense }
        `)
        performa.mv(`./public/docs/ ${ savedPerforma }
        `)
        proposal.mv(`./public/docs/ ${ savedProposal }
        `)
        companydoc.mv(`./public/docs/ ${ savedCompanyDoc }
        `)

        const licenseUrl = `
        $ { process.env.DOC_URL }
        /${savedLicense}`
        const performaUrl = `${process.env.DOC_URL}/${savedPerforma}`
        const proposalUrl = `${process.env.DOC_URL}/${savedProposal}`
        const companydocUrl = `${process.env.DOC_URL}/${savedCompanyDoc}`

        const bid = await bidModel.create({
            fullname: data.fullname,
            phone: data.phone,
            license: licenseUrl,
            performa: performaUrl,
            proposal: proposalUrl,
            companydoc: companydocUrl,
            amount: data.amount,
            status: data.status,
            CompanyId: data.CompanyId,
        });
        res.json('worked')
    } catch (e) {
        res.send({ error: e.message });
    }
})





app.listen(port, () => { console.log(`app running in ${port}`); })
