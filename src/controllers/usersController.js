const userSchemas = require("../schemas/userSchemas");
const usersRepository = require("../repositories/usersRepository");
const sessionsRepository = require("../repositories/sessionsRepository");

async function postSignUp(req, res) {
    const userParams = req.body; 
    
    const { error } = userSchemas.signUp.validate(userParams);
    if (error) {
        return res.status(422).send({ error: error.details[0].message });    
        
    }
    
    const emailChecking = await usersRepository.checkEmailUnique(userParams)
    
    if (emailChecking) return res.status(409).json({ error: "Email is already in use" });

    const user = await usersRepository.createNewUser(userParams);
    const userData = usersRepository.getUserData(user);
    return res.status(201).send(userData);  
}

async function postSignIn(req, res) {
    const userParams = req.body;

    const { error } = userSchemas.signIn.validate(userParams);
    if (error) return res.status(422).send({ error: error.details[0].message })
    
    const user = await usersRepository.checkEmailPassword(userParams);
    
    if (!user) return res.status(401).send({ error: "Wrong email or password" });
    
    const userId = user.id;
    const { token } = await sessionsRepository.createByUserId(userId);
    
    const userData = usersRepository.getUserData(user, token);
    
    return res.send(userData);
};

async function postSignOut(req, res) {
    const result = await sessionsRepository.deleteSession(req.user.id);  
    res.sendStatus(result)
};


module.exports = {
    postSignUp,
    postSignIn,
    postSignOut
};