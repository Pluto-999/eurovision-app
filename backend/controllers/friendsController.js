const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")

const searchForFriends = asyncWrapper(async (req, res) => {
    const usernameToSearch = req.params.username
    const currentUsername = req.username

    const users = await sql`
        SELECT username
        FROM users
        WHERE username!=${currentUsername} 
            AND username ILIKE ${usernameToSearch + '%'}
    `
    if (users.length === 0) {
        return res.status(404).json({ success: false, message: "No users exist" })
    }

    res.status(200).json({ success: true, users: users })
})


const getFriends = asyncWrapper(async (req, res) => {
    const username = req.username

    const primaryFriends = await sql`
        SELECT user2
        FROM friends
        WHERE user1=${username}
    `

    const secondaryFriends = await sql`
        SELECT user1
        FROM friends
        WHERE user2=${username}
    `

    const allFriends = [
        ...primaryFriends.map(f => f.user2),
        ...secondaryFriends.map(f => f.user1)
    ]

    res.status(200).json({ success: true, friends: allFriends })
})


const addFriend = asyncWrapper(async (req, res) => {
    
    const usernameToAdd = req.body.username

    if (!usernameToAdd) {
        return res.status(400).json({ success: false, message: "Ensure you give the username of the friend you want to add" })
    }

    const friendToAdd = await sql`
        SELECT username
        FROM users
        WHERE username=${usernameToAdd}
    `

    if (friendToAdd.length === 0) {
        return res.status(404).json({ success: false, message: "No user exists with this username" })
    }

    const currentUsername = req.username

    if (currentUsername === friendToAdd[0]["username"]) {
        return res.status(400).json({ success: false, message: "You cannot add yourself as a friend" })
    }    

    // now check if the two users are already friends
    
    const [firstUser, secondUser] = [currentUsername, usernameToAdd].sort()

    const existingFriendship = await sql`
        SELECT *
        FROM friends
        WHERE user1=${firstUser} AND user2=${secondUser}
    `

    if (existingFriendship.length > 0) {
        return res.status(400).json({ success: false, message: "You are already friends with this user" });
    }

    // otherwise we can now add the friend

    const newFriendship = await sql`
        INSERT INTO friends(user1, user2)
        VALUES (${firstUser}, ${secondUser})
        RETURNING *
    `

    res.status(201).json({ success: true, newFriendship: newFriendship[0] })

})


const deleteFriend = asyncWrapper(async (req, res) => {
    const usernameToRemove = req.params.username
    const currentUsername = req.username

    if (currentUsername === usernameToRemove) {
        return res.status(400).json({ success: false, message: "You cannot remove yourself as a friend" })
    }

    const findUser = await sql`
        SELECT *
        FROM users
        WHERE username=${usernameToRemove}
    `

    if (findUser.length === 0) {
        return res.status(404).json({ success: false, message: "No user exists with this username" })
    }
    
    const [firstUser, secondUser] = [usernameToRemove, currentUsername].sort()

    const existingFriendship = await sql`
        SELECT *
        FROM friends
        WHERE user1=${firstUser} AND user2=${secondUser}
    `

    if (existingFriendship.length === 0) {
        return res.status(404).json({ success: false, message: `You cannot delete ${usernameToRemove} as you are not friends with them` })
    }

    await sql`
        DELETE FROM friends
        WHERE user1=${firstUser} AND user2=${secondUser}
    `

    res.status(200).json({ success: true, message: `Successfully deleted ${usernameToRemove} as your friend` })

})

module.exports = {
    searchForFriends,
    getFriends, 
    addFriend,
    deleteFriend
}