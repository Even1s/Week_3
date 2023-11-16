import axios from "axios";
import {ref} from "vue";

export function getDate(unixTime) {
  let agoTime
  let now = Math.floor(Date.now()/1000)
  agoTime = now - unixTime
  if (agoTime < 60) return Math.round(agoTime) + ' seconds ago'
  else if (agoTime < 60 * 60) return Math.round(agoTime/60) + ' minutes ago'
  else if (agoTime < 60 * 60 * 24) return Math.round(agoTime/(60 * 60)) + ' hours ago'
  else if (agoTime < 60 * 60 * 24 * 30) return Math.round(agoTime/(60 * 60 * 24)) + ' days ago'
  else if (agoTime < 60 * 60 * 24 * 30 * 365) return Math.round(agoTime/(60 * 60 * 24 * 30)) + ' months ago'
  else return Math.round(agoTime/(60 * 60 * 24 * 30 * 365)) + ' years ago'
}
export function getPostData(postId) {
  return new Promise((resolve, reject)=>{
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`)
          .then((response)=>{ resolve(response.data)})
          .catch((error)=>{ reject(error) })
  })
}
export function getComments(commentId) {
  return new Promise((resolve, reject)=>{
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
          .then(response=>{
            const comment = response.data
            comment.showComments = ref(false)
            resolve(comment)
          })
          .catch((error)=>{ reject(error) })
    })
}
export function getPostsIdNew() {
    return new Promise((resolve, reject)=>{
        axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
            .then((response)=>{ resolve(response.data.slice(0, 200))})
            .catch((error)=>{ reject(error) })
    })
}