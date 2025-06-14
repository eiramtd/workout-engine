const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database-models/index').userProfile;


const generateToken = (user) => {
	return jwt.sign({
		id: user._id,
	}, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});
}


const authController = {
	register: async (req, res) => {
		try {
			const { email, password, username } = req.body;
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: 'User already exists' });
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = await User.create({ email, password_hash: hashedPassword, username });
			const token = generateToken(newUser._id);
			return res.status(201).json({ message: 'User registered successfully', token });

		}
		catch (error) {
			return res.status(500).json({ message: 'Server error', error });
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'Invalid email or password' });
			}
			const isPasswordValid = await bcrypt.compare(password, user.password_hash);
			if (!isPasswordValid) {
				return res.status(400).json({ message: 'Invalid email or password' });
			}
			const token = generateToken(user._id);
			return res.status(200).json({ message: 'Login successful', token });

		}
		catch (error) {
			return res.status(500).json({ message: 'Server error', error });
		}
	}
}

module.exports = authController;
