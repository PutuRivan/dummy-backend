import fs from 'fs/promises';

export async function getStoredPosts() {
    const rawFileContent = await fs.readFile('./src/posts.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data.posts ?? [];
}

export async function savePosts(posts) {
    return fs.writeFile('./src/posts.json', JSON.stringify({ posts: posts || [] }, null, 2));
}
