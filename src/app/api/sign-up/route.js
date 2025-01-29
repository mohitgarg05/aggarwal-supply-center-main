import dbConnect from "@/utils/dbconnect";
import UserModel from "@/models/users";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    await dbConnect()

    const { username, email, password } = await req.json();
    console.log(username, email, password)

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email already exists' }), {
                status: 400,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword)

        const user = new UserModel({ username, email, password: hashedPassword })

        console.log(user)
        await user.save()

        return new Response(
            JSON.stringify({ message: 'User registered successfully', user }),
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        );
    }
}