import Category from './Category.js'
import Message from './Message.js'
import Price from './Price.js'
import Property from './Property.js'
import User from './User.js'

//Price.hasOne(Property)
Property.belongsTo(Price, {
    foreignKey: 'priceid'
})

Property.belongsTo(Category, {
    foreignKey: 'categoryid'
})

Property.belongsTo(User, {
    foreignKey: 'userid'
})

Message.belongsTo(Property,{
    foreignKey: 'propertyid'
})

Message.belongsTo(User,{
    foreignKey: 'userid'
})

export {
    Property,
    Price,
    Category,
    User,
    Message
}