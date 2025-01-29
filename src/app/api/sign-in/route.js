import UserModel from "@/models/users";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from "@/utils/dbconnect";

export async function POST(req, res) {

    await dbConnect()

    const { email, password } = await req.json();
    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 400,
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Invalid Email or Password' }), {
                status: 400,
            });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )

        return new Response(
            JSON.stringify({ message: 'User logged in successfully', token }),
            { status: 201 }
        );

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}