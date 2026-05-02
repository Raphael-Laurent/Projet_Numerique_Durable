export function requireAuth(req, res, next) {
    if (!req.session || !req.session.utilisateur) {
        return res.status(401).json({ message: "Non connecté." });
    }
    next();
}

export function requireAdmin(req, res, next) {
    if (!req.session || !req.session.utilisateur || !req.session.utilisateur.admin) {
        return res.status(403).json({ message: "Accès refusé." });
    }
    next();
}