const makeMalNotionType = () => {
    const malNtPost = {
        english_name: '<a>button</a>'
    }

    const malNtInsert = {
        id: 666,
        english_name: '&lt;a&gt;button&lt;/a&gt;',
        approved_by_admin: true,
        created_at: '2020-09-13T07:30:51.564Z',
        updated_at: '2020-09-13T07:30:51.564Z'
    }

    const malNtGet = [malNtInsert]

    return {
        malNtPost,
        malNtInsert,
        malNtGet
    }
}

const makeMalNotion = () => {
    const malNotionPost = {
        notion_type_id: 666,
        brand_id: 666,
        manufacturer_country: 1,
        manufacturer_id: 666,
        manufacturer_notes: 'These are the <a href="www.notes.com">notes</a>',
        material_type_id: 666,
        material_origin_id: 1,
        material_producer_id: 666,
        material_notes: 'These are the <a href="www.notes.com">notes</a>',
    }

    const malNotionInsert = {
        ...malNotionPost,
        id: 666,
        approved_by_admin: true,
        created_at: '2020-09-13T07:30:51.564Z',
        updated_at: '2020-09-13T07:30:51.564Z'
    }

    const malNotionGet = [
        {
            ...malNotionInsert,
            notion_type: makeMalNotionType().malNtGet[0].english_name,
            manufacturer_notes: 'These are the &lt;a href="www.notes.com"&gt;notes&lt;/a&gt;',
            material_notes: 'These are the &lt;a href="www.notes.com"&gt;notes&lt;/a&gt;'
        }
    ]

    return {
        malNotionPost,
        malNotionInsert,
        malNotionGet
    }
}

const makeNotionType = () => {
    const ntPost = {
        english_name: 'button'
    }

    const ntInsert = {
        ...ntPost,
        id: 1,
        approved_by_admin: false,
        created_at: '2020-10-01T23:47:20.381Z', // fix this eventually - remove this line and then get all tests to pass
        updated_at: '2023-03-07T23:04:54.568Z' // fix this eventually - remove this line and then get all tests to pass
    }

    const ntGet = [ntInsert]

    return { ntPost, ntInsert, ntGet }
}

const makeNotionArray = () => {
    const notionPost = {
        notion_type_id: 1,
        brand_id: 1,
        manufacturer_country: 1,
        manufacturer_id: 1,
        manufacturer_notes: 'These are the notes',
        material_type_id: 1,
        material_origin_id: 1,
        material_producer_id: 1,
        material_notes: null,
    }

    const notionInsert = {
        ...notionPost,
        id: 1,
        approved_by_admin: true,
        created_at: '2020-09-13T07:30:51.564Z',
        updated_at: '2020-09-13T07:30:51.564Z'
    }

    const notionGet = [
        {
            ...notionInsert,
            notion_type: makeNotionType().ntPost.english_name
        }
    ]

    return { notionPost, notionInsert, notionGet }
}

const makeNotsToCerts = () => ([
    {
        certification_id: 1,
        notion_id: 1
    },
    {
        certification_id: 2,
        notion_id: 1
    },
    {
        certification_id: 3,
        notion_id: 1
    }
])

const makeMalNotToMalCert = () => ([
    {
        certification_id: 666,
        notion_id: 666
    }
])

module.exports = {
    makeMalNotionType,
    makeMalNotion,
    makeNotionArray,
    makeNotionType,
    makeNotsToCerts,
    makeMalNotToMalCert
}