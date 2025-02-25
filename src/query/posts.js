import fs from 'fs/promises';

 const filePath = './src/data/posts.json';

export async function getStoredPosts() {
    const rawFileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.posts ?? [];
}

export async function savePosts(posts) {
    return fs.writeFile(filePath, JSON.stringify({ posts: posts || [] }, null, 2));
}