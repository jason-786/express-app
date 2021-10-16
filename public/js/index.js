$(document).ready(function () {
  $("#form").on("submit", function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var number = $("#number").val();

    //     Fetch Api
    const ClickHandler = async () => {
      $("#data-message").text("Loading...");
      $("#error-message").text("");
      try {
        const response = await fetch(
          //     `https://breakingbadapi.com/api/${name}/${number}`
          `http://localhost:3000/weather?name=${name}&num=${number}`
        );
        const data = await response.json();

        if (data.error === 404) {
          throw new Error(data.errormessage);
        }
        $("#data-message").text(data.data);
        return $("#error-message").text("");
      } catch (error) {
        $("#data-message").text("");
        return $("#error-message").text(error.message);
      }
    };
    ClickHandler();
  });
});
