const express = require("express");
const modul = require(__dirname + "/module.js");
const app = express();
const mongoose = require("mongoose")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/sharing-spaces")

const storySchema = mongoose.Schema({
	title: String,
	content: String,
	created_time: Date,
})

const stories = mongoose.model('story', storySchema)

const firstStory = new stories(modul.createFirstElement())

// Homepage
app.get("/", function (req, res) {
	stories.find({}, function (e, r) {
		if (e) {
			console.log("error!");
		} else {
			if (r.length == 0) {
				firstStory.save()
			}
			let render_dict = {
				th_list_stories: r,
			};
			res.render("index", render_dict);
		}
	})
});

// add story
app.get("/add", function (req, res) {
	res.render("add");
});

app.post("/add", function (req, res) {
	let added = false
	let storyAdded = req.body;
	let element = new stories({
		title: storyAdded["th_title"],
		content: storyAdded["th_content"],
		created_time: new Date(),
	});
	element.save()
	added = true
	res.render("add_success");
});

// contact and about

app.get("/contactme", function (req, res) {
	res.render("contactme");
});

app.get("/aboutme", function (req, res) {
	res.render("aboutme");
});

// edit story

app.get("/edit", function (req, res) {
	stories.find({}, function (e, r) {
		if (e) {
			console.log("error!");
		} else {
			let render_dict = {
				th_list_stories: r,
			};
			res.render("edit_list", render_dict);
		}
	});
})

app.get("/edit/:storyId", function (req, res) {
	let id = req.params.storyId;
	stories.findById(id, function (e, r) {
		if (!e) {
			res.render("edit_story", { th_story: r });
		}
	})
});

app.post("/edit", function (req, res) {
	let storyEdited = req.body;
	let element = {
		title: storyEdited["th_title"],
		content: storyEdited["th_content"],
		created_time: new Date(),
	};
	id = storyEdited["_id"]
	stories.findByIdAndUpdate(id, {$set: element}, {new:true}, function (e) {
		if (e) {
			console.log("update error!");
		} else {
			console.log("update success!");
		}
	})
	res.redirect("/")
});

// delete story

app.get("/delete/:storyId", function (req, res) {
	let id = req.params.storyId;
	stories.findByIdAndDelete(id, function (e) {
		if (e) {
			console.log("delete error!");
		} else {
			console.log("delete success!");
		}
	})
	res.redirect("/edit");
});



// show full story
app.get("/stories/:id", function (req, res) {
	let art_id = req.params.id
	let check = false
	for (story of list_stories) {
		if (art_id == story['id']) {
			check = true
			break
		}
	}
	if (check) {
		res.render("story", { th_story: story })
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
