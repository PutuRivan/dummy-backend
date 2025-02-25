import { getStoredPosts, savePosts } from "../query/posts.js";

// ✅ Get All Posts
export const getPosts = async (req, res) => {
    try {
        const storedPosts = await getStoredPosts();
        res.status(200).json({ posts: storedPosts });
    } catch (error) {
        console.error('Error saat mengambil posts:', error);
        res.status(500).json({ message: 'Gagal mengambil posts' });
    }
};

// ✅ Get Post by ID
export const getPostsById = async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await getStoredPosts();
        const post = posts.find(p => p.id === id);

        if (!post) {
            return res.status(404).json({ message: 'Post tidak ditemukan' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error saat mengambil post:', error);
        res.status(500).json({ message: 'Gagal mengambil post' });
    }
};

// ✅ Create New Post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title dan Content wajib diisi!' });
        }

        const posts = await getStoredPosts();

        const newPost = {
            id: `${Date.now()}`,
            title,
            content,
            createdAt: new Date().toISOString()
        };

        posts.push(newPost);
        await savePosts(posts);

        res.status(201).json({ message: 'Post berhasil dibuat!', post: newPost });
    } catch (error) {
        console.error('Error saat membuat post:', error);
        res.status(500).json({ message: 'Gagal membuat post', error: error.message });
    }
};

// ✅ Update Post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title dan Content wajib diisi untuk update!' });
        }

        const posts = await getStoredPosts();
        const postIndex = posts.findIndex(p => p.id === id);

        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post tidak ditemukan' });
        }

        // Update data post
        posts[postIndex] = {
            ...posts[postIndex],
            title,
            content,
            updatedAt: new Date().toISOString()
        };

        await savePosts(posts);

        res.status(200).json({ message: 'Post berhasil diperbarui!', post: posts[postIndex] });
    } catch (error) {
        console.error('Error saat memperbarui post:', error);
        res.status(500).json({ message: 'Gagal memperbarui post', error: error.message });
    }
};

// ✅ Delete Post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await getStoredPosts();

        const updatedPosts = posts.filter(p => p.id !== id);

        if (posts.length === updatedPosts.length) {
            return res.status(404).json({ message: 'Post tidak ditemukan untuk dihapus' });
        }

        await savePosts(updatedPosts);

        res.status(200).json({ message: 'Post berhasil dihapus' });
    } catch (error) {
        console.error('Error saat menghapus post:', error);
        res.status(500).json({ message: 'Gagal menghapus post', error: error.message });
    }
};
