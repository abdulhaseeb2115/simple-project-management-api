var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");

var adminRouter = require("./app_server/routes/admin");
var teamLeadRouter = require("./app_server/routes/teamLead");
var teamMemberRouter = require("./app_server/routes/teamMember");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server/views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/admin", adminRouter);
app.use("/teamLead", teamLeadRouter);
app.use("/teamMember", teamMemberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
