import { Post } from "./../entity"

// sort by skills posts in react
const sortBySkills = (skills: string[], posts: Post[]) => {
    const sortedPosts: Post[] = []
    posts.sort()
    skills.sort()

    posts.filter(post => {
        for (let i = 0; i < skills.length; i++) {
            if (post.wantedSkills.includes(skills[i])) {

            } else {
                continue
            }
        }
    })
    return sortedPosts
}

