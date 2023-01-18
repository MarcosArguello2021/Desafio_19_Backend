export const userDTO = (dbUser) => {
    const users = []
    dbUser.forEach(user => users.push({
        email: user.email,
    }))
    return users;
}
