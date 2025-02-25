
import { getUser, saveUser } from "../query/user.js";
import bcrypt from "bcrypt";

// ✅ Get All User
export const getUsers = async (req, res) => {
    try {
        const storedUser = await getUser();
        res.status(200).json({ User: storedUser });
    } catch (error) {
        console.error('Error saat mengambil User:', error);
        res.status(500).json({ message: 'Gagal mengambil User' });
    }
};

// ✅ Get user by ID
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const User = await getUser();
        const user = User.find(p => p.id === id);

        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error saat mengambil user:', error);
        res.status(500).json({ message: 'Gagal mengambil user' });
    }
};

// ✅ Update user
export const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password wajib diisi untuk update!' });
        }

        const User = await getUser();
        const userIndex = User.findIndex(p => p.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'user tidak ditemukan' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update data user
        User[userIndex] = {
            ...User[userIndex],
            password: hashedPassword,
            updateAt: new Date().toISOString()
        };

        await saveUser(User);

        res.status(200).json({ message: 'user berhasil diperbarui!', user: User[userIndex] });
    } catch (error) {
        console.error('Error saat memperbarui user:', error);
        res.status(500).json({ message: 'Gagal memperbarui user', error: error.message });
    }
};

// ✅ Delete user
export const deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        const User = await getUser();

        const updatedUser = User.filter(p => p.id !== id);

        if (User.length === updatedUser.length) {
            return res.status(404).json({ message: 'user tidak ditemukan untuk dihapus' });
        }

        await saveUser(updatedUser);

        res.status(200).json({ message: 'user berhasil dihapus' });
    } catch (error) {
        console.error('Error saat menghapus user:', error);
        res.status(500).json({ message: 'Gagal menghapus user', error: error.message });
    }
};
