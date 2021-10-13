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
	created_time: Date
})
const stories = mongoose.model('story', storySchema)
const firstStory = new stories(modul.createFirstElement())

const aboutSchema = mongoose.Schema({
	about: String
})
const about = mongoose.model('about', aboutSchema)
const defaultAbout = new about(modul.createDefaultAbout())

const contactSchema = mongoose.Schema({
	topic: String,
	message: String,
})
const contact = mongoose.model('contact', contactSchema)

// Homepage
app.get("/", function (req, res) {
	stories.find({}, function (e, r) {
		if (e) {
			console.log("error!");
		} else {
			if (r.length == 0) {
				firstStory.save()
			}
			about.find({}, function (e, r_about) {
				if (e) {
					console.log("about error");
				} else {
					if (r_about.length == 0) {
						defaultAbout.save()
					}
					let render_dict = {
						th_list_stories: r,
						th_about: r_about[0]
					}
					res.render("index", render_dict);
				}
			})
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

app.post("/contactme", function (req, res) {
	let button = req.body.btn
	let topic = req.body.topic
	let message = req.body.message
	if (button == "email") {
		let link = "mailto:pvthang1700@gmail.com?subject=" + topic + "&body=" + message
		res.redirect(link)
	}
	else {
		let element = new contact({
			topic: req.body['topic'],
			message: req.body['message'],
		})
		element.save()
		res.render("contact_success")
	}
})

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
	let id = storyEdited["th_id"]
	let element = {
		title: storyEdited["th_title"],
		content: storyEdited["th_content"],
		created_time: new Date(),
	};
	stories.findByIdAndUpdate(id, { $set: element }, function (e, r) {
		if (e) {
			console.log("update error!");
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
app.get("/stories/:storyid", function (req, res) {
	let id = req.params.storyid;
	stories.findById(id, function (e, r) {
		if (e) {
			console.log("delete error!");
			res.redirect("/")
		} else {
			res.render("story", { th_story: r })
		}
	})
})

// edit about
app.get("/editabout", function(req, res) {
	about.find({}, function (e, r) {
		if (e) {
			console.log("about error");
		} else {
			res.render("editabout", {th_about: r[0]})
		}
	})
})

app.post("/editabout", function(req, res) {
	let content = req.body['th_about']
	about.updateMany({}, {$set: {about: content}}, function(e) {
		if (e) {
			console.log("update about error!");
		} else {
			console.log("update about success!");
			res.redirect("/")
		}
	})
})


app.listen(process.env.PORT || 3000, function () {
	console.log("Running server!");
});
