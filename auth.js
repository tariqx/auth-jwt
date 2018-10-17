const fs 		= require('fs');
const jwt 		= require('jsonwebtoken');

const prvKey 	= fs.readFileSync('./private.key', 'utf8');
const pubKey	= fs.readFileSync('./public.key', 'utf8'); 	

module.exports = {

    JWTSign: (payload, opts, callback)=>{

        let options = {
            issuer: opts.issuer,
            subject: opts.subject,
            audience: opts.audience,
            expiresIn: '1h',
            algorithm: 'RS256'
        }

        return jwt.sign(payload, prvKey, options, function(err, token){
            callback(err, token);
        });
    },

    JWTVerify: (token, callback)=>{

        // let options = {
        //     iss: opts.issuer,
        //     sub: opts.subject,
        //     aud: opts.audience,
        //     expiresIn: '1h',
        //     algorithm: ['RS256']
        // }

        try {
			return jwt.verify(token, pubKey, function(err, data){
                callback(err, data);
            });
		}catch(err){
			return false;
		}

    },

    JWTDecode: (token)=>{
        return jwt.decode(token, {complete: true});
    }

}