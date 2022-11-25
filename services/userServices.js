import User from '../database/models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUser = async (dataFromService) => {
    try {
        const user = await User.findOne({ email: dataFromService.email })
        if (user) {
            throw new Error('Email already exists')
        }

        const hashPassword = await bcrypt.hash(dataFromService.password, 12)

        const newUser = new User({
            email: dataFromService.email,
            password: hashPassword,
            firstName: dataFromService.firstName,
            lastName: dataFromService.lastName,
        })

        /* ici newUser = valeur instancée de User = valeur retournée par save()
            {
                email: 'jeff@besos.com',
                firstName: 'Jeff',
                lastName: 'Besos',
                id: new ObjectId("6380bba0c7bd52835518fb15")
            }
            Le model crée un utilisateur avec les tous les champs spécifiés lors sa création, lui ajoute un _id.
            C'est cet objet qui sauvegardé dans la db avec les timestamps createdAt et updatedAt (imposé dans le schéma) 
            Par contre dans la valeur retournée par save() le champ password a disparu, _id est renommé en id et _id est supprimé comme indiqué dans le schéma.
        */

        let result = await newUser.save()
        return result
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

const getUserProfile = async (serviceData) => {
    try {
        const jwtToken = serviceData.headers.authorization
            .split('Bearer')[1]
            .trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })

        if (!user) {
            throw new Error('User not found!')
        }

        return user.toObject()
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

const loginUser = async (serviceData) => {
    try {
        const user = await User.findOne({ email: serviceData.email })

        if (!user) {
            throw new Error('User not found!')
        }

        const isValid = await bcrypt.compare(
            serviceData.password,
            user.password
        )

        if (!isValid) {
            throw new Error('Password is invalid')
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY || 'default-secret-key',
            { expiresIn: '1d' }
        )

        return { token }
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

const updateUserProfile = async (serviceData) => {
    try {
        const jwtToken = serviceData.headers.authorization
            .split('Bearer')[1]
            .trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOneAndUpdate(
            { _id: decodedJwtToken.id },
            {
                firstName: serviceData.body.firstName,
                lastName: serviceData.body.lastName,
            },
            { new: true }
        )

        if (!user) {
            throw new Error('User not found!')
        }

        return user.toObject()
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

export { createUser, loginUser, getUserProfile, updateUserProfile }
