
let createFirstElement = function() {
  let firstElement = {
    id: "aqwlgcaqwlgc", 
    title: "My experience with code",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    created_time : new Date("2019-07-01T12:00:00"),
    created_time_rendered: function() {return this.created_time.getFullYear()+'-'+(this.created_time.getMonth()+1)+'-'+this.created_time.getDate()+" "+this.created_time.getHours() + ":" + this.created_time.getMinutes() + ":" + this.created_time.getSeconds()},
    contentView: function() {return this.content.slice(0, 200)}
  }
  return firstElement
}


function createId() {
  let letters = 'abcdefghijklmnopqrstuvwxyz1234567890'
  let chuoi = ""
  for (i = 0; i <= 10; i++) {
    let randomLetter = letters[Math.floor(Math.random()*letters.length)]
    chuoi += randomLetter
  }
  return chuoi
}

function removeStorybyId(id) {
  for (i = 0; i < list_bio.length; i++) {
    if (list_bio[i]['id'] == id) {
      list_bio.splice(i, 1)
      break
    }
  }
}

module.exports.createId = createId
module.exports.removeStorybyId = removeStorybyId
module.exports.createFirstElement = createFirstElement
