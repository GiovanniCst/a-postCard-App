//vengono definite ed esportate le rotte

//home
exports.home = function(req, res) {
    res.render('index');
};

// Route for all other page requests
exports.notFound = function(req, res) {
	res.send("This page was not found");
};
