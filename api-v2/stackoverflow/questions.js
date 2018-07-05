const graphql = require('graphql')
const unirest = require("unirest");


let questionType = new graphql.GraphQLObjectType({
    name: 'Question',
    fields: {
        question_id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        link: { type: graphql.GraphQLString },
        display_name: { type: graphql.GraphQLString }
    }
})


let  get = function () {

    let req = unirest("GET", "https://api.stackexchange.com/2.2/questions");
    req.query({
        "order": "desc",
        "sort": "activity",
        "tag": "JavaScript",
        "site": "stackoverflow"
    });

    return new Promise((resolve, reject) => {
        req.end(function (response) {
            if (response) {
                resolve(response)
            }
            if (response.error) {
                reject(response)
            }
        })
    });
}


let schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            questions: {
                type: new graphql.GraphQLList(questionType),
                args: {
                    id: {
                        type: graphql.GraphQLInt
                    }
                },
                resolve: async function (_, args) {
                    let response = await get().then(function(response) { 
                        return JSON.parse(response.raw_body);
                    });  
                   
                   return response.items;
                }
            }
        }
    })
})

module.exports = schema
