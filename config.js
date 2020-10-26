export default {
    MONGODB_URL: process.env.MONGODB_URI || 'mongodb://localhost/amazona',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}