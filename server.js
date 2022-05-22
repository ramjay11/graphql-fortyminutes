// Basic Express Application
const express = require('express')
const expressGraphQL = require('express-graphql')
const {
    GraphQLSchema, 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt, 
    GraphQLNonNull,
    GraphQLScalarType
} = require('graphql')
const app = express()

const bands = [
    { id: 1, band: 'Pantera'},
    { id: 1, band: 'Corrosion Of Conformity'},
    { id: 1, band: 'Achtung Juden'},
    { id: 1, band: 'No Remorse'},
]

const music = [
    {id: 1, name: 'Domination', bandNo: 1 },
    {id: 2, name: 'Albatross', bandNo: 2 },
    {id: 1, name: 'Let The Niggers Kill Each Other', bandNo: 3 },
    {id: 1, name: "The Jews can't do anything", bandNo: 4 },
]

const MusicGenre = new GraphQLObjectType({
    name: 'Music',
    description: 'This represents a music written by the band',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLInt)},
        bandNo: {type: GraphQLNonNull(GraphQLInt)}
    })

})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        music: {
            type: new GraphQLList(MusicGenre),
            description: 'List of All Music',
            resolve: () => music
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

// Create dummy query/ schema
/*const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Hello!',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello There!'
            }
        })
    })
})*/

app.use('/graphql', expressGraphQL({
    schema: schema, 
    graphiql: true
}))
app.listen(5000., () => console.log('Server Running'))