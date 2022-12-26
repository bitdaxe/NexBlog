export interface IBlog{
   loadBlogs: () => void,
   blogs: Array<{title: string, blog: string, description: string, id:number, owner: string}>
}