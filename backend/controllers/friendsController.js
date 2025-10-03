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
            AND friends.user2 IS NULL
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


const createFriendRequest = asyncWrapper(async (req, res) => {
    const currentUsername = req.username
    const usernameToAdd = req.body.username

    if (!usernameToAdd || currentUsername === usernameToAdd) {
        return res.status(400).json({ success: false, message: "Ensure you give the username of the user you want to send the friend request to" })
    }

    const findUser = await sql`
        SELECT *
        FROM users
        WHERE username=${usernameToAdd}
    `

    if (findUser.length === 0) {
        return res.status(404).json({ success: false, message: "No user exists with this username" })
    }

    const existingPendingRequest = await sql`
        SELECT *
        FROM friend_requests
        WHERE (sender=${currentUsername} AND receiver=${usernameToAdd})
            OR (sender=${usernameToAdd} AND receiver=${currentUsername})
    `

    if (existingPendingRequest.length >= 1) {
        return res.status(400).json({ success: false, message: "A friend request has already been sent between you and this user. Please either wait for them to accept it, or check your friend requests" })
    }

    const alreadyFriends = await sql`
        SELECT *
        FROM friends
        WHERE (user1=${currentUsername} AND user2=${usernameToAdd})
            OR (user1=${usernameToAdd} AND user2=${currentUsername})
    `

    if (alreadyFriends.length >= 1) {
        return res.status(400).json({ success: false, message: "You are already friends with each other so you cannot send a friend request" })
    }

    await sql`
        INSERT INTO friend_requests (sender, receiver)
        VALUES (${currentUsername}, ${usernameToAdd})
    `

    res.status(200).json({ success: true, message: `Successfully sent a friend request to ${usernameToAdd}` })
})


const acceptFriendRequest = asyncWrapper(async (req, res) => {
    const currentUsername = req.username
    const usernameRequest = req.body.username

    if (!usernameRequest || currentUsername === usernameRequest) {
        return res.status(400).json({ success: false, message: "Ensure you give the username of who the request comes from" })
    }

    const findUser = await sql`
        SELECT *
        FROM users
        WHERE username=${usernameRequest}
    `

    if (findUser.length === 0) {
        return res.status(404).json({ success: false, message: "No user exists with this username" })
    }

    const findRequest = await sql`
        SELECT *
        FROM friend_requests
        WHERE sender=${usernameRequest} AND receiver=${currentUsername}
    `

    if (findRequest.length === 0) {
        return res.status(404).json({ success: false, message: "Friend request not found" })
    }

    await sql`
        DELETE FROM friend_requests
        WHERE sender=${usernameRequest} AND receiver=${currentUsername}
    `

    await sql`
        INSERT INTO friends (user1, user2)
        VALUES (${currentUsername}, ${usernameRequest})
    `

    res.status(200).json({ success: true, message: `You are now friends with ${usernameRequest}`})
})


const rejectFriendRequest = asyncWrapper(async (req, res) => {
    const currentUsername = req.username
    const usernameRequest = req.body.username

    if (!usernameRequest || currentUsername === usernameRequest) {
        return res.status(400).json({ success: false, message: "Ensure you give the username of who the request comes from" })
    }

    const findRequest = await sql`
        SELECT *
        FROM friend_requests
        WHERE sender=${usernameRequest} AND receiver=${currentUsername}
    `

    if (findRequest.length === 0) {
        return res.status(404).json({ success: false, message: "Friend request not found" })
    }

    await sql`
        DELETE FROM friend_requests
        WHERE (sender=${usernameRequest} AND receiver=${currentUsername})
    `

    res.status(200).json({ success: true, message: `You have successfully rejected the friend request from ${usernameRequest}`})
})


const deleteFriendRequest = asyncWrapper(async (req, res) => {
    const usernameToRemove = req.params.username
    const currentUsername = req.username

    if (currentUsername === usernameToRemove) {
        return res.status(400).json({ success: false, message: "You cannot remove a friend request from yourself" })
    }
  
    const findUser = await sql`
        SELECT *
        FROM users
        WHERE username=${usernameToRemove}
    `

    if (findUser.length === 0) {
        return res.status(404).json({ success: false, message: "No user exists with this username" })
    }

    const currentRequest = await sql`
        SELECT *
        FROM friend_requests
        WHERE sender=${currentUsername} AND receiver=${usernameToRemove}
    `

    if (currentRequest.length === 0) {
        return res.status(404).json({ success: false, message: `You haven't sent a request to ${usernameToRemove} yet` })
    }

    await sql`
        DELETE FROM friend_requests
        WHERE sender=${currentUsername} AND receiver=${usernameToRemove}
    `

    res.status(200).json({
        success: true,
        message: `Successfully deleted the friend request to ${usernameToRemove}`,
        deleted: usernameToRemove
    })
})

const getFriendRequests = asyncWrapper(async (req, res) => {
    
    const incomingRequests = await sql`
        SELECT username, profile_picture
        FROM friend_requests INNER JOIN users
        ON users.username=friend_requests.sender
        WHERE friend_requests.receiver=${req.username}
    `
    const outgoingRequests = await sql`
        SELECT username, profile_picture
        FROM friend_requests INNER JOIN users
        ON users.username=friend_requests.receiver
        WHERE friend_requests.sender=${req.username}
    `

    return res.status(200).json({ success: true, incomingRequests, outgoingRequests })
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

    const existingFriendship = await sql`
        SELECT *
        FROM friends
        WHERE (user1=${currentUsername} AND user2=${usernameToRemove}) 
            OR (user1=${usernameToRemove} AND user2=${currentUsername})
    `

    if (existingFriendship.length === 0) {
        return res.status(404).json({ success: false, message: `You cannot delete ${usernameToRemove} as you are not friends with them` })
    }

    await sql`
        DELETE FROM friends
        WHERE (user1=${currentUsername} AND user2=${usernameToRemove})
            OR (user1=${usernameToRemove} AND user2=${currentUsername})
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
    createFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriendRequest,
    getFriendRequests,
    deleteFriend
}