const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = async (req,res)=>{
    try{
        const {email, password, rememberMe} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'Invalid Credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: rememberMe ? '7d' : '1d'}
        );

        res.status(200).json({
            msg: 'Login Successful',
            token,
            user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dob: user.dob,
            gender: user.gender,
            phone: user.phone,
            username: user.username,
            profileImage: user.profileImage,
            coverImage: user.coverImage
      }
        });
    }
    catch(error){
        console.log('Login Controller Error: ',error);
        res.status(500).json({msg: 'Server Error'});
    }
}