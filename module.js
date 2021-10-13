
let createFirstElement = function() {
  let firstElement = {
    title: "My experience with code",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    created_time : new Date("2019-07-01T12:00:00"),
  }
  return firstElement
}

let createDefaultAbout = function() {
  let defaultAbout = {
    about: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
  }
  return defaultAbout
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
module.exports.createDefaultAbout = createDefaultAbout