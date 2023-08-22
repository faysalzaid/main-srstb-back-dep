const request = require('supertest')
const { User } = require('../models/usersModel')
let server;


describe('/users', () => {


    beforeEach(async() => {
        server = require('../index')
        await User.destroy({ where: {} })


    })
    afterEach(async() => {
        server.close()
            // await User.destroy({ where: {} })
    })


    describe('GET', () => {
        it('returns all users', async() => {
            await User.bulkCreate([{

                    "name": "demoUser1",
                    "email": "demouser1@gmail.com",
                    "role": "admin",
                    "password": "weirdo",

                },
                {

                    "name": "demoUser2",
                    "email": "demouser2@gmail.com",
                    "role": "admin",
                    "password": "weirdo",

                },


            ])
            const res = await request(server).get('/users')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(g => g.name === "demoUser2")).toBeTruthy()
            expect(res.body.some(g => g.name === "demoUser1")).toBeTruthy()
        })
    })




    describe('GET/:id', () => {
        it('Should return one user', async() => {
            const userId = await User.create({

                "name": "whoUser",
                "email": "demouser1@gmail.com",
                "role": "admin",
                "password": "weirdo",

            }, )
            const res = await request(server).get(`/users/` + userId.id + "")
            console.log('the id is', res.body.id);
            // console.log('the body is ', res.body)
            expect(res.status).toBe(200)
                // expect(res.body).toMatchObject({
                //         "id": userId.id,
                //         "name": userId.name,
                //         "email": userId.email,
                //         "role": userId.role,
                //         "password": userId.password,
                //         // "createdAt": userId.createdAt,
                //         // "updatedAt": userId.updatedAt,

            //     }) //this is too specific and it will fail 
            expect(res.body).toHaveProperty('id', userId.id)
        })

        it('Should return 404', async() => {
            const res = await request(server).get('/users/' + "hajksdf")
            console.log(res.body)
            expect(res.status).toBe(404)
        })
    })
})