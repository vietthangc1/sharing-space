const express = require("express");
const modul = require(__dirname + "/module.js");
const app = express();
const mongo = 

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let firstElement = modul.createFirstElement();
let list_stories = [firstElement];

// Homepage
app.get("/", function (req, res) {
	let render_dict = {
		th_list_stories: list_stories,
	};
	res.render("index", render_dict);
});

// add story
app.get("/add", function (req, res) {
	res.render("add");
});

app.post("/add", function (req, res) {
	let storyAdded = req.body;
	let element = {
		id: modul.createId(),
		title: storyAdded["th_title"],
		content: storyAdded["th_content"],
		created_time: new Date(),
		created_time_rendered: function () {
			return (
				this.created_time.getFullYear() +
				"-" +
				(this.created_time.getMonth() + 1) +
				"-" +
				this.created_time.getDate() +
				" " +
				this.created_time.getHours() +
				":" +
				this.created_time.getMinutes() +
				":" +
				this.created_time.getSeconds()
			);
		},
		contentView: function () {
			return this.content.slice(0, 200);
		},
	};
	list_stories.push(element);
	res.redirect("/add_success");
});

app.get("/add_success", function (req, res) {
	res.render("add_success");
});

// contact and about

app.get("/contactme", function (req, res) {
	res.render("contactme");
});

app.get("/aboutme", function (req, res) {
	res.render("aboutme");
});

// delete story

app.get("/delete/:storyId", function (req, res) {
	let id = req.params.storyId;
	removeStorybyId(id);
	res.redirect("/edit");
});

// edit story

app.get("/edit", function (req, res) {
	let render_dict = {
		th_list_stories: list_stories,
	};
	res.render("edit_list", render_dict);
});

let story;

app.get("/edit/:storyId", function (req, res) {
	let id = req.params.storyId;
	story = getStorybyId(id);
	res.render("edit_story", { th_story: story });
});

app.post("/edit", function (req, res) {
	let storyEdited = req.body;
  removeStorybyId(story['id']);
	let element = {
		id: modul.createId(),
		title: storyEdited["th_title"],
		content: storyEdited["th_content"],
		created_time: new Date(),
		created_time_rendered: function () {
			return (
				this.created_time.getFullYear() +
				"-" +
				(this.created_time.getMonth() + 1) +
				"-" +
				this.created_time.getDate() +
				" " +
				this.created_time.getHours() +
				":" +
				this.created_time.getMinutes() +
				":" +
				this.created_time.getSeconds()
			);
		},
		contentView: function () {
			return this.content.slice(0, 200);
		},
	};
	list_stories.push(element);
});

// show full story
app.get("/stories/:id", function(req, res) {
	let art_id = req.params.id
	let check = false
	for (story of list_stories) {
		if (art_id == story['id']) {
			check = true
			break
		}
	}
	if (check) {
		res.render("story", {th_story: story})
	} else {
		res.redirect("/")
	}
})


app.listen(process.env.PORT || 3000, function () {
	console.log("Running server!");
});

function removeStorybyId(id) {
	for (i = 0; i < list_stories.length; i++) {
		if (list_stories[i]["id"] == id) {
			list_stories.splice(i, 1);
			break;
		}
	}
}

function getStorybyId(id) {
	for (i = 0; i < list_stories.length; i++) {
		if (list_stories[i]["id"] == id) {
			return list_stories[i];
		}
	}
}
