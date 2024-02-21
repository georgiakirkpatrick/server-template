// 1.install node via homebrew with 'brew install node'
// 2. install PostgreSQL with 'npm install pg --save'
// 3. install Knex with 'npm install knex --save'
// 4. install JSON Web Tokens with 'npm install jsonwebtoken'
// install supertest. SuperTest allows you to programmatically make HTTP requests (such as GET, PUT, POST, and DELETE) to your Express API.
// install mocha
// install jest Jest is a JavaScript testing framework that includes both an assertion library and a test runner. You will use Jest to run the backend test suite and to check that the API returns correct results.
// npm install --save-dev jest supertest
// Jest refresher
// Keep in mind that Jest includes the following functions to help you write tests:
// describe(), which groups together a set of related tests
// test() (or it()), which describes an individual test case and is typically nested inside of the describe() function
// The expect object, which provides access to matchers (like toBe() and toEqual()) that allow you to check whether some part of your code has produced an expected outcome
// 5. make sure you have an app.js file for your server
// 5. make sure you have a .env file for your server
// 6. import Knex by requiring it at the top of this file
// 7. import jwt by requiring it at the top of this file

// IMPORTS

// TOOLS AND TECHNOLOGIES TO IMPORT
const knex = require('knex')
const jwt = require('jsonwebtoken')

// IMPORT APP AND FIXTURES
const app = require('../src/app')
const request = require("supertest");
const { makeExampleArray } = require('./example.fixtures')
const { makeAdminArray, makeUserArray } = require('./users.fixtures')

// TESTING SUITE BEGINS WITH A 'describe()'
describe('example endpoints', () => {
    // SIMPLIFY FUNCTIONS WITH DEFINITIONS
    const adminArray = makeAdminArray()
    const userArray = makeUserArray()
    const user = userArray[0]
    const { examplesPost, examplesGet } = makeExampleArray()
    const { malExample, expectedExample } = makeMalExample()

    //　MAKE AUTHORIZATION HEADER IF THERE ARE PROTECTED ENDPOINTS PRESENT
    const makeAuthHeader = (user, secret = process.env.JWT_SECRET) => {
        const token = jwt.sign({ user_id: user.id }, secret, {
                subject: user.email,
                algorithm: 'HS256',
            })
        return `Bearer ${token}`
    }

    // DECLARE THE DATABASE
    // CREATE TEST DATABASE URL IN env FILE
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })
    
    // CONNECT TO DATABASE
    after('disconnect from db', () => db.destroy())
    // CLEAN THE TABLES BEFORE THE FIRST TEST RUNS
    before('clean the tables', () => db.raw('TRUNCATE separate, table names, with commas RESTART IDENTITY CASCADE'))
    // CLEAN THE TABLES AFTER THE EACH TEST RUNS
    afterEach('clean the tables', () => db.raw('TRUNCATE separate, table names, with commas RESTART IDENTITY CASCADE'))

    // GET TESTS
    // BEGIN EACH ENDPOING TEST GROUP WITH A describe()
    describe('GET /api/example', () => {
        context('given there are examples in the database', () => {
            beforeEach(() => db.into('examples').insert(exampleInsert))

            it('responds with 200 and all the examples', async () => {
                const getResponse = await supertest(app)
                    .get('/api/examples')

                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql(exampleGet)
            })
        })

        context('when there are no examples in the database', () => {
            it('responds with 200 and an empty list', async () => {
                const getResponse = await supertest(app)
                    .get('/api/examples')

                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql([])
            })
        })

        context('given a malicious example', () => {
            beforeEach(() => db.into('examples').insert(malExampleInsert))

            it('removes the attack content', async () => {
               const getResponse = await supertest(app)
                    .get('/api/examples')
                
                expect(getResponse.status).to.eql(200)
                expect(getResponse.body[0]).to.eql(malExampleGet[0])
            })
        })
    })

    describe('GET /api/examples/:example_id', () => {
                            const exampleId = exampleInsert.id

                            context('given the example with id example_id exists', () => {
                                it('responds with 200 and returns the example with id example_id', async () => {
                                const getResponse = await supertest(app)
                                        .get(`/api/examples/${exampleId}`)

                                    expect(getResponse.status).to.eql(200)
                                    expect(getResponse.body).to.eql(exampleGet[0])
                                })
                            })

                            context('when the example does not exist', () => {
                                it('responds with 404 and an error message', async () => {
                                const getResponse = await supertest(app)
                                        .get(`/api/examples/${exampleId}`)

                                    expect(getResponse.status).to.eql(404)
                                    expect(getResponse.error.text).to.eql('{"error":{"message":"Example does not exist"}}')
                                })
                            })

                            context('given a malicious example', () => {
                                const malExampleId = malExampleInsert.id

                                it('removes the attack content', async () => {
                                const getResponse = await supertest(app)
                                        .get(`/api/examples/${malExampleId}`)

                                    expect(getResponse.status).to.eql(200)
                                    expect(getResponse.body).to.eql(malExampleGet[0])
                                })
                            })
    })


    describe('GET /api/examples/:example_id/things', () => {
        beforeEach(() => db.into('examples').insert(exampleInsert))
        const exampleId = exampleInsert.id

        context('given there are things in the database', () => {
            
            it('responds with 200 and returns all the things', async () => {
               const getResponse = await supertest(app)
                    .get(`/api/examples/${exampleId}/things`)

                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql(things)
            })
        })

        context('when there are no things in the database', () => {
            it('responds with 200 and an empty list', async () => {
               const getResponse = await supertest(app)
                    .get(`/api/examples/${exampleId}/things`)

                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql([])    
            })
        })

        context('given a malicious thing', () => {
            beforeEach(() => db.into('examples').insert(malExampleInsert))
            beforeEach(() => db.into('examples_to_things').insert(makeMalExampleToMalThing()))
            const malExampleId = malExampleInsert.id

            it('removes the attack content', async () => {
               const getResponse = await supertest(app)
                    .get(`/api/examples/${malExampleId}/things`)

                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql([ expectedThing ])
            })
        })
    })

    describe('Protected endpoints', () => {
        beforeEach(() =>  db.into('users').insert(userArray))

        const invalidSecret = 'bad-secret'
        const invalidUser =  { email: 'not-a-user', password: 'password' }
        const notAnAdmin = { email: user.email, password: user.password }
        const userNoCreds = { email: '', password: '' }
        const validUser = user

        const ProtPostPoints = [
            {
                name: 'POST /api/examples',
                path: '/api/examples'
            }
        ]

        ProtPostPoints.forEach(endpoint => {
            describe(endpoint.name, () => {
                beforeEach(() =>  db.into('example_table').insert(examplesPost))
                it(`responds with 401 and 'Missing bearer token' when no bearer token is provided`, () => {
                    return supertest(app)
                        .post(endpoint.path)
                        .send({})
                        .expect(401, { error: 'Missing bearer token'})
                })

                it(`responds with 401 and 'Unauthorized request' when no credentials are in the token`, () => {
                    return supertest(app)
                        .post(endpoint.path)
                        .set('Authorization', makeAuthHeader(userNoCreds))
                        .send({})
                        .expect(401, { error: 'Unauthorized request' })
                })
    
                it(`responds with 401 and 'Unauthorized request' when the JWT secret is invalid`, () => {
                    return supertest(app)
                        .post(endpoint.path)
                        .set('Authorization', makeAuthHeader(validUser, invalidSecret))
                        .send({})
                        .expect(401, { error: 'Unauthorized request' })
                })
    
                it(`responds with 401 and 'Unauthorized request' when the user is invalid`, () => {                    
                    return supertest(app)
                        .post(endpoint.path)
                        .set('Authorization', makeAuthHeader(invalidUser))
                        .expect(401, { error: 'Unauthorized request' })
                })

                it(`responds with 401 and 'Unauthorized request' when the user is not an admin`, async () => {
                    before('create users', () => db.into('users').insert(hashAdminArray))

                    const patchResponse = await supertest(app)
                        .patch(`/api/examples/${idToUpdate}`)
                        .set('Authorization', makeAuthHeader(notAnAdmin))
                        .send({})
    
                    expect(patchResponse.status).to.eql(401)
                    expect(patchResponse.error.text).to.eql('{"error":"Unauthorized request"}')
                })
            })
        })

        describe('PATCH /api/examples/:example_id', () => {
            beforeEach(() =>  db.into('examples').insert(examplesPost))
            const idToUpdate = examplesPost[0].id
            
            it(`responds with 401 and 'Missing bearer token' when no bearer token is provided`, () => (
                supertest(app)
                    .patch(`/api/examples/${idToUpdate}`)
                    .send({})
                    .expect(401, { error: 'Missing bearer token'})
            ))

            it(`responds with 401 and 'Unauthorized request' when no credentials are in the token`, () => {
                return supertest(app)
                    .patch(`/api/examples/${idToUpdate}`)
                    .set('Authorization', makeAuthHeader(userNoCreds))
                    .send({})
                    .expect(401, { error: 'Unauthorized request' })
            })

            it(`responds with 401 and 'Unauthorized request' when the JWT secret is invalid`, () => {
                return supertest(app)
                    .patch(`/api/examples/${idToUpdate}`)
                    .set('Authorization', makeAuthHeader(validUser, invalidSecret))
                    .send({})
                    .expect(401, { error: 'Unauthorized request' })
            })

            it(`responds with 401 and 'Unauthorized request' when the user is invalid`, () => {                
                return supertest(app)
                    .patch(`/api/examples/${idToUpdate}`)
                    .set('Authorization', makeAuthHeader(invalidUser))
                    .send({})
                    .expect(401, { error: 'Unauthorized request' })
            })

            it(`responds with 401 and 'Unauthorized request' when the user is not an admin`, () => {
                before('create users', () => db.into('users').insert(hashAdminArray))

                return supertest(app)
                    .patch(`/api/examples/${idToUpdate}`)
                    .set('Authorization', makeAuthHeader(notAnAdmin))
                    .send({})
                    .expect(401, { error: 'Unauthorized request' })
            })
        })

        describe('DELETE /api/examples/:example_id', () => {
            beforeEach(() =>  db.into('examples').insert(examplesPost))
            const exampleId = examplesPost[0].id
            
            it(`responds with 401 and 'Missing bearer token' when no bearer token is provided`, () => (
                supertest(app)
                    .delete(`/api/examples/${exampleId}`)
                    .expect(401, { error: 'Missing bearer token'})
            ))

            it(`responds with 401 and 'Unauthorized request' when no credentials are in the token`, () => {
                return supertest(app)
                    .delete(`/api/examples/${exampleId}`)
                    .set('Authorization', makeAuthHeader(userNoCreds))
                    .expect(401, { error: 'Unauthorized request' })
            })

            it(`responds with 401 and 'Unauthorized request' when the JWT secret is invalid`, () => {
                return supertest(app)
                    .delete(`/api/examples/${exampleId}`)
                    .set('Authorization', makeAuthHeader(validUser, invalidSecret))
                    .expect(401, { error: 'Unauthorized request' })
            })

            it(`responds with 401 and 'Unauthorized request' when the user is invalid`, () => {                
                return supertest(app)
                    .delete(`/api/examples/${exampleId}`)
                    .set('Authorization', makeAuthHeader(invalidUserCreds))
                    .expect(401, { error: 'Unauthorized request' })
            })

            it(`responds with 401 and 'Unauthorized request' when the user is not an admin`, () => {
                before('create users', () => db.into('users').insert(hashAdminArray))

                return supertest(app)
                    .delete(`/api/examples/${exampleId}`)
                    .set('Authorization', makeAuthHeader(notAnAdmin))
                    .expect(401, { error: 'Unauthorized request' })
            })
        })
    })    

    describe('POST /api/examples', () => {
        beforeEach(() =>  db.into('example_table').insert(examplesPost))
        beforeEach(() => db.into('users').insert(userArray))

        it('creates an example, responding with 201 and the new example', async () => {
            const postResponse = await supertest(app)
                .post('/api/examples')
                .set('Authorization', makeAuthHeader(user))
                .send(examplePost)

            const getResponse = await supertest(app)
                .get(`/api/examples/${postResponse.body.id}`)

            const expected = new Date().toLocaleString()
            const postCreated = new Date(postResponse.body.created_at).toLocaleString()
            const postUpdated = new Date(postResponse.body.updated_at).toLocaleString()

            const expectedPostBody = {
                id: postResponse.body.id,
                ...examplePost,
                approved_by_admin: false,
                created_at: postResponse.body.created_at,
                updated_at: postResponse.body.updated_at
            }

            const expectedGetBody = {
                ...expectedPostBody,
                example: example.english_name
            }

            expect(postResponse.status).to.eql(201)
            expect(postResponse.headers.location).to.eql(`/api/examples/${postResponse.body.id}`)
            expect(postResponse.body.approved_by_admin).to.eql(false)
            expect(postResponse.body).to.eql(expectedPostBody)
            expect(postCreated).to.eql(expected)
            expect(postUpdated).to.eql(expected)
            expect(getResponse.status).to.eql(200)
            expect(getResponse.body).to.eql(expectedGetBody)
        })

        const requiredFields = [
            'one',
            'two',
            'three',
            'four'    
        ]

        requiredFields.forEach(field => {
            const newExample = {
                one: 1,
                two: 1,
                three: 1,
                four: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newExample[field]

                return supertest(app)
                    .post('/api/examples')
                    .set('Authorization', makeAuthHeader(user))
                    .send(newExample)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body`}
                    })
            })
        })

        context('given a malicious example', () => {
            it('removes the attack content from the response', async () => {
                const postResponse = await supertest(app)
                    .post('/api/examples')
                    .set('Authorization', makeAuthHeader(user))
                    .send(malExamplePost)
                    
                const getResponse = await supertest(app)
                    .get(`/api/examples/${postResponse.body.id}`)

                const expected = new Date().toLocaleString()
                const created = new Date(postResponse.body.created_at).toLocaleString()
                const updated = new Date(postResponse.body.updated_at).toLocaleString()
    
                const expectedPostBody = {
                    id: postResponse.body.id,
                    ...malExamplePost,
                    manufacturer_notes: malExampleGet[0].manufacturer_notes,
                }
    
                const expectedGet = {
                    ...expectedPostBody,
                    example_type: malExampleGet[0].example_type
                }

                expect(postResponse.status).to.eql(201)
                expect(postResponse.headers.location).to.eql(`/api/examples/${postResponse.body.id}`)
                expect(postResponse.body.approved_by_admin).to.eql(false)
                expect(postResponse.body).to.eql(expectedPostBody)
                expect(created).to.eql(expected)
                expect(updated).to.eql(expected)
                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql(expectedGet)
            })            
        })
    })

    describe('PATCH /api/examples/:example_id', () => {
        const exampleId = exampleInsert.id

        context(`when the example with id example_id' exists`, () => {
            it('updates the example and responds with 204', async () => {
                const patchResponse = await supertest(app)
                    .patch(`/api/examples/${exampleId}`)
                    .set('Authorization', makeAuthHeader(admin))
                    .send(fullUpdate)

                const getResponse = await supertest(app)
                    .get(`/api/examples/${exampleId}`)
                
                const expectedExample = {
                    id: idToUpdate,
                    ...fullUpdate,
                    example_type: exampleGet[0].english_name
                }

                const created = new Date(getResponse.body.created_at).toLocaleString()
                const updated = new Date(getResponse.body.updated_at).toLocaleString()
                const expectedCreated = new Date(fullUpdate.created_at).toLocaleString()
                const expectedUpdated = new Date(fullUpdate.updated_at).toLocaleString()

                expect(patchResponse.status).to.eql(204)
                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql(expectedExample)      
                expect(created).to.eql(expectedCreated)
                expect(updated).to.eql(expectedUpdated)
            })

            it('responds with 400 and an error message when no required fields are supplied', async () => {
                const patchResponse = await supertest(app)
                    .patch(`/api/examples/${idToUpdate}`)
                    .set('Authorization', makeAuthHeader(admin))
                    .send({})
                
                expect(patchResponse.status).to.eql(400)    
                expect(patchResponse.error.text).to.eql(`{"error":{"message":"Request body must contain 'example_type_id', 'brand_id', 'manufacturer_country', 'manufacturer_id', 'manufacturer_notes', 'material_type_id', 'material_origin_id', 'material_producer_id','material_notes','approved_by_admin', 'created_at', or 'updated_at'."}}`)
            })

            it('responds with 204 when updating only a subset of fields', async () => {
                const subsetUpdate = {
                    manufacturer_notes: fullUpdate.manufacturer_notes,
                    material_notes: fullUpdate.material_notes
                }

                const patchResponse = await supertest(app)
                    .patch(`/api/examples/${exampleId}`)
                    .set('Authorization', makeAuthHeader(admin))
                    .send(subsetUpdate)

                const getResponse = await supertest(app)
                    .get(`/api/examples/${exampleId}`)

                const expectedExample = {
                    ...exampleInsert,
                    ...subsetUpdate,
                    example_type: ntGet[0].english_name,
                }    

                const created = new Date(getResponse.body.created_at).toLocaleString()
                const updated = new Date(getResponse.body.updated_at).toLocaleString()
                const expectedCreated = new Date(exampleInsert.created_at).toLocaleString()
                const expectedUpdated = new Date(exampleInsert.updated_at).toLocaleString()

                expect(patchResponse.status).to.eql(204)
                expect(getResponse.status).to.eql(200)
                expect(getResponse.body).to.eql(expectedExample)      
                expect(created).to.eql(expectedCreated)
                expect(updated).to.eql(expectedUpdated)
                expect(getResponse.body.manufacturer_notes).to.eql(fullUpdate.manufacturer_notes)
                expect(getResponse.body.material_notes).to.eql(fullUpdate.material_notes)
            })
        })

        context(`when the example with id example_id does not exist`, () => {
            const nonexistantId = exampleId + 1

            it('responds with 404', async () => {
                const patchResponse = await supertest(app)
                    .patch(`/api/examples/${idToUpdate}`)
                    .set('Authorization', makeAuthHeader(admin))
                    .send(fullUpdate)

                expect(patchResponse.status).to.eql(404)
                expect(patchResponse.error.text).to.eql(`{"error":{"message":"Example does not exist"}}`)
            })
        })
    })

    describe('DELETE /api/examples/:example_id', () => {
        beforeEach(() => db.into('users').insert(hashAdminArray))
        const exampleId = exampleInsert.id
        const expectedExamples = exampleGet.filter(example => example.id !== exampleId)

        context(`when the example with id example_id' exists`, () => {
            beforeEach(() => db.into('examples').insert(exampleInsert))
            beforeEach(() => db.into('users').insert(adminArray))

            it('removes the example and responds with 204', async () => {
                const deleteResponse = await supertest(app)
                    .delete(`/api/examples/${idToDelete}`)
                    .set('Authorization', makeAuthHeader(admin))
                    
                const getResponse = await supertest(app)
                    .get(`/api/examples/${idToDelete}`)

                expect(deleteResponse.status).to.eql(204)
                expect(getResponse.status).to.eql(404)
                expect(getResponse.body).to.eql(expectedFactories)
            })
        })

        context(`when the example with id example_id does not exist`, () => {
            it('responds with 404 and an error message', async () => {
                const delResponse = await supertest(app)
                    .delete(`/api/examples/${idToDelete}`)
                    .set('Authorization', makeAuthHeader(admin))

                expect(delResponse.status).to.eql(404)
                expect(delResponse.error.text).to.eql('{"error":{"message":"Example does not exist"}}')
            })
        })
    })
})