const request = require("request");

const functon = (query = "", number = "", fun) => {
  request(
    { url: `https://breakingbadapi.com/api/${query}/${number}`, json: true },
    function (error, { body }) {
      if (error !== null) {
        fun("Something Error Found in connection of internet", undefined);
      } else if (
        body.length > 200 ||
        body.length === 0 ||
        body.name === "error"
      ) {
        fun("Not Correct Query Of Search", undefined);
      } else {
        if (query === "episodes") {
          return fun(undefined, { name: body[0].title });
        }
        if (query === "quotes") {
          return fun(undefined, { name: body[0].quote });
        }
        return fun(undefined, { name: body[0].name });
      }
    }
  );
};

module.exports = functon;
