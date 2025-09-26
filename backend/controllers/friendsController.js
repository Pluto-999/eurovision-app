const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")

const searchForFriends = asyncWrapper(async (req, res) => {
    const usernameToSearch = req.params.username
    const currentUsername = req.username

    if (!usernameToSearch) {
        return res.status(400).json({ success: false, message: "Please provide a username to search for" })
    }

    const users = await sql`
        SELECT username, profile_picture
        FROM users LEFT JOIN friends
        ON (
            (friends.user1=users.username AND friends.user2=${currentUsername}) OR
            (friends.user2=users.username AND friends.user1=${currentUsername})
        )
        WHERE users.username!=${currentUsername}
            AND users.username ILIKE ${usernameToSearch + '%'}
            AND friends.user1 IS NULL
    `

    res.status(200).json({ success: true, users: users })
})


const getFriends = asyncWrapper(async (req, res) => {
    const username = req.username

    const friends = await sql`
        SELECT username, profile_picture
        FROM friends INNER JOIN users
        ON (friends.user1=${username} AND users.username=friends.user2)
        OR (friends.user2=${username} AND users.username=friends.user1)
    `

    res.status(200).json({ success: true, friends: friends })
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

    await sql`
        INSERT INTO friends(user1, user2)
        VALUES (${firstUser}, ${secondUser})
        RETURNING *
    `

    const newFriend = await sql`
        SELECT username, profile_picture
        FROM users
        WHERE username=${usernameToAdd}
    `

    res.status(201).json({ 
        success: true, 
        newFriend: newFriend[0]
    })

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

    res.status(200).json({ 
        success: true, 
        message: `Successfully deleted ${usernameToRemove} as your friend`, 
        deleted: usernameToRemove
    })

})

module.exports = {
    searchForFriends,
    getFriends, 
    addFriend,
    deleteFriend
}