import fs from 'fs/promises';


const filePath = './src/data/user.json';
// Mendapatkan semua user
export async function getUser(email = null) {
    try {
        const rawFileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
        const data = JSON.parse(rawFileContent);
        const users = data.users ?? [];

        // Jika email diberikan, cari user berdasarkan email
        if (email) {
            return users.find(user => user.email === email) || null;
        }

        return users;
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Jika file belum ada, kembalikan array kosong
            return [];
        }
        throw error;
    }
}

// Menyimpan user baru
export async function saveUser(newUser) {
    try {
        let users = await getUser(); // Ambil data user yang sudah ada

        // Cek apakah user dengan email yang sama sudah ada
        if (users.some(user => user.email === newUser.email)) {
            throw new Error('User dengan email ini sudah ada');
        }

        users.push(newUser); // Tambahkan user baru

        await fs.writeFile(filePath, JSON.stringify({ users }, null, 2));

        return newUser;
    } catch (error) {
        throw new Error(`Gagal menyimpan user: ${error.message}`);
    }
}