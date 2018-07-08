const graphql = require('graphql')
const unirest = require("unirest");


let questionType = new graphql.GraphQLObjectType({
    name: 'Question',
    fields: {
        question_id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        link: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        is_answered : {type: graphql.GraphQLBoolean},
        score : {type: graphql.GraphQLInt},
        tags: { type: new graphql.GraphQLList(graphql.GraphQLString) }
    }
})


let  get = function (args) {
    let query = {
        "order": "desc",
        "sort": args.sort,
        "pagesize": args.limit,
        "tagged": args.tag,
        "site": "stackoverflow"
    };

    if(args.sort=='votes'){
        query.min = args.score;
    }

    let req = unirest("GET", "https://api.stackexchange.com/2.2/questions").query(query);

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
};


let schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            questions: {
                type: new graphql.GraphQLList(questionType),
                args: {
                    tag: {
                        type: graphql.GraphQLString
                    },
                    limit: {
                        type: graphql.GraphQLInt
                    },
                    score: {
                        type: graphql.GraphQLInt
                    },
                    sort: {
                        type: graphql.GraphQLString
                    }
                },
                resolve: async function (_, args) {
                    console.log("request with args", args);
                    let response = await get(args).then(function(response) { 
                        return JSON.parse(response.raw_body);
                    });   
                   return response.items;
                }
            }
        }
    })
});

module.exports = schema;
