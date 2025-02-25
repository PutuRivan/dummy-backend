import bcrypt from "bcrypt";
import { getUser, saveUser } from "../query/user.js";
import jwt from "jsonwebtoken";

const secretKey = "secret";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Cek apakah user sudah ada
        const existingUser = await getUser(email);

        if (existingUser) {
            return res.status(400).json({ message: "User sudah terdaftar" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const id = new Date().getTime().toString();
        // Simpan user baru ke JSON
        const newUser = await saveUser({ id, username, email, password: hashedPassword });

        res.status(201).json({ message: "User berhasil dibuat", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat user", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await getUser(email);

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Periksa password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        res.status(200).json({ message: "Login berhasil", user, token: jwt.sign({ id: user.id }, secretKey) });
    } catch (error) {
        res.status(500).json({ message: "Gagal melakukan login", error: error.message });
    }
};