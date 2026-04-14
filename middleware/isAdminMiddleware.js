function isAdmin(req,res,next) {
    try {
        if (!req.user) {
            return res.status(401).json({error:'Nincs hitelesítve'})
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({error:'Nincs jogosultságod a művelethez'})
        }

        next()
    } catch (err) {
        return res.status(500).json({error:'Szerver hiba az admin figyelésnél'})
    }
}

module.exports= {isAdmin}