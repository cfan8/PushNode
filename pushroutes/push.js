/**
 * Created by linangran on 2/4/15.
 */
var handle = {};
handle["register"] = function (data, response, session) {
    if (data["username"] == data["password"]) {
        response.write(JSON.stringify({"status": "OK", "data": "Register Success!"}));
        session["connected"] = true;
    }
}

function pushroute(request, response, session) {
    reqStr = request.toString();
    try {
        reqObj = JSON.parse(request);
        if (typeof handle[reqObj["path"]] === 'function') {
            handle[reqObj["path"]](reqObj["data"], response, session);
        }
        else {
            response.write(JSON.stringify({"status": "ERROR", data: "404 Not Found"}));
        }
    } catch (e) {
        response.write(JSON.stringify({"status": "ERROR", data: "JSON Error"}));
        return;
    }
}

module.exports = pushroute;