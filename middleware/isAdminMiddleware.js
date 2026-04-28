function isAdmin(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Nincs hitelesítve' })
        }

        const normalizedRole = String(req.user.role ?? '').toLowerCase()

        if (normalizedRole !== 'admin' && normalizedRole !== '1') {
            return res.status(403).json({ error: 'Nincs jogosultságod a művelethez' })
        }
        console.log(`normalizedRole: ${normalizedRole}`);
        next()
    } catch (err) {
        return res.status(500).json({ error: 'Szerver hiba az admin figyelésnél' })
    }
}

module.exports = { isAdmin }