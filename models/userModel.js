module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.CHAR(36),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM({
                values: [ 'online', 'idle', 'dnd' ]
            }),
            defaultValue: 'online'
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });

    return User;
}