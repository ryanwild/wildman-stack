export const typeDefs = /* GraphQL */ `
    type SystemInfo {
      uptimeInSeconds: Int
      ready: Boolean!
    }
    type Query {
      SystemInfo: SystemInfo!
      hello: String!
    }
`

export default typeDefs